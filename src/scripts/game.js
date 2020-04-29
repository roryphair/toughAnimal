import Board from './board';
class Game{
    constructor(){
        this.playerUnits = [];
        this.enemyUnits = [];
        this.board = new Board(this.playerUnits, this.enemyUnits, this);
        this.makeButton();
        this.wave = 1;
        this.playerAmount = 1;
        this.waveData = [];
        this.getWaveData();
        this.board.makeWave(this.waveData, this.playerAmount);
    }

    makeButton(){
        const fight = document.getElementById('start-fight-button');
        fight.onclick = this.board.startFight ;
        const button = document.getElementById('make-dog-button');
        button.onclick = this.board.makeUnit('dog') ;
        const button2 = document.getElementById('make-gibbon-button');
        button2.onclick = this.board.makeUnit('gibbon') ;
        const button3 = document.getElementById('make-otter-button');
        button3.onclick = this.board.makeUnit('otter') ;
        const button4 = document.getElementById('make-goat-button');
        button4.onclick = this.board.makeUnit('goat') ;
        const button5 = document.getElementById('make-llama-button');
        button5.onclick = this.board.makeUnit('llama') ;
        const button6 = document.getElementById('make-sal-button');
        button6.onclick = this.board.makeUnit('sal') ;
        const button7 = document.getElementById('make-chilla-button');
        button7.onclick = this.board.makeUnit('chilla') ;
    }

    getWaveData(){
        switch(this.wave){
            case 1:
                this.playerAmount = 2;
                this.waveData =  [['dog', [4,5]]];
                break;
            case 2:
                this.playerAmount = 2;
                this.waveData = [['dog', [4,5]] , ['dog',[4,4]]];
                break;
            case 3:
                this.playerAmount = 3;
                this.waveData = [['dog', [4,5]] , ['dog',[4,4]], ['gibbon',[4,7]]];
                break;
            case 4:
                this.playerAmount = 4;
                this.waveData = [['otter', [0,6]] , ['otter',[2,6]], ['otter',[4,6]], ['otter',[6,6]]];
                break;
        }
    }
    win(){
        wave +=1;
        this.getWaveData();
        this.board.makeWave(this.waveData, this.playerAmount);
    }
    
    lose(){
        this.board.makeWave(this.waveData, this.playerAmount);
    }
    
}

export default Game;