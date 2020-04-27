import Board from './board';
import Unit from './unit';
class Game{
    constructor(){

        this.buttonLogic = this.buttonLogic.bind(this);
        this.buttonLogic();
        this.makeUnit = this.makeUnit.bind(this);
        this.board = new Board();
    }

  

    buttonLogic(){
        const button = document.getElementById('test-button');
        button.onclick = this.makeUnit ;
    }

    makeUnit(e){
        e.preventDefault();
        const unit = new Unit(0);
    }

    
}

export default Game;