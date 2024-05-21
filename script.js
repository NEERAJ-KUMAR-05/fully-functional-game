let boxes = document.querySelectorAll(".box");
let winMsgBox = document.querySelector(".hide");
let winMsg = document.querySelector(".winMsg");
let newGameBtn = document.querySelector("#newGameBtn");
let resetBtn = document.querySelector("#resetBtn");

let count = 0;
let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(turnO){
            box.innerText = "O";
            turnO = false;
            if(box.innerText == "O"){
                box.style.color = "red";
            };
        }else{
            box.innerText = "X";
            turnO = true;
            if(box.innerText == "X"){
                box.style.color = "white";
            };
        };
        box.disabled = true;
        winner();
        
    });
});

const disableBoxes =()=>{
    for(let box of boxes){
        turnO = true;
        box.disabled = true;
    }
};
const enableBoxes =()=>{
    for(let box of boxes){
        turnO = true;
        box.disabled = false;
        box.innerText = "";
    }
}

const msgContainer = (winner) =>{
    winMsg.innerText = `Congratulations \n Winner is : ${winner}`;
    winMsgBox.classList.remove("hide");
    disableBoxes();
};
const drowMsg = () => {
    winMsg.innerText = `Oops match is \n Drow`;
    winMsgBox.classList.remove("hide");
    disableBoxes();
}

const winner = () => {
for(let pattern of winPatterns){
    // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
    let val0 = boxes[pattern[0]].innerText;
    let val1 = boxes[pattern[1]].innerText;
    let val2 = boxes[pattern[2]].innerText;


    if(val0 != "" && val1 != "" && val2 != ""){
        if(val0 === val1 && val1 === val2){
            msgContainer(val0);
        }
    }
}};

const resetGame = () => {
    turnO = true;
    enableBoxes(); 
    winMsgBox.classList.add("hide"); 
    count = 0;
}

const findDrow = () =>{
    boxes.forEach((box) => {
        box.addEventListener("click", () =>{
    count++;
    
    for(let pattern of winPatterns){
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
        let val0 = boxes[pattern[0]].innerText;
        let val1 = boxes[pattern[1]].innerText;
        let val2 = boxes[pattern[2]].innerText;
    
    
        if(val0 != "" && val1 != "" && val2 != ""){
            if(val0 === val1 && val1 === val2){
                msgContainer(val0);
            }
        }if(count === 9  && (val0 != val1 != val2)){
                drowMsg();
                count = 0;
            }
    }
        });
    });
}
findDrow();
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);