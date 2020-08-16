// <⚠️ DONT DELETE THIS ⚠️>
// <⚠️ /DONT DELETE THIS ⚠️>
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pList = document.querySelector(".pList"),
  fList = document.querySelector(".fList");

const PENDING_LS = "pendingLS",
  FINISHIED_LS = "finishedLS";

let pendings = [],
  finisheds = [];

function backToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pList.appendChild(li);
  const deleteBtns = li.querySelectorAll("button");
  deleteBtns.forEach(function (Btn) {
    Btn.remove();
  });

  const cmpBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  cmpBtn.innerText = "💚";
  delBtn.innerText = "💥";
  cmpBtn.addEventListener("click", changeToDo);
  delBtn.addEventListener("click", deleteToDo_P);
  li.appendChild(cmpBtn);
  li.appendChild(delBtn);
  const pObj = {
    text: li.querySelector("span").innerText,
    id: li.id
  };
  const cleanFinisheds = finisheds.filter(function (toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });

  finisheds = cleanFinisheds;
  pendings.push(pObj);
  localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
  localStorage.setItem(FINISHIED_LS, JSON.stringify(finisheds));
}

function changeToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  fList.appendChild(li);

  const cleanPendings = pendings.filter(function (toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  const deleteBtns = li.querySelectorAll("button");
  deleteBtns.forEach(function (Btn) {
    Btn.remove();
  });

  const bckBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  bckBtn.innerText = "⏪";
  delBtn.innerText = "💥";
  bckBtn.addEventListener("click", backToDo);
  delBtn.addEventListener("click", deleteToDo_F);
  li.appendChild(bckBtn);
  li.appendChild(delBtn);
  const fObj = {
    text: li.querySelector("span").innerText,
    id: li.id
  };
  pendings = cleanPendings;
  finisheds.push(fObj);
  localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
  localStorage.setItem(FINISHIED_LS, JSON.stringify(finisheds));
}

function deleteToDo_P(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pList.removeChild(li);
  const cleanP = pendings.filter(function (toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  console.log(pendings[0].id, parseInt(li.id, 10));
  pendings = cleanP;
  localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
}

function deleteToDo_F(event) {
  const btn = event.target;
  const li = btn.parentNode;
  fList.removeChild(li);
  const cleanF = finisheds.filter(function (toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  finisheds = cleanF;
  localStorage.setItem(FINISHIED_LS, JSON.stringify(finisheds));
}

// function saveToDos() {
//   localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
//   localStorage.setItem(FINISHIED_LS, JSON.stringify(finisheds));
// }

function paintPendings(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const cmpBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const newId = pendings.length + 1;
  cmpBtn.innerText = "💚";
  delBtn.innerText = "💥";
  cmpBtn.addEventListener("click", changeToDo);
  delBtn.addEventListener("click", deleteToDo_P);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(cmpBtn);
  li.appendChild(delBtn);
  li.id = newId;
  pList.appendChild(li);
  const pObj = {
    text: text,
    id: newId
  };
  pendings.push(pObj);
  localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
}

function paintFinisheds(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const bckBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const newId = finisheds.length + 1;
  bckBtn.innerText = "⏪";
  delBtn.innerText = "💥";
  bckBtn.addEventListener("click", backToDo);
  delBtn.addEventListener("click", deleteToDo_F);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(bckBtn);
  li.appendChild(delBtn);
  li.id = newId;
  fList.appendChild(li);
  const fObj = {
    text: text,
    id: newId
  };
  finisheds.push(fObj);
  localStorage.setItem(FINISHIED_LS, JSON.stringify(finisheds));
}

function loadToDos() {
  const loadedPendings = localStorage.getItem(PENDING_LS),
    loadedFinisheds = localStorage.getItem(FINISHIED_LS);
  if (loadedPendings !== null) {
    const parsedPendings = JSON.parse(loadedPendings);
    parsedPendings.forEach(function (toDo) {
      paintPendings(toDo.text, toDo.id);
    });
  }
  if (loadedFinisheds !== null) {
    const parsedFinisheds = JSON.parse(loadedFinisheds);
    parsedFinisheds.forEach(function (toDo) {
      paintFinisheds(toDo.text, toDo.id);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPendings(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
