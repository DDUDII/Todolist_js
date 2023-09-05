const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.getElementById("todo-list");
const todoBtn = document.querySelector("#todo-add");
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

  const rewriteBtn = document.createElement("button");
  rewriteBtn.innerText = "수정";

  const deletBtn = document.createElement("button");
  deletBtn.innerText = "삭제";
  deletBtn.addEventListener("click", delBtnClick);

  li.appendChild(span); //자식으로 넣어주기(변수)
  li.appendChild(rewriteBtn);
  li.appendChild(deletBtn);
  todoList.appendChild(li);
}

//-------- 클릭시 발생하는 이벤트 함수 --------
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
    };

    todos.push(newTodoObj);
    paintTodo(newTodoObj); //paintTodo에 newTodo 보내줌
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

todoForm.addEventListener("submit", todoBtnClick);

const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos !== null) {
  const parseTodos = JSON.parse(savedTodos); //로컬스토리지 저장 값을 object로 만들어주기
  todos = parseTodos; //새로고침 시 빈배열로 시작하는 게 아니라 기존 객체 유지후 새로고침!!!
  parseTodos.forEach(paintTodo); //!!!중요!!! 저장된 객체들을 차례로 화면에 보여지도록
}
