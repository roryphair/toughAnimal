import Unit from './unit';

class Dog extends Unit{
    constructor(board, pos, player){
        super(board, pos, player)
        this.imgMove = './src/assets/units/dogMove.png';
        this.imgBase = './src/assets/units/dogStand.png';
        this.imgFight = './src/assets/units/dogFight.png';
        this.speed = 2.5;
        this.range = 1;
        this.attack = 10;
        this.health = 100;
        this.unit.src = this.imgBase;
        this.healthBar.innerHTML = this.health;
    }

}

export default Dog;