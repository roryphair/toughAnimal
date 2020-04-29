import Unit from './unit';

class Gibbon extends Unit{
    constructor(board, pos, player){
        super(board, pos, player)
        this.imgMove = './src/assets/units/gibbonMove.png';
        this.imgBase = './src/assets/units/gibbonStand.png';
        this.imgFight = './src/assets/units/gibbonFight.png';
        this.speed = 1;
        this.range = 2;
        this.attack = 15;
        this.health = 30;
        this.unit.src = this.imgBase;
        this.healthBar.innerHTML = this.health;
    }

}

export default Gibbon;