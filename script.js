const addButton = document.getElementById("addBtn");
const inputBox = document.getElementById("inputBox");
const taskContainer=document.getElementById("taskContainer");

inputBox.focus();

const taskArr =[];

function handleTaskClick(){
    this.classList.toggle("completed");
    const taskId = this.id.toString();

    for (let i =0;i<taskArr.length;i++){
        const taskObj = taskArr[i];
        if(taskObj.id.toString() === taskId){
            taskObj.isCompleted = !taskObj.isCompleted;
        }
    }

    setTasks();
}

function handleRemove(){
    const taskId=this.id.toString();

    for(let i=0;i<taskArr.length;i++){
        if(taskArr[i].id.toString()===taskId){
            taskArr.splice(i,1);
        }
    }
    setTasks();
    this.remove();
}

// function consoleArr(){
//     console.log(taskArr);
// }
function setTasks(){
    localStorage.setItem("tasks",JSON.stringify(taskArr));
}

function getTasks(){
    let tasks=localStorage.getItem("tasks");
    if(!tasks){
        return;
    }
     
    tasks = JSON.parse(tasks);
    
    for(index in tasks){
        const taskObj=tasks[index];
        createTask(taskObj.value, taskObj.isCompleted, taskObj.id);
        taskArr.push(tasks[index]);
    }
}
getTasks();

function createTask(userInput,isCompleted, taskId){
    //creating a new Element with a value
    const newElement = document.createElement("div");
    newElement.innerText=userInput;
    newElement.setAttribute("id",taskId);
   
    if(isCompleted) newElement.setAttribute("class","task completed");
    else newElement.setAttribute("class","task");
    


    //adding an eventlistner
    newElement.addEventListener('click',handleTaskClick);
    newElement.addEventListener("dblclick",handleRemove);
    
    taskContainer.append(newElement);
    //document.getElementById("taskContainer");
}

function addTask(){
   //getting user input
    
   const userInput = inputBox.value;
    
    if(userInput.length===0) return alert("Please enter some tasks");
    
    const inputLength = userInput.length;
    //console.log(inputLength);
    let count =0;

    for(let i=0;i<inputLength;i++){
     //   console.log(userInput[i]);
        if(userInput[i]===" "){
            count +=1;
        }
    }

    if(inputLength===count){
        return alert("Please enter a valid task...");
        inputBox.value="";
    } 
    let taskId= Math.random()+id;//taskArr.length+1;
    
    let taskObj ={};
    taskObj.value=userInput;
    taskObj.isCompleted = false;
    taskObj.id = taskId;
    
    taskArr.push(taskObj);
        
    //taskArr.push(userInput);
    setTasks();
    
    
    createTask(userInput,false,taskId);
   
   //clearing the input box
   inputBox.value="";
   inputBox.focus();
}

//handling the input box enter event
function handleEnter(e){
    if(e.keyCode===13){
        addTask();
    }
}
addButton.addEventListener('click', addTask);
inputBox.addEventListener('keyup',handleEnter);

const year =new Date().getFullYear().toString();
const month=new Date().getMonth().toString();
const date =new Date().getDate().toString();
const hours =new Date().getHours().toString();
const minutes =new Date().getMinutes().toString();
const seconds =new Date().getSeconds().toString();
const milliseconds =new Date().getMilliseconds().toString();

const id = year+month+date+hours+minutes+seconds+milliseconds
console.log(id);
// const object ={
//     name:"some name",
// };

// localStorage.setItem("name","someName");
// localStorage.setItem("var1","this is the value");
// storage=sessionStorage.getItem("var1");
// console.log(storage);
// sessionStorage.removeItem("var1");
// console.log(new Date().toUTCString());