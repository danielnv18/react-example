import React, { Component } from 'react';
import randomWords from 'random-words';
import './App.css';

class App extends Component {

	constructor() {
		super()

		const words = randomWords(20).map(word => {
			return {
				"word": word,
				"isCorrect": false
			}
		})

		this.state = {
			"paragraph": words,
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
    const currentWord = this.state.paragraph[currentIndex].word

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
    let _paragraph = this.state.paragraph.slice()
    _paragraph[this.state.currentIndex].isCorrect = newStatus;
    this.setState({
      "currentGuess": "",
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
    const currentIndex = this.state.currentIndex;
    const currentGuess = this.state.currentGuess;

    if (key <= currentIndex) {
      // gray only if the current word is no erros.
      if (currentIndex === key && item.word.startsWith(currentGuess)) {
        _class = 'grey';
      }
      else if (item.isCorrect) {
        _class = 'green';
      }
      else {
        _class = 'red';
      }
    }

    return <span key={key} className={_class}>{item.word}</span>
  }

  render() {
    return (
      <div className="App">
        <div>{this.state.paragraph.map((this.renderWord))}</div>
				<div>
					<input
						type="text"
						value={this.state.currentGuess}
						onChange={this.handleChange}/></div>
				<p>{this.state.currentGuess}</p>
      </div>
    );
  }
}

export default App;
