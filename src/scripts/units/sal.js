import Unit from './unit';

class Sal extends Unit{
    constructor(board, pos, player){
        super(board, pos, player)
        this.imgMove = './src/assets/units/salMove.png';
        this.imgBase = './src/assets/units/salStand.png';
        this.imgFight = './src/assets/units/salFight.png';
        this.speed = 1;
        this.range = 1;
        this.attack = 3;
        this.health = 140;
        this.unit.src = this.imgBase;
        this.healthBar.innerHTML = this.health;
    }

    specialMovement(){
        if(this.timer % 30 ===0){
            this.health += 1;
            this.healthBar.innerHTML = this.health;
        }
        return [0,0]
    }
}

export default Sal;