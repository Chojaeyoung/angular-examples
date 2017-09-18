import { Component } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private goBoardValue : string[][];
  private turnState : number; //1 or 2, 1:black, 2:white
  private score = {
    white: 2,
    black: 2
  }
  private changeStoneDirects = [false,false,false,false,false,false,false,false];

  private _GO_BOARD_SIZE = 8;
  private _WHITE_STONE_TYPE = 2;
  private _BLACK_STONE_TYPE = 1;
  private _INIT_STONE_IDX_NUMBER_ONE = 3;
  private _INIT_STONE_IDX_NUMBER_TWO = 4;

  constructor() {}

  ngOnInit() {
    this.goBoardValue = [];
    for(var i=0;i<this._GO_BOARD_SIZE;i++){
      this.goBoardValue[i] = [];
      for(var j=0;j<this._GO_BOARD_SIZE;j++) {
        if(i === this._INIT_STONE_IDX_NUMBER_ONE && j === this._INIT_STONE_IDX_NUMBER_ONE) {
          this.goBoardValue[i][j] = 'black-stone';
        } else if(i === this._INIT_STONE_IDX_NUMBER_ONE && j === this._INIT_STONE_IDX_NUMBER_TWO) {
          this.goBoardValue[i][j] = 'white-stone';
        } else if(i === this._INIT_STONE_IDX_NUMBER_TWO && j === this._INIT_STONE_IDX_NUMBER_ONE) {
          this.goBoardValue[i][j] = 'white-stone';
        } else if(i === this._INIT_STONE_IDX_NUMBER_TWO && j === this._INIT_STONE_IDX_NUMBER_TWO) {
          this.goBoardValue[i][j] = 'black-stone';
        } else {
          this.goBoardValue[i][j] = 'none-stone';
        }
      }
    }
    this.turnState = this._BLACK_STONE_TYPE; //default
  }

  initScore() {
    this.score.black = 0;
    this.score.white = 0;
  }

  initChangeStoneDirects() {
    this.changeStoneDirects = [false,false,false,false,false,false,false,false];
  }

  clickStoneArea(x:number,y:number) {
    console.log("좌표",x,y);
    this.initChangeStoneDirects();    
    if(this.checkReversiRull(x,y) === true) {
      this.putStone(x,y);
      this.calculatorScore();
      this.changeStone(x,y);
      this.setTurn();
    }
    console.log("after check function goBaordValue[x][y] = %s",this.goBoardValue[x][y]);  
  }

  setTurn() {
     if(this.turnState === this._BLACK_STONE_TYPE) {
        this.turnState = this._WHITE_STONE_TYPE;
      } else { //white
        this.turnState = this._BLACK_STONE_TYPE;
      }
  }

  changeStone(x:number,y:number) {
    var targetStone = this.turnState === 1 ? 'black-stone' : 'white-stone';
    for(var i=0; i< this._GO_BOARD_SIZE ; i++) {
      //changeStoneDirects[i]가 true라면 해당 방향의 돌 색을 현재 턴의 돌 색상으로 변경해야 한다.
      if(this.changeStoneDirects[i]) {
        switch(i) {
          case 0: //11시 방향
            for(var j=1;;j++) {
              if(this.goBoardValue[x-j][y-j] !== targetStone && this.goBoardValue[x-j][y-j] !== 'none-stone') {
                this.goBoardValue[x-j][y-j] = targetStone;
              } else { break; }
            }
          continue;
          case 1: //9시 방향
            for(var j=1;;j++) {
              if(this.goBoardValue[x-j][y] !== targetStone && this.goBoardValue[x-j][y] !== 'none-stone') {
                this.goBoardValue[x-j][y] = targetStone;
              } else { break; }
            }
          continue;
          case 2: //7시 방향
            for(var j=1;;j++) {
              if(this.goBoardValue[x-j][y+j] !== targetStone && this.goBoardValue[x-j][y+j] !== 'none-stone') {
                this.goBoardValue[x-j][y+j] = targetStone;
              } else { break; }
            }
          continue;
          case 3: //6시 방향
            for(var j=1;;j++) {
              if(this.goBoardValue[x][y+j] !== targetStone && this.goBoardValue[x][y+j] !== 'none-stone') {
                this.goBoardValue[x][y+j] = targetStone;
              } else { break; }
            }
          continue;
          case 4: //5시 방향
            for(var j=1;;j++) {
              if(this.goBoardValue[x+j][y+j] !== targetStone && this.goBoardValue[x+j][y+j] !== 'none-stone') {
                this.goBoardValue[x+j][y+j] = targetStone;
              } else { break; }
            }
          continue;
          case 5: //3시 방향
            for(var j=1;;j++) {
              if(this.goBoardValue[x+j][y] !== targetStone && this.goBoardValue[x+j][y] !== 'none-stone') {
                this.goBoardValue[x+j][y] = targetStone;
              } else { break; }
            }
          continue;
          case 6: //1시 방향
            for(var j=1;;j++) {
              if(this.goBoardValue[x+j][y-j] !== targetStone && this.goBoardValue[x+j][y-j] !== 'none-stone') {
                this.goBoardValue[x+j][y-j] = targetStone;
              } else { break; }
            }
          continue;
          case 7: //12시 방향
            for(var j=1;;j++) {
              if(this.goBoardValue[x][y-j] !== targetStone && this.goBoardValue[x][y-j] !== 'none-stone') {
                this.goBoardValue[x][y-j] = targetStone;
              } else { break; }
            }
          continue;
        }
      }
    }
  }

  checkReversiRull(x:number,y:number) {
    console.log("checkReversiRull");
    if(this.goBoardValue[x][y] !== 'none-stone') {
      alert("existing stone!");
      return false;
    } 
    /* [ ][ ][ ]
     * [ ][O][ ]
     * [ ][ ][ ]
     * check 
     */
    /* type 
     * 0 : x-1, y-1
     * 1 : x-1, y
     * 2 : x-1, y+1
     * 3 : x, y-1
     * 4 : x+1, y-1
     * 5 : x+1, y
     * 6 : x+1, y+1
     * 7 : x, y+1
     */
    
    var putStoneValue = false;
    for(var i=0; i < this._GO_BOARD_SIZE; i++){
      switch(i) {
      case 0:
        console.log("case 0");
        if(x === 0 || x === 1 || y === 0 || y === 1) { console.info("bad stone, 돌이 바둑판 끝에 위치하고 있습니다. 검사할 필요 x"); continue; }
        //11시 돌이 있는지 없는지 검사.
        if(this.goBoardValue[x-1][y-1] === 'none-stone') { console.info("bad stone, 11시 방향에 돌이 없습니다."); continue; } 
        var whoIsTurn = "";
        if(this.turnState === 1) {
          whoIsTurn = "black-stone";        
        } else {
          whoIsTurn = "white-stone";
        }
        console.log("whoIsTurn is [%s]",whoIsTurn);
        //[x-1][y-1]가 바둑판에 놓으려는 돌의 색상과 다를 경우에만 진행.
        if(this.goBoardValue[x-1][y-1] === whoIsTurn) { console.info("bad stone, 11시 방향 돌은 같은 색상의 돌입니다."); continue; }
          //11시 방향에 놓는 돌 맞붙은 돌을 제외하고, 라인에 동일한 색상의 돌이 있는지 검색한다.
          for(var offset=2; offset < this._GO_BOARD_SIZE; offset++) {
            //놓으려는 돌이 라인 끝에 붙거나 끝에서 한 칸 떨어진 경우 돌 색상을 변경할 수 없으므로 해당 경우는 제외한다. 
            if((x-offset) > -1 ) { 
              if((y-offset) > -1) {
                if(this.goBoardValue[x-offset][y-offset] === whoIsTurn) {
                  putStoneValue = true;
                  this.changeStoneDirects[i] = putStoneValue;
                  console.info("correct stone, 11시 방향에 규칙 성립");
                  // continue;
                  break;
                }
              } else { break; }
              // } else { continue; }
            } else { break;; }
            // } else { continue; }
          }
          if(putStoneValue === false) { console.info("bad stone"); };
        continue;
      case 1:
        console.log("case 1");
        if(x === 0 || x === 1) { console.info("bad stone, 돌이 바둑판 끝에 위치하고 있습니다. 검사할 필요 x"); continue; }
        //9시 돌이 있는지 없는지 검사.
        if(this.goBoardValue[x-1][y] === 'none-stone') { console.info("bad stone, 9시 방향에 돌이 없습니다."); continue; } 
        var whoIsTurn = "";
        if(this.turnState === 1) {
          whoIsTurn = "black-stone";        
        } else {
          whoIsTurn = "white-stone";
        }
        console.log("whoIsTurn is [%s]",whoIsTurn);
        //[x-1][y]가 바둑판에 놓으려는 돌의 색상과 다를 경우에만 진행.
        if(this.goBoardValue[x-1][y] === whoIsTurn) { console.info("bad stone, 9시 방향 돌은 같은 색상의 돌입니다."); continue; }
          //11시 방향에 놓는 돌 맞붙은 돌을 제외하고, 라인에 동일한 색상의 돌이 있는지 검색한다.
          for(var offset=2; offset < this._GO_BOARD_SIZE; offset++) {
            //놓으려는 돌이 라인 끝에 붙거나 끝에서 한 칸 떨어진 경우 돌 색상을 변경할 수 없으므로 해당 경우는 제외한다. 
            if((x-offset) > -1 ) { 
              
                if(this.goBoardValue[x-offset][y] === whoIsTurn) {
                  putStoneValue = true;
                  this.changeStoneDirects[i] = putStoneValue;
                  console.info("correct stone, 9시 방향에 규칙 성립");
                  // continue;
                  break;
                }
              
            // } else { continue; }
            } else { break;; }
          }
          if(putStoneValue === false) { console.info("bad stone"); };
        continue;
      case 2:
        console.log("case 2");
        if(x === 0 || x === 1 || y === 6 || y === 7) { console.info("bad stone, 돌이 바둑판 끝에 위치하고 있습니다. 검사할 필요 x"); continue; }
        //9시 돌이 있는지 없는지 검사.
        if(this.goBoardValue[x-1][y+1] === 'none-stone') { console.info("bad stone, 7시 방향에 돌이 없습니다."); continue; } 
        var whoIsTurn = "";
        if(this.turnState === 1) {
          whoIsTurn = "black-stone";        
        } else {
          whoIsTurn = "white-stone";
        }
        console.log("whoIsTurn is [%s]",whoIsTurn);
        //[x-1][y]가 바둑판에 놓으려는 돌의 색상과 다를 경우에만 진행.
        if(this.goBoardValue[x-1][y+1] === whoIsTurn) { console.info("bad stone, 7시 방향 돌은 같은 색상의 돌입니다."); continue; }
          //7시 방향에 놓는 돌 맞붙은 돌을 제외하고, 라인에 동일한 색상의 돌이 있는지 검색한다.
          for(var offset=2; offset < this._GO_BOARD_SIZE; offset++) {
            //놓으려는 돌이 라인 끝에 붙거나 끝에서 한 칸 떨어진 경우 돌 색상을 변경할 수 없으므로 해당 경우는 제외한다. 
            if((x-offset) > -1 ) { 
              if((y+offset) < 8) {
                if(this.goBoardValue[x-offset][y+offset] === whoIsTurn) {
                  putStoneValue = true;
                  this.changeStoneDirects[i] = putStoneValue;
                  console.info("correct stone, 7시 방향에 규칙 성립");
                  // continue;
                  break;
                }
              // } else { continue; }
              } else { break; }
            // } else { continue; }
            } else { break; }
          }
          if(putStoneValue === false) { console.info("bad stone"); };
        continue;
      case 3:
        console.log("case 3");
        if(y === 6 || y === 7) { console.info("bad stone, 돌이 바둑판 끝에 위치하고 있습니다. 검사할 필요 x"); continue; }
        //9시 돌이 있는지 없는지 검사.
        if(this.goBoardValue[x][y+1] === 'none-stone') { console.info("bad stone, 6시 방향에 돌이 없습니다."); continue; } 
        var whoIsTurn = "";
        if(this.turnState === 1) {
          whoIsTurn = "black-stone";        
        } else {
          whoIsTurn = "white-stone";
        }
        console.log("whoIsTurn is [%s]",whoIsTurn);
        //[x-1][y]가 바둑판에 놓으려는 돌의 색상과 다를 경우에만 진행.
        if(this.goBoardValue[x][y+1] === whoIsTurn) { console.info("bad stone, 6시 방향 돌은 같은 색상의 돌입니다."); continue; }
          //11시 방향에 놓는 돌 맞붙은 돌을 제외하고, 라인에 동일한 색상의 돌이 있는지 검색한다.
        for(var offset=2; offset < this._GO_BOARD_SIZE; offset++) {
          //놓으려는 돌이 라인 끝에 붙거나 끝에서 한 칸 떨어진 경우 돌 색상을 변경할 수 없으므로 해당 경우는 제외한다. 
            if((y+offset) < 8) {
              if(this.goBoardValue[x][y+offset] === whoIsTurn) {
                putStoneValue = true;
                this.changeStoneDirects[i] = putStoneValue;
                console.info("correct stone, 6시 방향에 규칙 성립");
                break;
                // continue;
              }
            } else { break; }
          // } else { continue; }
        }
        if(putStoneValue === false) { console.info("bad stone"); };
        continue; 
      case 4:
      console.log("case 4");
        if(x === 7 || x === 6 || y === 6 || y === 7) { console.info("bad stone, 돌이 바둑판 끝에 위치하고 있습니다. 검사할 필요 x"); continue; }
        //9시 돌이 있는지 없는지 검사.
        if(this.goBoardValue[x+1][y+1] === 'none-stone') { console.info("bad stone, 5시 방향에 돌이 없습니다."); continue; } 
        var whoIsTurn = "";
        if(this.turnState === 1) {
          whoIsTurn = "black-stone";        
        } else {
          whoIsTurn = "white-stone";
        }
        console.log("whoIsTurn is [%s]",whoIsTurn);
        //[x-1][y]가 바둑판에 놓으려는 돌의 색상과 다를 경우에만 진행.
        if(this.goBoardValue[x+1][y+1] === whoIsTurn) { console.info("bad stone, 5시 방향 돌은 같은 색상의 돌입니다."); continue; }
          //7시 방향에 놓는 돌 맞붙은 돌을 제외하고, 라인에 동일한 색상의 돌이 있는지 검색한다.
          for(var offset=2; offset < this._GO_BOARD_SIZE; offset++) {
            //놓으려는 돌이 라인 끝에 붙거나 끝에서 한 칸 떨어진 경우 돌 색상을 변경할 수 없으므로 해당 경우는 제외한다. 
            if((x+offset) < 8 ) { 
              if((y+offset) < 8) {
                if(this.goBoardValue[x+offset][y+offset] === whoIsTurn) {
                  putStoneValue = true;
                  this.changeStoneDirects[i] = putStoneValue;
                  console.info("correct stone, 5시 방향에 규칙 성립");
                  // continue;
                  break;
                }
              // } else { continue; }
              } else { break; }
            // } else { continue; }
            } else { break; }
          }
          if(putStoneValue === false) { console.info("bad stone"); };
        continue; 
      case 5:
        console.log("case 5");
        if(x === 6 || x === 7) { console.info("bad stone, 돌이 바둑판 끝에 위치하고 있습니다. 검사할 필요 x"); continue; }
        //9시 돌이 있는지 없는지 검사.
        if(this.goBoardValue[x+1][y] === 'none-stone') { console.info("bad stone, 3시 방향에 돌이 없습니다."); continue; } 
        var whoIsTurn = "";
        if(this.turnState === 1) {
          whoIsTurn = "black-stone";        
        } else {
          whoIsTurn = "white-stone";
        }
        console.log("whoIsTurn is [%s]",whoIsTurn);
        //[x-1][y]가 바둑판에 놓으려는 돌의 색상과 다를 경우에만 진행.
        if(this.goBoardValue[x+1][y] === whoIsTurn) { console.info("bad stone, 3시 방향 돌은 같은 색상의 돌입니다."); continue; }
          //7시 방향에 놓는 돌 맞붙은 돌을 제외하고, 라인에 동일한 색상의 돌이 있는지 검색한다.
          for(var offset=2; offset < this._GO_BOARD_SIZE; offset++) {
            //놓으려는 돌이 라인 끝에 붙거나 끝에서 한 칸 떨어진 경우 돌 색상을 변경할 수 없으므로 해당 경우는 제외한다. 
            if((x+offset) < 8 ) {               
                if(this.goBoardValue[x+offset][y] === whoIsTurn) {
                  putStoneValue = true;
                  this.changeStoneDirects[i] = putStoneValue;
                  console.info("correct stone, 7시 방향에 규칙 성립");
                  // continue;
                  break;
                }
            // } else { continue; }
            } else { break; }
          }
          if(putStoneValue === false) { console.info("bad stone"); };
        continue; 
      case 6:  
        console.log("case 6");
        if(x === 6 || x === 7 || y === 0 || y === 1) { console.info("bad stone, 돌이 바둑판 끝에 위치하고 있습니다. 검사할 필요 x"); continue; }
        //9시 돌이 있는지 없는지 검사.
        if(this.goBoardValue[x+1][y-1] === 'none-stone') { console.info("bad stone, 1시 방향에 돌이 없습니다."); continue; } 
        var whoIsTurn = "";
        if(this.turnState === 1) {
          whoIsTurn = "black-stone";        
        } else {
          whoIsTurn = "white-stone";
        }
        console.log("whoIsTurn is [%s]",whoIsTurn);
        //[x+1][y-1]가 바둑판에 놓으려는 돌의 색상과 다를 경우에만 진행.
        if(this.goBoardValue[x+1][y-1] === whoIsTurn) { console.info("bad stone, 1시 방향 돌은 같은 색상의 돌입니다."); continue; }
          //1시 방향에 놓는 돌 맞붙은 돌을 제외하고, 라인에 동일한 색상의 돌이 있는지 검색한다.
          for(var offset=2; offset < this._GO_BOARD_SIZE; offset++) {
            //놓으려는 돌이 라인 끝에 붙거나 끝에서 한 칸 떨어진 경우 돌 색상을 변경할 수 없으므로 해당 경우는 제외한다. 
            if((x+offset) < 8) { 
              if((y-offset) > -1) {
                if(this.goBoardValue[x+offset][y-offset] === whoIsTurn) {
                  putStoneValue = true;
                  this.changeStoneDirects[i] = putStoneValue;
                  console.info("correct stone, 1시 방향에 규칙 성립");
                  // continue;
                  break;
                }
              // } else { continue; }
              } else { break; }
            // } else { continue; }
            } else { break; }
          }
          if(putStoneValue === false) { console.info("bad stone"); };
        continue;
      case 7:
        console.log("case 7");
        if(y === 0 || y === 1) { console.info("bad stone, 돌이 바둑판 끝에 위치하고 있습니다. 검사할 필요 x"); continue; }
        //9시 돌이 있는지 없는지 검사.
        if(this.goBoardValue[x][y-1] === 'none-stone') { console.info("bad stone, 12시 방향에 돌이 없습니다."); continue; } 
        var whoIsTurn = "";
        if(this.turnState === 1) {
          whoIsTurn = "black-stone";        
        } else {
          whoIsTurn = "white-stone";
        }
        console.log("whoIsTurn is [%s]",whoIsTurn);
        //[x][y-1]가 바둑판에 놓으려는 돌의 색상과 다를 경우에만 진행.
        if(this.goBoardValue[x][y-1] === whoIsTurn) { console.info("bad stone, 1시 방향 돌은 같은 색상의 돌입니다."); continue; }
          //7시 방향에 놓는 돌 맞붙은 돌을 제외하고, 라인에 동일한 색상의 돌이 있는지 검색한다.
          for(var offset=2; offset < this._GO_BOARD_SIZE; offset++) {
            //놓으려는 돌이 라인 끝에 붙거나 끝에서 한 칸 떨어진 경우 돌 색상을 변경할 수 없으므로 해당 경우는 제외한다. 
            if((y-offset) > -1) {
              if(this.goBoardValue[x][y-offset] === whoIsTurn) {
                putStoneValue = true;
                this.changeStoneDirects[i] = putStoneValue;
                console.info("correct stone, 7시 방향에 규칙 성립");
                // continue;
                break;
              }
            // } else { continue; }
            } else { break; }
          }
          if(putStoneValue === false) { console.info("bad stone"); };
        continue;
      }
      
      putStoneValue = false;
    }
    for(var i=0; i<this._GO_BOARD_SIZE ; i++) {
      if(this.changeStoneDirects[i]===true) {
        return true;
      }
    }
    return false;
    
  }
  
  calculatorScore() {
    this.initScore();
    for(var i=0; i<this._GO_BOARD_SIZE ; i++) {
      for(var j=0; j<this._GO_BOARD_SIZE ; j++) {
        if(this.goBoardValue[i][j] !== 'none-stone') {
          if(this.goBoardValue[i][j] === 'white-stone') {
            this.score.white++;
          } else {
            this.score.black++;
          }
        }
      }
    }
  }
  
  putStone(x:number, y:number) {
    if(this.turnState === this._BLACK_STONE_TYPE) {
      this.goBoardValue[x][y] = 'black-stone';
    } else { //white
      this.goBoardValue[x][y] = 'white-stone';
    }
  }
}

console.log("loading");

/* 2017/09/11
 * 중간 점검
 * 이미지 보단 css로, 이미지는 확장성이 떨어진다.
 * type이 number인 것은 number를 붙이지 않아도 된다. 오히려 더 가독성이 떨어질 수 있음.
 * constructor에 초기 값을 하는 것 보다 ngOnInit을 사용하는 게 좋다. constructor에는 dependency injection을 주로 사용한다.
 * 후에 가변적인 요소와 불변의 요소를 보고 코드를 리팩토링하도록 하자.
 * 
 * 첨언 코드에는 UI관련 요소를 넣지 말자, 상태 state는 enum을 사용해 보도록 하자.
 */