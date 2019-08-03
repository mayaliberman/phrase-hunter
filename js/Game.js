/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
    this.sounds = [
      new Audio('sound/win.mp3'),
      new Audio('sound/right.mp3'),
      new Audio('sound/wrong.mp3')
    ];
  }
  /**
   * Create phrases for us in game
   * @return {array} an array of phrases that could be used in the game
   */
  createPhrases() {
    let phrases = [];
    phrases.push(
      new Phrase('There is no time like the present'),
      new Phrase('Time flies'),
      new Phrase('All you need is love'),
      new Phrase('Never say never'),
      new Phrase('Make love not war')
    );

    return phrases;
  }
  /**
   * Selects random phrase from phrases property
   * @return {object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    
    document.getElementById('overlay').style.display = 'none';
    const activePhrase = this.getRandomPhrase();
    activePhrase.addPhraseToDisplay();
    this.activePhrase = activePhrase;
  }
  /**
   * Checks for winning move
   * @return {boolean} True if the game has been won, false if game wasn't won
   */
  checkForWin() {
    let letters = document.getElementsByClassName('letter');
    let hideOrShow = [];
    for (let i = 0; i < letters.length; ++i) {
      if (letters[i].classList.contains('show')) {
        hideOrShow.push('show');
      }
    }
    if (hideOrShow.length === letters.length) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaing lives and ends game if player is out
   */

  removeLife() {
    //Solution for finding the first heart on the list and replacing it was taken from here https://treehouse-fsjs-102.slack.com/archives/CBP5C67RP/p1563308655324200
    $('.tries')
      .find('img[src="images/liveHeart.png"]')
      .first()
      .attr('src', 'images/lostHeart.png');
    this.missed += 1;
    if (this.missed === 5) {
      this.gameOver(false);
      this.sounds[2].play();
     
    }

  }

  /**
   * Displays game over message
   * @parm {boolean} gameWon - Whether or not the user won the game
   */

  gameOver(gameWon) {
    document.getElementById('overlay').style.display = 'flex';
    if (gameWon) {
      document.querySelector('.start').style.backgroundColor = '#1ABC9C';
      document.getElementById('game-over-message').innerText = 'Greate Job!';
      this.sounds[0].play();
    } else {
      document.querySelector('.start').style.backgroundColor = '#FF5733';
      document.getElementById('game-over-message').innerText =
        'You Lost All Your Hearts!';
      this.sounds[2].play();
    }
    /**
     * reset game for a new game
     * deleting li list, updading heart png and updating onscreen keyboard key
     *
     *  */
    const phraseSection = document.querySelector('#phrase ul');
    phraseSection.innerHTML = '';

    $('.tries')
      .find('img[src="images/lostHeart.png"]')
      .attr('src', 'images/liveHeart.png');
    this.missed = 0;

    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.removeAttribute('disabled','');
        key.className = 'key';
    })
     
  }

  /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - the clicked button element
   */
  handleInteraction(button) {
    button.setAttribute('disabled', '');
    if (this.activePhrase.checkLetter(button.textContent)) {
      button.className += ' chosen';
      this.activePhrase.showMatchLetter(button.textContent);
      this.sounds[1].play();
      this.checkForWin();
      if (this.checkForWin() === true) {
        this.gameOver(true);
      }
    } else {
      button.className += ' wrong';
      this.removeLife();
      this.sounds[2].play();
    }
  }
}
