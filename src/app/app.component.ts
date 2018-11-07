import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'canvas-test';
  @ViewChild('canvas')
  canvas: ElementRef;
  arcTimeTicket;

  ngOnInit() {
    this.drawArc();
  }

  ngOnDestroy() {
    if(this.arcTimeTicket){ //页面销毁时清空
      　　　　 cancelAnimationFrame(this.arcTimeTicket);
     　　　　}
  }

  drawArc() {
    let canvas = this.canvas.nativeElement;//获取到具体元素
    let context = canvas.getContext('2d'); //获取canvas中的画图环境 上下文

    let width = canvas.width;//获取宽度

    let height = canvas.height;//获取高度

    let clockDimensions = width / 2;//圆大小：初始值设置

    context.clearRect(0, 0, width, height);//清理当前画布，以便后期绘制

    context.beginPath(); //开启新路径

    const piece = 180; //这是圆的锯齿具体条数 目测ui给的是180条 

    let index = 0;

    const draw = () => {

      context.save(); //用来保存Canvas的状态

      context.beginPath();//开始绘画

      context.lineWidth = 2;//锯齿的粗细

      context.strokeStyle = "rgba(0,192,255,0.65)";//锯齿的颜色

      context.translate(width / 2, height / 2); //旋转角度

      context.rotate(Math.PI * 2 / piece * (index + 45)); //绘制环境旋转方法,以（0,0）为参考点进行旋转

      context.moveTo(0, clockDimensions - clockDimensions / 20);//起始点

      context.lineTo(0, clockDimensions - clockDimensions / 9);//结束点

      context.stroke();//描边

      context.restore();//用来恢复Canvas之前保存的状态

      index++;

      if (index < piece) { //如果小于的话  表示就是页面初始化  就加上这个动画  类似于loading

        this.arcTimeTicket = requestAnimationFrame(draw);//此函数如有不理解 可去百度查

      }

    };

    cancelAnimationFrame(this.arcTimeTicket); //清空 这一步很重要  window。resize时 可以清空 不会导致页面错乱

    draw();//执行绘画


  }


}
