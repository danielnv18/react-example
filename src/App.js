import React, { Component } from 'react';
import randomWords from 'random-words';
import className from 'classnames';
import { fromJS } from 'immutable';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props)

		const words = randomWords(20).map(word => {
			return {
				"word": word,
				"isCorrect": false
			}
		})

		this.state = {
			"paragraph": fromJS(words),
      "currentGuess": "",
      "currentIndex": 0
		}

    this.handleChange = this.handleChange.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this.renderWord = this.renderWord.bind(this);
	}

  /**
   * Each time there is a new value.
   * @param {object} e
   */
	handleChange(e) {
    const value = e.target.value;
    const currentIndex = this.state.currentIndex;
    const currentWord = this.state.paragraph.getIn([currentIndex, 'word']);

    // The value match the word.
    if (value === currentWord) {
      this.resetInput(true);
      return false
    }

    // If the user types and space then jump to the next item.
		if (value.indexOf(' ') >= 0) {
      this.resetInput(false);
		}
		else {
			this.setState({
				"currentGuess": value
			});
		}
  }

  /**
   * Reset the input value and go to the next item
   * @param {bolean} newStatus
   */
  resetInput(newStatus) {
    const _paragraph = this.state.paragraph.setIn([this.state.currentIndex,'isCorrect'], newStatus);

    this.setState({
      "currentGuess": "",
      "paragraph": _paragraph,
      "currentIndex" : this.state.currentIndex + 1
    });
  }

  /**
   * Render each word
   * @param {object} item
   * @param {int} key
   */
  renderWord(item, key) {
    let _class = '';
    const { currentIndex, currentGuess } = this.state;

    if (key <= currentIndex) {
      _class = className({
        'grey': currentIndex === key && item.get('word').startsWith(currentGuess),
        'green': item.get('isCorrect'),
        'red': !item.get('isCorrect')
      })
    }

    return <span key={key} className={_class}>{item.get('word')}</span>
  }

  render() {
    const {currentIndex, paragraph} = this.state
    return (
      <div className="App">
        <div>{this.state.paragraph.map((this.renderWord))}</div>
				<div>
          { currentIndex < paragraph.count() ?
          <input
						type="text"
						value={this.state.currentGuess}
						onChange={this.handleChange}/> : null
          }
					</div>
				<p>{this.state.currentGuess}</p>
      </div>
    );
  }
}

export default App;
