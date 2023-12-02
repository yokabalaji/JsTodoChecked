let todoItemsContainer=document.getElementById("todositemcontainer");
let addBtn=document.getElementById("addbtn");
let saveBtn=document.getElementById("savebtn");

function getToDoItemsFromLocalStorage(){
    let stringifyValue=localStorage.getItem("todoList");
    let parseTodoValue=JSON.parse(stringifyValue);
    if(parseTodoValue===null){
        return [];
    }else{
        return parseTodoValue;
    }

}


let todoList=getToDoItemsFromLocalStorage();
let todoCount=todoList.length;


saveBtn.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

 saveBtn.onclick=function(){
localStorage.setItem("todoList",JSON.stringify(todoList));
 }


 function onAddTodo(){
    let userInputElement=document.getElementById("todosinput");
    let userInputValue=userInputElement.value;
    if(userInputValue===""){
        alert("enter valid text");
        return;
    }else{
        todoCount=todoCount+1;
       let newTodo={
        text:userInputValue,
        uniqueNo:todoCount,
        isChecked:false
       };


       todoList.push(newTodo);
       createAndAppendTodo(newTodo);
       userInputValue="";
       
    }
 }

 addBtn.onclick=function(){
    onAddTodo();
 }


 function createAndAppendTodo(todo){
let todoId="todo"+todo.uniqueNo;
let labelId="label"+todo.uniqueNo;
let checkBoxId="checkbox"+todo.uniqueNo;


let todoInputElement=document.createElement("li");
todoInputElement.classList.add("todos-items-container","d-flex","flex-row");
todoInputElement.id=todoId;
todoItemsContainer.appendChild(todoInputElement);

let inputElement=document.createElement("input");
inputElement.type="checkbox";
inputElement.id=checkBoxId;
inputElement.checked = todo.isChecked;

inputElement.onclick=function(){
    onStatusChange(labelId,checkBoxId,todoId);
};
inputElement.classList.add("checkbox-input");
todoInputElement.appendChild(inputElement);


let labelContainer =document.createElement("div");
labelContainer.classList.add("label-container","d-flex","flex-row");
todoInputElement.appendChild(labelContainer);

let labelElement=document.createElement("label");
labelElement.setAttribute("for",checkBoxId);
labelElement.id=labelId;
labelElement.classList.add("checkbox-label");
labelElement.textContent=todo.text;
labelContainer.appendChild(labelElement);

if(todo.isChecked===true){
    labelElement.classList.add("checked");
}


let deleteIconContainer=document.createElement("div");
deleteIconContainer.classList.add("delete-icon-container");
labelContainer.appendChild(deleteIconContainer);

let deleteIcon=document.createElement("i");
deleteIcon.classList.add("far","fa-trash-alt","delete-icon");


deleteIcon.onclick=function(){
    onDeleteTodo(todoId);
};
deleteIconContainer.appendChild(deleteIcon);


 }


 function onStatusChange(labelId,checkBoxId,todoId){
    let checkboxElement=document.getElementById(checkBoxId);
    let labelElement=document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let todonewindex=todoList.findIndex((eachItem)=>{
        let newTodoId="todo"+ eachItem.uniqueNo;
        if(newTodoId===todoId){
            return true;
        }else{
            return false;
        }

    })
    if(todoList[todonewindex].isChecked===true){
        todoList[todonewindex].isChecked=false;
    }else{
        todoList[todonewindex].isChecked=true;
    }
 };
 for (let todo of todoList) {
    createAndAppendTodo(todo);
    
  };


  function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    
    let todoIndexValue = todoList.findIndex(function(eachItem){
        let todoUniqueId = "todo" + eachItem.uniqueNo;
        if (todoUniqueId === todoId){
            return true;
        }
        else{
            return false;
        }
    });
        todoList.splice(todoIndexValue,1);
  }