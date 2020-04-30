import Board from './board';
class Game{
    constructor(){
        this.playerUnits = [];
        this.enemyUnits = [];
        const music = document.createElement("audio")
        document.getElementById('board').append(music);
        this.music = music;
        this.music.loop = true;
        this.music.volume = 0.1;
        this.board = new Board(this.playerUnits, this.enemyUnits, this);
        this.makeButton();
        this.wave = 1;
        this.playerAmount = 1;
        this.waveData = [];
        this.waveNumb = document.getElementById('wave-numb');
        this.description = document.getElementById('stats');
        this.fillDescription = this.fillDescription.bind(this);
        this.getWaveData();
        this.board.enemyBase = this.waveData;
        this.board.makeWave(this.playerAmount);
        this.win = this.win.bind(this);
        this.lose = this.lose.bind(this);
        this.baseMusic()
    }

    fightMusic(){
        this.music.src = './src/assets/music/fight.mp3';
        this.music.play();
    }
    baseMusic(){
        this.music.src = './src/assets/music/prepare.mp3';
        this.music.play();
    }

    makeButton(){
        const fight = document.getElementById('start-fight-button');
        fight.onclick = this.board.startFight ;
        const button1 = document.getElementById('make-dog-button');
        button1.onclick = this.board.makeUnit('dog');
        button1.onmouseover = this.fillDescription('dog');
        const button2 = document.getElementById('make-gibbon-button');
        button2.onclick = this.board.makeUnit('gibbon') ;
        button2.onmouseover = this.fillDescription('gibbon');
        const button3 = document.getElementById('make-otter-button');
        button3.onclick = this.board.makeUnit('otter') ;
        button3.onmouseover = this.fillDescription('otter');
        const button4 = document.getElementById('make-goat-button');
        button4.onclick = this.board.makeUnit('goat') ;
        button4.onmouseover = this.fillDescription('goat');
        const button5 = document.getElementById('make-llama-button');
        button5.onclick = this.board.makeUnit('llama');
        button5.onmouseover = this.fillDescription('llama');
        const button6 = document.getElementById('make-sal-button');
        button6.onclick = this.board.makeUnit('sal') ;
        button6.onmouseover = this.fillDescription('sal');
        const button7 = document.getElementById('make-chilla-button');
        button7.onclick = this.board.makeUnit('chilla') ;
        button7.onmouseover = this.fillDescription('chilla');
    }

    fillDescription(name){
        return e =>{
            e.preventDefault();
        switch(name){
            case 'dog':
                this.description.children[1].innerHTML = 'Dog';
                this.description.children[2].innerHTML = 'Health: 100' + '&nbsp'.repeat(10) + 'Attack: 10';
                this.description.children[3].innerHTML = 'Range: 1' + '&nbsp'.repeat(15) + 'Speed: 2';
                this.description.children[4].innerHTML = 'Dog standard animal, balanced, fluffy, pretty. Perfect';
                break;
            case 'gibbon':
                this.description.children[1].innerHTML = 'Gibbon';
                this.description.children[2].innerHTML = 'Health: 50' + '&nbsp'.repeat(10) + 'Attack: 15';
                this.description.children[3].innerHTML = 'Range: 2' + '&nbsp'.repeat(15) + 'Speed: 1';
                this.description.children[4].innerHTML = 'Smacks foes from afar with lanky goodness. Slow and delicate though.';
                break;
            case 'goat':
                this.description.children[1].innerHTML = 'Goat';
                this.description.children[2].innerHTML = 'Health: 50' + '&nbsp'.repeat(10) + 'Attack: 15';
                this.description.children[3].innerHTML = 'Range: 1.3' + '&nbsp'.repeat(15) + 'Speed: 2';
                this.description.children[4].innerHTML = 'At the start of the fight, the goat jumps to the opposite position on the board. Very slick.';
                break;
            case 'otter':
                this.description.children[1].innerHTML = 'Otter';
                this.description.children[2].innerHTML = 'Health: 30' + '&nbsp'.repeat(10) + 'Attack: 20';
                this.description.children[3].innerHTML = 'Range: 1' + '&nbsp'.repeat(15) + 'Speed: 4';
                this.description.children[4].innerHTML = 'Fast and chaotic, the otter is hard to control. Tempting but pet, but dangerous nonetheless.';
                break;
            case 'llama':
                this.description.children[1].innerHTML = 'Llama';
                this.description.children[2].innerHTML = 'Health: 50' + '&nbsp'.repeat(10) + 'Attack: 13';
                this.description.children[3].innerHTML = 'Range: 3' + '&nbsp'.repeat(15) + 'Speed: 2';
                this.description.children[4].innerHTML = 'The Llama is fast and deadly, attacking from afar with spit. They are a bit stubborn though.';
               
                break;
            case 'sal':
                this.description.children[1].innerHTML = 'Salamander';
                this.description.children[2].innerHTML = 'Health: 140' + '&nbsp'.repeat(10) + 'Attack: 3';
                this.description.children[3].innerHTML = 'Range: 1' + '&nbsp'.repeat(15) + 'Speed: 1';
                this.description.children[4].innerHTML = 'Low attack, but this animal can take a beating and keeps regenerating! Nice.';
               
                break;
            case 'chilla':
                this.description.children[1].innerHTML = 'Chilla';
                this.description.children[2].innerHTML = 'Health: 10' + '&nbsp'.repeat(10) + 'Attack: 1';
                this.description.children[3].innerHTML = 'Range: 1' + '&nbsp'.repeat(15) + 'Speed: 4';
                this.description.children[4].innerHTML = 'The chilla is very weak but its fluffyness inspires others to fight harder!';
                break;
        }
    }
    }

    getWaveData(){
        switch(this.wave){
            case 1:
                this.playerAmount = 2;
                this.waveData =  [['dog', [4,5]]];
                break;
            case 2:
                this.playerAmount = 2;
                this.waveData = [['dog', [4,5]] , ['dog',[5,5]]];
                break;
            case 3:
                this.playerAmount = 3;
                this.waveData = [['dog', [4,5]] , ['dog',[5,5]], ['gibbon',[4,7]]];
                break;
            case 4:
                this.playerAmount = 4;
                this.waveData = [['otter', [0,6]] , ['otter',[2,6]], ['otter',[4,6]], ['otter',[6,6]]];
                break;
        }
        this.waveNumb.innerHTML = `Wave: ${this.wave}`
    }

    makeOverlay(win){
        const overlay = document.createElement('div');
        overlay.id = 'overlay'
        const title = document.createElement('h2');
        const button = document.createElement('button');
        if(win){
            title.innerHTML = 'You Won, Wowza ' + Math.round(Math.random() * 10000);
            button.innerHTML = 'Next Wave!';
            button.onclick = this.win;
  
        }else{
            title.innerHTML = 'You lost! Sad and disgraceful';
            button.innerHTML = 'Try Again!';
            button.onclick = this.lose;
        }
        overlay.appendChild(title);
        overlay.appendChild(button);
        document.getElementById('board').appendChild(overlay);
    }

    win(){
        this.baseMusic();
        document.getElementById('overlay').remove();
        this.wave +=1;
        this.getWaveData();
        this.board.enemyBase = this.waveData;
        this.board.makeWave(this.playerAmount);
    }

    lose(){
        this.baseMusic();
        document.getElementById('overlay').remove();
        this.board.makeWave( this.playerAmount);
    }
    
}

export default Game;