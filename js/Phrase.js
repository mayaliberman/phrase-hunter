/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    for (let i = 0; i < this.phrase.length; i++) {
      const li = document.createElement('li');
      const phraseSection = document.querySelector('#phrase ul');
      phraseSection.appendChild(li);
      li.innerText = this.phrase[i];
      if (this.phrase[i] === ' ') {
        li.setAttribute('class', `space`);
      } else {
        li.setAttribute('class', `hide letter ${this.phrase[i]}`);
      }
    }
  }
  /**
   * checks if passed letter is in phrase
   * @param {*} letter
   */
  checkLetter(letter) {
        return this.phrase.includes(letter)
     }
  /**
   * Display passed letter on screen after a match is found
   * @param(string) letter - letter to display
   */
  showMatchLetter(letter) {
    if (this.checkLetter(letter) === true) {
     const letterClasses = document.querySelectorAll(`.${letter}`);
      letterClasses.forEach(element => {
      element.classList.replace('hide', 'show');
      });
    } else {
        return  
    }
  }
}
