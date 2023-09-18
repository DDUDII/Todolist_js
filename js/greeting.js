const greeting = document.getElementById("greeting");
const loginForm = document.getElementById("login-form");
const nameInput = document.querySelector(".name-input");
const loginBtn = document.querySelector("#login");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

loginForm.classList.remove(HIDDEN_CLASSNAME);
loginBtn.classList.remove(HIDDEN_CLASSNAME);

function saveName(username) {
  localStorage.setItem(USERNAME_KEY, username);
}

function clickLoginBtn(event) {
  event.preventDefault();
  if (nameInput.value === "") {
    alert("이름을 입력해주세요!");
  } else {
    const username = nameInput.value;
    paintGreeting(username);
    saveName(username);
  }
}

function paintGreeting(username) {
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `${username}, 오늘도 파이팅 🧸`;
  loginForm.classList.add(HIDDEN_CLASSNAME);

  const logoutBtn = document.createElement("button");
  logoutBtn.innerText = "logout";
  logoutBtn.classList.add("logout-button");
  greeting.appendChild(logoutBtn);
  logoutBtn.addEventListener("click", clickLogoutBtn);
}

function loadUserName() {
  const savedUserName = localStorage.getItem(USERNAME_KEY);
  if (savedUserName === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", clickLoginBtn);
  } else {
    paintGreeting(savedUserName);
  }
}

function clickLogoutBtn() {
  localStorage.removeItem(USERNAME_KEY);
  nameInput.value = "";
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  greeting.classList.add(HIDDEN_CLASSNAME);

  location.reload();
}
loadUserName();
