import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private goBoardValue : string[][];
  private turnState : number; //1 or 2, 1:black, 2:red
  constructor() { 
    this.goBoardValue = [];
    for(var i=0;i<8;i++){
      this.goBoardValue[i] = [];
      for(var j=0;j<8;j++) {
        this.goBoardValue[i][j] = 'none-stone';
      }
    }
    this.turnState = 1;
  }

  clickStoneArea(x:number,y:number) {
    console.log("좌표",x,y);
    if(this.goBoardValue[x][y] === 'none-stone') {
      this.putStone(x,y);
    } else {
      alert("existing stone!");
      return;
    }
  }
  
  putStone(x:number, y:number) {
    if(this.turnState === 1) {
      this.turnState = 2;
      this.goBoardValue[x][y] = 'black-stone';
    } else {
      this.turnState = 1;
      this.goBoardValue[x][y] = 'white-stone';
    }

  }
}

console.log("loading");