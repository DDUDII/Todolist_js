const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.getElementById("todo-list");
const todoBtn = document.querySelector("#todo-add");
const deleteAllBtn = document.querySelector("#delete-all-btn");
const checkItemDelBtn = document.querySelector("#check-item-delbtn");

const TODOS_KEY = "todos";

let todos = [];

//-------- todo 입력값을 저장해주는 함수 --------
function saveTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  //JSON.stringify --> 객체나 배열을 무조건 string으로 바꿔줌, 로컬스토리지에는 배열이 저장 안되기때문
}

// -------- 보여질 화면에 대한 함수 --------
function paintTodo(newTodo) {
  const li = document.createElement("li"); //js에서 li 태그 생성
  li.id = newTodo.id;

  const span = document.createElement("span"); ////js에서 span 태그 생성
  span.innerText = newTodo.text;

  const input = document.createElement("input");
  input.type = "text";
  input.value = newTodo.text;
  input.style.display = "none";

  const checkBox = document.createElement("div");
  checkBox.classList.add("checkbox");
  if (newTodo.check) {
    checkBox.classList.add("checked");
  }
  checkBox.addEventListener("click", checkBoxClick);

  const editBtn = document.createElement("button");
  editBtn.innerText = "수정";

  const deletBtn = document.createElement("button");
  deletBtn.innerText = "삭제";
  deletBtn.addEventListener("click", delBtnClick);

  li.appendChild(checkBox);
  li.appendChild(span); //자식으로 넣어주기(변수)
  li.appendChild(input);
  li.appendChild(editBtn);
  li.appendChild(deletBtn);
  todoList.appendChild(li);
}

function setCheckStyle(element, isChecked) {
  if (isChecked) {
    element.style.textDecorationLine = "line-through";
    element.style.color = "rgb(157, 157, 157)";
  } else {
    element.style.textDecorationLine = "none";
    element.style.color = "black";
  }
}

//-------- 추가버튼 클릭시 발생하는 이벤트 함수 --------
function todoBtnClick(event) {
  event.preventDefault(); //form에서 클릭(submit)시 자동으로 새로고침 방지
  if (todoInput.value === "") {
    alert("할일을 입력해 주세요!");
  } else {
    const newTodo = todoInput.value;
    todoInput.value = ""; //input 값 제출 후 공백으로 만들어주기

    const newTodoObj = {
      text: newTodo,
      id: Date.now(),
      check: 0,
    };

    todos.push(newTodoObj);
    paintTodo(newTodoObj); //paintTodo에 newTodo 보내줌
    saveTodo();
  }
}
//-------- 체크박스 클릭시 발생하는 이벤트 함수 -------
function checkBoxClick(event) {
  const checkBox = event.target;
  const li = checkBox.parentElement;
  const id = li.id;
  const span = li.querySelector("span");

  const todoItem = todos.find((item) => item.id === parseInt(id));

  if (todoItem) {
    todoItem.check = !todoItem.check;
    checkBox.classList.toggle("checked");

    if (todoItem.check) {
      setCheckStyle(span, todoItem.check);
      checkBox.innerText = "✔️";
    } else {
      setCheckStyle(span, todoItem.check);
      checkBox.innerText = "";
    }
    saveTodo();
  }
}

function checkedItemdDelClick() {
  const confirmation = confirm("선택 항목을 삭제하시겠습니까?");
  if (confirmation) {
    const checkedItems = document.querySelectorAll(".checkbox.checked");
    checkedItems.forEach((checkbox) => {
      const li = checkbox.parentElement;
      const id = li.id;
      todos = todos.filter((item) => item.id !== parseInt(id));
      li.remove();
    });
    saveTodo();
  }
}

//-------- 삭제 버튼 누를시에 대한 함수 --------
function delBtnClick(event) {
  const li = event.target.parentElement; //del버튼의 부모 노드 불러옴
  todos = todos.filter((item) => item.id !== parseInt(li.id)); //li.id는 문자형이어서 넘버로 바꿔주기
  li.remove(); //@@@ 다시 복습
  saveTodo(); //변경된 배열을 다시 저장하기 위해 호출해줌?!
}

function deleteAllTodos() {
  const confirmation = confirm("전체 항목을 삭제하시겠습니까?");

  if (confirmation) {
    todos = [];
    saveTodo();
    todoList.innerText = "";
  } else {
  }
}

todoForm.addEventListener("submit", todoBtnClick);

deleteAllBtn.addEventListener("click", deleteAllTodos);
checkItemDelBtn.addEventListener("click", checkedItemdDelClick);

const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos !== null) {
  const parseTodos = JSON.parse(savedTodos); //로컬스토리지 저장 값을 object로 만들어주기
  todos = parseTodos; //새로고침 시 빈배열로 시작하는 게 아니라 기존 객체 유지후 새로고침!!!
  parseTodos.forEach(paintTodo); //!!!중요!!! 저장된 객체들을 차례로 화면에 보여지도록

  // 체크된 항목 새로고침 후에도 계속 체크 유지하도록 화면paint 요소 불러오기
  parseTodos.forEach((todo) => {
    if (todo.check) {
      const li = document.getElementById(todo.id);
      const checkBox = li.querySelector(".checkbox");
      const span = li.querySelector("span");
      checkBox.classList.add("checked");
      setCheckStyle(span, true);
      checkBox.innerText = "✔️";
    }
  });
}
