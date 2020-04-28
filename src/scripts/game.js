import Board from './board';
class Game{
    constructor(){
        this.buttonLogic = this.buttonLogic.bind(this);
        this.playerUnits = [];
        this.board = new Board(this.playerUnits);
        this.buttonLogic();
    }

    buttonLogic(){
        const button = document.getElementById('test-button');
        button.onclick = this.board.makePlayerUnit ;
    }
    
}

export default Game;