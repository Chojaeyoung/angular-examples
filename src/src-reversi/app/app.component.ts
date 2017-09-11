import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private goBoardValue : string[][];
  private turnState : number; //1 or 2, 1:black, 2:red

  private _GO_BOARD_SIZE:number = 8;
  private _WHITE_SHONE_TYPE:number = 2;
  private _BLACK_STONE_TYPE:number = 1;

  constructor() { 
    this.goBoardValue = [];
    for(var i=0;i<this._GO_BOARD_SIZE;i++){
      this.goBoardValue[i] = [];
      for(var j=0;j<this._GO_BOARD_SIZE;j++) {
        this.goBoardValue[i][j] = 'none-stone';
      }
    }
    this.turnState = this._BLACK_STONE_TYPE; //default
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
    if(this.turnState === this._BLACK_STONE_TYPE) {
      this.turnState = this._WHITE_SHONE_TYPE;
      this.goBoardValue[x][y] = 'black-stone';
    } else { //white
      this.turnState = this._WHITE_SHONE_TYPE;
      this.goBoardValue[x][y] = 'white-stone';
    }

  }
}

console.log("loading");