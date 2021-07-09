class Snake {
    //表示蛇头的元素
    head:HTMLElement;
    //蛇的身体(包含舌头)
    bodies:HTMLCollection;
    //获取蛇的容器
    element:HTMLElement;
    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake>div')!;
        this.bodies = this.element.getElementsByTagName('div')
    }

    //获取蛇头X轴的坐标
    get X() {
        return this.head.offsetLeft
    }

    //获取蛇头Y轴的坐标
    get Y() {
        return this.head.offsetTop
    }

    set X(value) {
        //如果新值和旧值相同就直接返回不再修改
        if(this.X===value){
            return
        }
        //X值的合法范围  0-290之间
        if(value<0 || value>290) {
            //说明蛇撞墙了
            throw new Error("蛇撞墙了！")
        }

        //修改X时,是在修改水平坐标,蛇在向左走时,不能向右掉头
        //判断蛇头的x坐标是否和第二节身体的X坐标相同,则发生了掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            //如果发生了掉头,让蛇头向反方向继续移动
            if(value>this.X){
                //如果value>X 说明蛇在向右走
                value = this.X - 10
            }else {
                value = this.X + 10
            }
        }

        //移动身体
        this.moveBody()

        this.head.style.left = value + 'px'

        //检查蛇头是否撞到了自己
        this.checkHeadBody()
    }

    set Y(value) {
        if(this.Y===value){
            return
        }
        //Y值的合法范围  0-290之间
        if(value<0 || value>290) {
            //说明蛇撞墙了
            throw new Error("蛇撞墙了！")
        }

        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            //如果发生了掉头,让蛇头向反方向继续移动
            if(value>this.Y){
                //如果value>X 说明蛇在向下走
                value = this.Y - 10
            }else {
                value = this.Y + 10
            }
        }


        //移动身体
        this.moveBody()

        this.head.style.top = value + 'px'

        this.checkHeadBody()
    }

    //蛇增加身体的方法
    addBody() {
        //向element中添加一个div
        this.element.insertAdjacentHTML("beforeend","<div></div>")
    }

    //添加一个蛇身体移动的方法
    moveBody() {
        /*
        *   将后边的身体设置为前边身体的位置  从后往前改
        *       第3节 = 第2节的位置
        *       第2节 = 蛇头的位置
        *
        * */

        //遍历获取所有的身体
        for (let i=this.bodies.length - 1;i>0;i--) {
            //获取前边身体的位置
            let preX = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let preY = (this.bodies[i - 1] as HTMLElement).offsetTop;

            //将值设置到当前位置上
            (this.bodies[i] as HTMLElement).style.left = preX + 'px';
            (this.bodies[i] as HTMLElement).style.top = preY + 'px';
        }
    }

    //检查是否撞到自己
    checkHeadBody() {
        //获取所有的身体,检查其是否和蛇头的坐标发生重叠
        for(let i = 1;i<this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                //进入判断说明蛇头撞到了身体,游戏结束
                throw new Error("撞到身体")
            }
        }
    }

}

export default Snake