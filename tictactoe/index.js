
class TicTacToe {
  constructor($target, $state) {
    this.$target = $target;
    this.$state = $state;
    this.init();
    this.onAreaClick = this.onAreaClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onReStart = this.onReStart.bind(this);

    this.$target.querySelector("#board").addEventListener("click", this.onAreaClick);
    this.$target.querySelector("#select").addEventListener("click", (e) => {
      const { innerText } = e.target;
      this.onSelect(innerText);
    });
    this.$target.querySelector("#restart").addEventListener("click", this.onReStart);
    this.render();
  }

  checkFinished() {
    const { boardStatus } = this.$state;
    const board = this.$target.querySelector("#board");
    let row, col;
    for (let i = 0; i < 3; i++) {
      row = '', col = '';
      for (let j = 0; j < 3; j++) {
        row += boardStatus[i * 3 + j];
        col += boardStatus[j * 3 + i];
      }
      if (row === "111") {
        // row i에 col jjj 색칠
        for (let k = 0; k < 3; k++) {
          board.children[i].children[k].style.backgroundColor = "#12bdac7e";
        }
        this.scoreUpdate(1);
        alert("O가 이겼습니다.")
        return true;
      } else if (row === "000") {
        // row i에 col jjj 색칠
        for (let k = 0; k < 3; k++) {
          board.children[i].children[k].style.backgroundColor = "#12bdac7e";
        }
        this.scoreUpdate(0);
        alert("X가 이겼습니다.")
        return true
      } else if (col === "111") {
        // col i에 row jjj
        for (let k = 0; k < 3; k++) {
          board.children[k].children[i].style.backgroundColor = "#12bdac7e";
        }
        this.scoreUpdate(1);
        alert("O가 이겼습니다.")
        return true;
      } else if (col === "000") {
        // col i에 row jjj
        for (let k = 0; k < 3; k++) {
          board.children[k].children[i].style.backgroundColor = "#12bdac7e";
        }
        this.scoreUpdate(0);
        alert("X가 이겼습니다.")
        return true;
      }
    }

    if (boardStatus[0] !== undefined && boardStatus[0] === boardStatus[4] && boardStatus[4] === boardStatus[8]) {
      board.children[0].children[0].style.backgroundColor = "#12bdac7e";
      board.children[1].children[1].style.backgroundColor = "#12bdac7e";
      board.children[2].children[2].style.backgroundColor = "#12bdac7e";
      if (boardStatus[0] === 0) {
        this.scoreUpdate(0);
        alert("X가 이겼습니다.");
      } else {
        this.scoreUpdate(1);
        alert("O가 이겼습니다.");
      }
      return true;
    } else if (boardStatus[2] !== undefined && boardStatus[2] === boardStatus[4] && boardStatus[4] === boardStatus[6]) {
      board.children[0].children[2].style.backgroundColor = "#12bdac96";
      board.children[1].children[1].style.backgroundColor = "#12bdac96";
      board.children[2].children[0].style.backgroundColor = "#12bdac96";
      if (boardStatus[2] === 0) {
        this.scoreUpdate(0);
        alert("X가 이겼습니다.");
      } else {
        this.scoreUpdate(1);
        alert("O가 이겼습니다.");
      }
      return true;
    }
    for (let i = 0; i < boardStatus.length; i++) {
      if (boardStatus[i] === undefined) {
        return false;
      }
    }
    alert("비겼습니다.");
    return true;
  }

  scoreUpdate(winner) {
    const { score } = this.$state;
    let newScore;
    if (winner === 0) {
      newScore = [score[0] + 1, score[1]];
    } else {
      newScore = [score[0], score[1] + 1];
    }
    this.setState({
      score: newScore
    })
    this.$target.querySelector("#score-board").children[0].innerText = newScore[0];
    this.$target.querySelector("#score-board").children[2].innerText = newScore[1];
  }

  getAvailablePos() {
      while (true) {
        const randomPos = Math.floor(Math.random() * 9);

        if (this.$state.boardStatus[randomPos] === undefined) {
          return randomPos;
        }
      }
  }

  playCounterPart() {
    const pos = this.getAvailablePos();
    const { boardStatus } = this.$state;
    const newStatus = boardStatus.slice();

    if (this.$state.selected === 0) {
      newStatus[pos] = 1;
    } else {
      newStatus[pos] = 0;
    }
    this.setState({ boardStatus: newStatus })
    this.checkFinished();
  }

  onSelect(sign) {
    if (this.$state.selected !== null) return;

    const selected = sign === "X" ? 0 : 1;
    const selectTurn = this.$target.querySelector("#select-ox");
    if (selected === 0) {
      selectTurn.children[0].classList.add("selected");
    } else {
      selectTurn.children[1].classList.add("selected");
    }
    this.setState({ selected });
    if (selected === 1) {
      this.playCounterPart();
    }
  }

  onReStart() {
    this.init();
    this.setState({
      boardStatus: new Array(9),
      selected: null,
      finished: false,
    })
  }
  // 끝났는데, 계속 클릭할경우 말 표시가 가능한 부분 수정하면 끝.
  onAreaClick(e) {
    const { target } = e;
    const { boardStatus, finished } = this.$state;
    if (finished) return ;
    if (target.closest(".block")) {
      const row = Number(target.dataset.row);
      const col = Number(target.dataset.col);
      if (boardStatus[row * 3 + col] !== undefined) {
        return ;
      }
      const newStatus = boardStatus.slice();
      if (!this.$state.selected) {
        this.onSelect("X");
      }
      newStatus[row * 3 + col] = this.$state.selected;
      this.setState({ boardStatus: newStatus })
      if (this.checkFinished()) {
        this.setState({ finished: true })
        return ;
      }

      this.playCounterPart();
    }
  }

  init() {
    // player init
    const playerOne = document.createElement("div");
    const playerTwo = document.createElement("div");
    playerOne.textContent = "X";
    playerTwo.textContent = "O";
    this.$target.querySelector("#select-ox").innerHTML = ``;
    this.$target.querySelector("#select-ox").append(playerOne, playerTwo);
    // board init
    const rows = [];
    for (let i = 0; i < 3; i++) {
      const row = document.createElement("div");
      row.className = "row";
      for (let j = 0; j < 3; j++) {
        const block = document.createElement("div");
        block.className = "block";
        block.dataset.row = i;
        block.dataset.col = j;
        row.append(block)
      }
      rows.push(row);
    }
    this.$target.querySelector('#board').innerHTML = ``;
    this.$target.querySelector('#board').append(...rows);
  }

  setState(nextState) {
    this.$state = {
      ...this.$state,
      ...nextState
    }
    this.render();
  }

  render() {
    const board = this.$target.querySelector("#board");
    for (let i = 0; i < 3; i++) {
      const row = board.children[i];
      for (let j = 0; j < 3; j++) {
        const value = this.$state.boardStatus[i * 3 + j]
        if (value === 0) {
          row.children[j].innerHTML = "X";
        } else if (value === 1) {
          row.children[j].innerHTML = "O";
        }
      }
    }
  }
}
const target = document.getElementById("tic-tac-toe");
const board = new TicTacToe(target, {
  boardStatus: new Array(9), // new arr 해서 빈것으로 채우고 0, 1로 o, x 판단해야 쉬워짐.
  selected: null, // X: 0, O: 1
  score: [0, 0],
  finished: false
});

/*
  틱택토 보드 클래스를 만들어서 데이터 (현상황)를 저장하고,
  메서드로 여러가지 기능을 구현한다.

  시작전에 나의 말 (O, X)을 선택한다. (선공, 후공도 선택됨)

  onAreaClick
  게임을 시작해서 말 판에 클릭하면 상태를 업데이트 한다.

  checkDangerous
  상대방이 2개 연속된 로우를 갖고 있냐? (좌우 대각선 및 가로 세로)

  findAvailable
  checkDangerous
  1. 예 -> 그 로우 혹은 대각선에 훼방
  2. 아니오 -> 랜덤으로 빈곳 픽.

  checkFinished
  가로, 세로, 좌우 대각선 3개 연속된 것 있는지 점검.
  있다면 나인지 상대인지 판단 후 승리 선언 및 종료.
  혹은 놓을자리가 없는지!
  계속 할 것인지 물어본다.

  render
  상태가 업데이트되면 그린다.


*/
