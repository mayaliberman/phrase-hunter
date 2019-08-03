/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
const startGameButton = document.getElementById('btn__reset').addEventListener('click', function() {
    game = new Game();
    game.startGame();
})



 
 document.addEventListener('click', function (event) {
	if (event.target.matches('.key')) {
        game.handleInteraction(event.target)
		// Run your code to open a modal
	}
}, false);



   



