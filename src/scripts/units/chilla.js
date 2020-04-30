import Unit from './unit';

class Chilla extends Unit{
    constructor(board, pos, player){
        super(board, pos, player, './src/assets/sounds/chilla.mp3')
        this.imgMove = './src/assets/units/chillaMove.png';
        this.imgBase = './src/assets/units/chillaStand.png';
        this.imgFight = './src/assets/units/chillaFight.png';
        this.speed = 0;
        this.range = 1;
        this.attack = 1;
        this.health = 10;
        this.unit.src = this.imgBase;
        this.healthBar.innerHTML = this.health;
        this.specialMove = [0,0];
    }

    checkCollision(){
        let leftNudge = 0;
        let topNudge = 0;
        if(this.unit.offsetLeft < 0){
            leftNudge = -5;
        }else if(this.unit.offsetLeft > 700){
            leftNudge = 5;
        }
        if(this.unit.offsetTop < 0){
            topNudge = -5;
        }else if(this.unit.offsetTop > 700){
            topNudge = 5;
        }
        return [topNudge, leftNudge];
    }

    specialMovement(){
        if(this.timer % 150 ===0){
            const allies = this.player ? this.board.playerUnits : this.board.enemyUnits;
            allies.forEach(ally => {
                ally.health += 5;
                ally.healthBar.innerHTML =  ally.health;
            });
            this.specialMove = [(Math.random() - .5 )*8, (Math.random() - .5 )*8];
            this.changeImg(this.imgFight, true);
        }
        return this.specialMove;
    }
}

export default Chilla;