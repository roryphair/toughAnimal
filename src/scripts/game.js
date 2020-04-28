import Board from './board';
class Game{
    constructor(){
        this.playerUnits = [];
        this.enemyUnits = [];
        this.board = new Board(this.playerUnits, this.enemyUnits);
        this.makeButton();

    }

    makeButton(){
        const button = document.getElementById('make-unit-button');
        button.onclick = this.board.makePlayerUnit ;
        const button2 = document.getElementById('start-fight-button');
        button2.onclick = this.board.startFight ;
    }
    
}

export default Game;