import Board from './board';
class Game{
    constructor(){
        const music = document.createElement("audio")
        document.getElementById('board').append(music);
        this.music = music;
        this.music.loop = true;
        this.board = new Board(this);
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
        this.startMusic = this.startMusic.bind(this);
        this.startSounds = this.startSounds.bind(this);
        this.changeMusic = this.changeMusic.bind(this);
        this.makeButton();
        this.changeMusic('base');
        this.timer = 0;
        window.soundsOn = true ;
        this.background = document.getElementById('html');
        this.backgroundChange = this.backgroundChange.bind(this);
        requestAnimationFrame(this.backgroundChange);
        this.animals = ['dog', 'gibbon','otter','goat','llama','sal','chilla'];
    }

    backgroundChange(){
        this.timer += 1;
        this.background.style.backgroundColor = `rgba(${Math.abs(Math.sin(this.timer / 345) * 125)}, 0 , ${Math.abs(Math.sin(this.timer/ 234) * 255)}, 0.7)`;
        requestAnimationFrame(this.backgroundChange);
    
    }
  
    changeMusic(song){
        const paused = !this.music.paused;
        switch(song){
            case 'night':
                this.music.src = './src/assets/music/nightnight.mp3';
                this.music.volume = 0.2;
                break;
            case 'fight':
                this.music.src = './src/assets/music/fight.mp3';
                this.music.volume = 0.2;
                break;
            case 'base':
                this.music.src = './src/assets/music/prepare.mp3';
                this.music.volume = 0.15;
                break;
            case 'win':
                this.music.src = './src/assets/music/win.mp3';
                this.music.volume = 0.1;
                break;
            case 'lose':
                this.music.src = './src/assets/music/lose.mp3';
                this.music.volume = 0.1;
                break;
        }
        if(paused) this.music.play();
    }

    startMusic(e){
        e.preventDefault();
        const button = document.getElementById('music-button');
        if(this.music.paused){
            button.className ='button-on';
            button.style.textDecoration = '';
            this.music.play();
        }else{
            button.style.textDecoration = 'line-through';
            button.className ='';
            this.music.pause();
        }
    }

    startSounds(e){
        e.preventDefault();
        window.soundsOn = !window.soundsOn;
        const button = document.getElementById('sounds-button');
        if(window.soundsOn){
            button.className ='button-on';
            button.style.textDecoration = '';
        }else{
            button.className ='';
            button.style.textDecoration = 'line-through';
        }
    }

    makeButton(){
        const music = document.getElementById('music-button');
        music.style.textDecoration = 'line-through';
        music.onclick = this.startMusic;
        const sounds = document.getElementById('sounds-button');
        sounds.onclick = this.startSounds;
        const cheat = document.getElementById('cheat');
        cheat.onclick = this.win;
        const night = document.getElementById('rory');
        night.onclick = () => {
            this.changeMusic('night')
            this.board.playerUnits.forEach(unit => {
                unit.changeImg( './src/assets/units/jae.png' , true);
            })
        };
        const goBack = document.getElementById('back');
        goBack.onclick = () => { 
            if(this.wave > 1){
                this.wave -= 2;
                this.win()
            }
        };
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
                this.description.children[4].innerHTML = 'Bog standard animal, balanced, fluffy, pretty. Perfect for a long walk on the beach.';
                break;
            case 'gibbon':
                this.description.children[1].innerHTML = 'Gibbon';
                this.description.children[2].innerHTML = 'Health: 50' + '&nbsp'.repeat(10) + 'Attack: 17';
                this.description.children[3].innerHTML = 'Range: 2' + '&nbsp'.repeat(15) + 'Speed: 1';
                this.description.children[4].innerHTML = 'Smacks foes from afar with lanky goodness. Slow and delicate, like my heart.';
                break;
            case 'goat':
                this.description.children[1].innerHTML = 'Goat';
                this.description.children[2].innerHTML = 'Health: 50' + '&nbsp'.repeat(10) + 'Attack: 15';
                this.description.children[3].innerHTML = 'Range: 1.3' + '&nbsp'.repeat(15) + 'Speed: 2';
                this.description.children[4].innerHTML = 'At the start of the fight, the goat jumps to the opposite position on the board. Very slick, I see you.';
                break;
            case 'otter':
                this.description.children[1].innerHTML = 'Otter';
                this.description.children[2].innerHTML = 'Health: 30' + '&nbsp'.repeat(10) + 'Attack: 20';
                this.description.children[3].innerHTML = 'Range: 1.2' + '&nbsp'.repeat(15) + 'Speed: 4';
                this.description.children[4].innerHTML = 'Fast and chaotic, the otter is hard to control. Tempting to pet, but dangerous nonetheless.';
                break;
            case 'llama':
                this.description.children[1].innerHTML = 'Llama';
                this.description.children[2].innerHTML = 'Health: 65' + '&nbsp'.repeat(10) + 'Attack: 10';
                this.description.children[3].innerHTML = 'Range: 3' + '&nbsp'.repeat(15) + 'Speed: 2';
                this.description.children[4].innerHTML = 'The Llama is fast and elegant, attacking from afar with spit. They are a bit stubborn though.';
               
                break;
            case 'sal':
                this.description.children[1].innerHTML = 'Salamander';
                this.description.children[2].innerHTML = 'Health: 150' + '&nbsp'.repeat(10) + 'Attack: 3';
                this.description.children[3].innerHTML = 'Range: 1' + '&nbsp'.repeat(15) + 'Speed: 1';
                this.description.children[4].innerHTML = 'Low attack, but this animal can take a beating and keeps regenerating! Great job.';
               
                break;
            case 'chilla':
                this.description.children[1].innerHTML = 'Chilla';
                this.description.children[2].innerHTML = 'Health: 10' + '&nbsp'.repeat(10) + 'Attack: 1';
                this.description.children[3].innerHTML = 'Range: 1' + '&nbsp'.repeat(15) + 'Speed: 4';
                this.description.children[4].innerHTML = 'The chilla is very weak but its fluffyness inspires others to fight harder! Thank you Chilla';
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
            case 5:
                this.playerAmount = 4;
                this.waveData = [['chilla', [4,7]] , ['sal',[3,4]], ['gibbon',[4,5]], ['dog',[5,4]]];
                break;
            case 6:
                this.playerAmount = 5;
                this.waveData = [['llama', [0,5]] , ['llama',[1,5]], ['llama',[3,6]], ['llama',[4,7]],['llama',[2,7]]];
                break;
            case 7:
                this.playerAmount = 5;
                this.waveData = [['sal', [0,4]] , ['sal',[1,4]], ['sal',[2,4]], ['gibbon',[0,5]],['chilla',[0,7]]];
                break;
            case 8:
                this.playerAmount = 6;
                this.waveData = [['dog', [1,4]] , ['dog',[2,4]], ['dog',[3,4]], ['dog',[4,4]],['dog',[5,4]],['dog',[6,4]]];
                break;
            case 9:
                this.playerAmount = 6;
                this.waveData = [['goat', [2,7]] , ['goat',[5,6]], ['sal',[4,4]], ['llama',[2,6]], ['gibbon',[4,6]], ['chilla',[7,7]]];
                break;
            case 10:
                this.playerAmount = 7;
                this.waveData = [['chilla', [0,7]] , ['chilla',[7,7]], ['otter',[2,7]], ['otter',[3,7]], ['otter',[4,7]], ['sal',[2,4]], ['sal',[5,4]]];
                break;
            case 11:
                this.playerAmount = 7;
                this.waveData = [['gibbon', [5,5]] , ['gibbon',[4,5]], ['gibbon',[3,5]], ['otter',[7,6]], ['sal',[4,4]], ['sal',[4,6]], ['otter',[0,6]], ['chilla',[0,7]]];
                break;
            case 12:
                this.playerAmount = 8;
                this.waveData = [['dog', [0,4]] , ['dog',[2,4]], ['dog',[4,4]], ['dog',[6,4]], ['otter',[1,5]], ['otter',[3,5]], ['otter',[5,5]], ['llama',[4,6]],['llama',[2,6]]];
                break;
            case 13:
                this.playerAmount = 8;
                this.waveData = [['otter', [0,7]] , ['otter',[1,7]], ['otter',[2,7]], ['otter',[3,7]], ['otter',[4,7]], ['otter',[5,7]], ['otter',[6,7]], ['otter',[7,7]],['otter',[4,6]],['otter',[3,6]]];
                break;
            case 14:
                this.playerAmount = 9;
                this.waveData = [['sal', [2,4]] , ['sal',[5,4]], ['dog',[3,4]], ['gibbon',[4,6]], ['chilla',[4,7]], ['otter',[5,5]], ['llama',[6,6]], ['llama',[1,6]],['goat',[6,6]]];
                break;
            case 15:
                this.playerAmount = 9;
                this.waveData = [['chilla', [0,7]] , ['chilla',[3,7]], ['chilla',[4,7]], ['chilla',[7,7]], ['dog',[4,4]], ['dog',[3,4]], ['dog',[2,4]], ['dog',[5,4]],['dog',[1,4]],['dog',[6,4]]];
                break;
            case 16:
                this.playerAmount = 9;
                this.waveData = [['dog', [0,7]] , ['dog',[3,7]], ['dog',[4,7]], ['dog',[7,7]], ['dog',[1,7]], ['dog',[2,7]], ['dog',[5,7]], ['dog',[6,7]],['sal',[1,4]],['sal',[6,4]]];
                break;
            case 17:
                this.playerAmount = 10;
                this.waveData = [['dog', [1,4]] , ['dog',[6,4]], ['sal',[4,4]], ['sal',[3,4]], ['goat',[1,7]], ['goat',[6,7]], ['chilla',[5,6]], ['gibbon',[6,5]],['llama',[1,6]],['llama',[6,5]]];
                break;
            case 18:
                this.playerAmount = 10;
                this.waveData = [['chilla', [6,6]] , ['chilla',[2,7]], ['chilla',[0,7]], ['sal',[2,4]],['sal',[6,4]], ['otter',[1,7]], ['otter',[6,7]], ['otter',[5,6]], ['otter',[6,5]],['otter',[1,6]],['otter',[6,5]]];
                break;
            case 19:
                this.playerAmount = 10;
                this.waveData = [['goat', [0,7]] , ['goat',[7,7]], ['goat',[6,6]], ['goat',[1,6]],['dog',[5,4]], ['dog',[2,4]], ['gibbon',[5,5]], ['gibbon',[2,5]], ['llama',[3,6]],['llama',[4,6]],['otter',[4,7]]];
                break;
            case 20:
                this.playerAmount = 11;
                this.waveData = [['chilla', [7,7]] , ['chilla', [0,7]] , ['goat',[1,7]], ['goat',[6,7]], ['dog',[4,4]],['dog',[3,4]], ['llama',[3,7]], ['llama',[5,5]], ['llama',[2,5]], ['llama',[3,6]],['llama',[4,6]],['llama',[4,7]]];
                break;
            default:
                this.playerAmount = 12;
                const newAnimals = []
                for (let i = 0; i < 14; i++) {
                    newAnimals.push(this.makeRandomAnimal());
                }
                this.waveData = newAnimals;
        }
        this.waveNumb.innerHTML = `Wave: ${this.wave}`
    }

    makeRandomAnimal(){
        const anim = [];
        anim.push(this.animals[Math.floor(Math.random()*this.animals.length)]);
        anim.push([Math.floor(Math.random()* 8), Math.floor(Math.random()* 4) + 4])
        return anim;
    }

    makeOverlay(win){
        const overlay = document.createElement('div');
        const overlayBack = document.createElement('div');
        overlayBack.id = 'overlayBack'
        overlay.id = 'overlay'
        const title = document.createElement('h2');
        const button = document.createElement('button');
        if(win){ 
            this.changeMusic('win');
            title.innerHTML = 'You Won, Wowza ' + Math.round(Math.random() * 10000);
            button.innerHTML = 'Next Wave!';
            button.onclick = this.win;
  
        }else{
            this.changeMusic('lose');
            title.innerHTML = 'You lost! Sad and disgraceful';
            button.innerHTML = 'Try Again!';
            button.onclick = this.lose;
        }
        overlay.appendChild(title);
        overlay.appendChild(button);
        document.getElementById('body').appendChild(overlayBack);
        document.getElementById('body').appendChild(overlay);
    }

    win(){
        this.changeMusic('base');
        if(document.getElementById('overlay')){
            document.getElementById('overlayBack').remove();
            document.getElementById('overlay').remove();
        }
        this.wave +=1;
        this.getWaveData();
        this.board.enemyBase = this.waveData;
        this.board.makeWave(this.playerAmount);
    }

    lose(){
        this.changeMusic('base');
        if(document.getElementById('overlay')){
            document.getElementById('overlay').remove();
            document.getElementById('overlayBack').remove();
        }
        this.board.makeWave( this.playerAmount);
    }
    
}

export default Game;