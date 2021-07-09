//记分牌类
class ScorePanel {
    score = 0;
    level = 1;

    scoreELle:HTMLElement;
    levelEle:HTMLElement;
    //设置一个变量限制等级
    maxLevel:number
    //设置一个变量表示升一级需要的分数
    upScore:number

    constructor(maxLevel:number = 10,upScore:number = 10) {
        this.scoreELle = document.getElementById('score')!;//加感叹号表示不会为空不用管
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    //设置一个加分的方法
    addScore() {
        this.score ++;
        this.scoreELle.innerHTML = this.score + ''
        //10分升一级
        if(this.score % this.upScore === 0) {
            this.levelUp()
        }
    }

    //设置一个升级的方法
    levelUp() {
        //限制等级
        if(this.level<this.maxLevel){
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}

export  default ScorePanel