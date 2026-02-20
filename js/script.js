document.addEventListener("DOMContentLoaded", function () {

let currentSub = "";
let currentType = "";
let qIndex = 0;
let score = 0;
let selectedAns = "";
let completed = { MCQ: false, ID: false, PS: false };

const submitBtn = document.getElementById("submitBtn");
const choices = document.getElementById("choices");
const inputAns = document.getElementById("inputAns");

/* ================= QUIZ DATA ================= */

const quizData = {

"AL 101": {

MCQ: {
questions: [
"Algorithm that swaps adjacent elements?",
"Divide and conquer algorithm?",
"Best case Bubble Sort?",
"DFS uses what?",
"Binary search complexity?",
"Fastest on average?",
"O(1) means?",
"Not a sorting algorithm?",
"Advantage of Quick Sort?",
"Shortest path algorithm?"
],
choices: [
["A O(n)","B O(n²)","C O(log n)","D O(n log n)"],
["A Bubble","B Merge","C Selection","D Insertion"],
["A O(n)","B O(n²)","C O(1)","D O(log n)"],
["A Queue","B Stack","C Tree","D Graph"],
["A O(n)","B O(n²)","C O(log n)","D O(1)"],
["A Bubble","B Quick","C Selection","D Insertion"],
["A Constant","B Linear","C Quadratic","D Log"],
["A Quick","B Merge","C Binary","D Selection"],
["A Fast","B Stable","C In-place","D Slow"],
["A Prim","B Dijkstra","C Kruskal","D BFS"]
],
answers: ["B","B","A","B","C","B","A","C","C","B"]
},

ID: {
questions: [
"Upper bound notation?",
"Lower bound notation?",
"Average case of Merge Sort?",
"DFS stands for?",
"Binary Search worst case?",
"Big O notation for Linear Search?",
"Queue follows?",
"Stack follows?",
"Algorithm for shortest path?",
"Sorting algorithm stable?"
],
answers: [
"BIG O","OMEGA","O(N LOG N)",
"DEPTH FIRST SEARCH","O(LOG N)",
"O(N)","FIFO","LIFO",
"DIJKSTRA","MERGE SORT"
]
},

PS: {
questions: [
"Sort ascending: 3,1,2",
"Add: 5+7",
"Subtract: 15-9",
"Multiply: 4x6",
"Divide: 20/4",
"Binary search middle of 1-9?",
"Reverse: 4,3,2,1",
"O(1) means?",
"Stack push 2,4 pop?",
"Queue enqueue 7,9 dequeue?"
],
answers: [
"1,2,3","12","6","24","5",
"5","1,2,3,4","CONSTANT","4","7"
]
}

},

"CC104": {

MCQ: {
questions: [
"LIFO structure?",
"FIFO structure?",
"Binary tree has?",
"DFS uses?",
"Queue insertion?",
"Stack removal?",
"Fastest searching?",
"Sorting algorithm?",
"Divide and conquer?",
"Prim's algorithm?"
],
choices: [
["A Queue","B Stack","C Tree","D Graph"],
["A Queue","B Stack","C Tree","D Graph"],
["A 1","B 2","C 3","D 4"],
["A Queue","B Stack","C Tree","D Graph"],
["A Front","B Rear","C Middle","D None"],
["A Top","B Bottom","C Front","D Rear"],
["A Binary Search","B Linear Search","C Bubble","D Selection"],
["A Merge","B Quick","C Bubble","D Insertion"],
["A Merge","B Quick","C Bubble","D Insertion"],
["A Kruskal","B Prim","C Dijkstra","D BFS"]
],
answers: ["B","A","C","B","B","A","A","B","A","B"]
},

ID: {
questions: [
"FIFO meaning?",
"LIFO meaning?",
"Root node?",
"Height of tree?",
"Depth of tree?",
"Full binary tree?",
"Perfect binary tree?",
"Queue operation?",
"Stack operation?",
"Binary search complexity?"
],
answers: [
"FIRST IN FIRST OUT",
"LAST IN FIRST OUT",
"ROOT","HEIGHT","DEPTH",
"FULL","PERFECT",
"ENQUEUE/DEQUEUE",
"PUSH/POP",
"O(LOG N)"
]
},

PS: {
questions: [
"POP result of stack: 3,5,9",
"Add: 8+7",
"Subtract: 20-8",
"Multiply: 7x3",
"Divide: 18/6",
"Binary tree max children?",
"Stack push 5,8 pop?",
"Queue enqueue 4,6 dequeue?",
"Binary search middle of 1-7?",
"Height if 3 levels?"
],
answers: [
"9","15","12","21","3",
"2","8","4","4","3"
]
}

}

};

/* ================= FUNCTIONS ================= */

function hideAll(){
["welcome","subject","type","quiz","finish"].forEach(id=>{
document.getElementById(id).classList.add("hidden");
});
}

window.goSubject = function(){
hideAll();
score = 0;
completed = {MCQ:false,ID:false,PS:false};
document.getElementById("subject").classList.remove("hidden");
}

window.selectSubject = function(s){
currentSub = s;
hideAll();
document.getElementById("type").classList.remove("hidden");
}

window.startType = function(t){
currentType = t;
qIndex = 0;
selectedAns = "";
hideAll();
document.getElementById("quiz").classList.remove("hidden");
showQuestion();
}

function showQuestion(){

let set = quizData[currentSub][currentType];

document.getElementById("qnum").innerText =
`${currentType} Question ${qIndex+1}`;

document.getElementById("question").innerText =
set.questions[qIndex];

choices.innerHTML = "";
inputAns.classList.add("hidden");
selectedAns = "";
submitBtn.disabled = true;

if(currentType === "MCQ"){

set.choices[qIndex].forEach(opt=>{
let btn = document.createElement("button");
btn.innerText = opt;
btn.className = "btn-choice";

btn.onclick = ()=>{
document.querySelectorAll(".btn-choice")
.forEach(b=>b.classList.remove("selected"));

btn.classList.add("selected");
selectedAns = opt.charAt(0);
submitBtn.disabled = false;
};

choices.appendChild(btn);
});

}else{

inputAns.classList.remove("hidden");
inputAns.value = "";

inputAns.oninput = ()=>{
submitBtn.disabled = inputAns.value.trim() === "";
};

}

}

window.submitAnswer = function(){

let set = quizData[currentSub][currentType];

if(currentType === "MCQ" &&
selectedAns === set.answers[qIndex]) score++;

if(currentType !== "MCQ" &&
inputAns.value.toUpperCase().trim() ===
set.answers[qIndex]) score++;

qIndex++;

if(qIndex < set.questions.length){
showQuestion();
}else{
completed[currentType] = true;
hideAll();
document.getElementById("type").classList.remove("hidden");

if(completed.MCQ && completed.ID && completed.PS){
finish();
}
}

}

function finish(){
hideAll();
document.getElementById("finish").classList.remove("hidden");

document.getElementById("finishMsg").innerText =
`Subject: ${currentSub}`;

document.getElementById("scoreText").innerText =
`Final Score: ${score}`;
}

});
