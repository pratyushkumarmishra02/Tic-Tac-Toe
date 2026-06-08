let boxes = document.querySelectorAll(".box");
let msg=document.querySelector("#msg");
let newBtn = document.querySelector("#newGame-btn");
let resetBtn = document.querySelector("#reset-btn");
let winnerContainer = document.querySelector(".winner-container");
let turnO =true;
let count = 0;

let winnerPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
boxes.forEach((box) => {
   box.addEventListener("click", () => {
    if(turnO){
        box.innerText="O";
        box.classList.add("pacificBlue");
        box.classList.remove("purple");
        turnO=false;
    }else{
        box.innerText="X";
        box.classList.add("purple");
        box.classList.remove("pacificBlue");
        turnO=true;
    }
    count++;
      box.disabled = true;

      let isWinner = checkWinner();

      if (!isWinner && count === 9) {
         msg.innerText = "Match Draw";
         winnerContainer.classList.remove("hide");
      }
   }); 
});
const resetGame = () => {
    turnO =true;
    count=0;
    enabledBoxes();
    winnerContainer.classList.add("hide");
}

const showWinner = (winner) => {
    msg.innerText=`Congratulation Winner is ${winner}`;
    winnerContainer.classList.remove("hide");
    disabledBoxes();
}
const checkWinner = () => {
    for(let pattern of winnerPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
            showWinner(pos1Val);
            return true;
        }
        }
    }
    return false;
};

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled=true;
    }
}

const enabledBoxes = () =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);