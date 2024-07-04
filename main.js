// 유저가 값을 입력한다
// +버튼을 클릭하면, 할 일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 false를 true로 변경
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

// Not Done, Done 탭을 누르면 언더바가 이동한다
// Done 탭은 끝난 아이템만, Not Done 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task_input");
let addButton = document.getElementById("add_button");
let tabs = document.querySelectorAll(".task_tabs div"); // 여러개의 div를 불러올때, 조건에 해당하는 모든 것을 불러옴
let taskList = [];
let mode = 'all'; // 지역변수였던 mode를 전역변수로 선언
let filterList = [];
let underLine = document.getElementById("under_line");

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        addTask(); // "Enter" 키를 눌렀을 때 처리할 함수 호출
    }
});
taskInput.addEventListener("focus", function (){
    taskInput.value = "";
}); // 입력창에 포커스하면 기존 값은 지워지게


for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(tabs);



function addTask() {
  let taskValue = taskInput.value;
  if (taskValue === "") {
        alert ("할 일을 입력해주세요!");
        return;
  }
  let task = {
    // 객체, 필요한 정보를 묶어주는 역할
    id: randomIDGenerate(),
    taskContent: taskValue,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  taskInput.value = '';
  //render();
  showFilterList(); // 탭에도 task 추가 ui가 업데이트 되도록
}

function showFilterList() {
  filterList = []; // filterList를 초기화
  // 현재 모드에 따라 filterList 업데이트
  if (mode === "all") {
    filterList = taskList.slice(); // taskList 전체를 복사하여 filterList에 할당
} else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
        if (!taskList[i].isComplete) {
            filterList.push(taskList[i]); // isComplete가 false인 항목만 filterList에 추가
        }
    }
} else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete) {
            filterList.push(taskList[i]); // isComplete가 true인 항목만 filterList에 추가
        }
    }
}

render(); // UI 업데이트
}


function render() {
    // 1. 내가 선택한 탭에 따라서
    let list = []; // 선택한 탭에 따른 값이 들어간다 
    if(mode === "all"){
    // all - taskList
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
    // ongoing, done - filterList
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다
  let resultHTML = ""; // HTML을 다시 그려주는 기능,taskList 기준으로
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task task_done">
                <span>${list[i].taskContent}</span> 
                <div>
                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>`;
    } else {
      resultHTML += `<div class="task">
            <span>${list[i].taskContent}</span> 
            <div>
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
    }
  }
  // ${taskList[i].taskContent}은 taskList의 내용 중 .taskContent 출력 지정
  // <button onclick="toggleComplete()">은 해당 버튼에 addEventListener("click",toggleComplete)
  // 한것과 같은 효과, 직접적인 클릭 이벤트 주기

  document.getElementById("task_board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  // toggleComplete가 id를 알게 id를 매개변수로 받음
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      // ! = 아니다, 해당 값의 반대값을 가져옴
      taskList[i].isComplete = !taskList[i].isComplete; // true와 false를 왔다갔다
      break;
    }
  }
  filter(); // UI 업데이트, 다시 render 함수를 실행
  console.log(taskList);
}
// deleteTas가 각 id를 알게 id를 매개변수로 받음
function deleteTask(id) {
  if (confirm('이 할 일을 삭제할까요?')){
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id == id) {
        taskList.splice(i, 1); // 해당 인덱스를 잘라냄,(i번째 있는 아이템, 1개)
       // break;
      }
    }
    console.log(taskList);
    filter(); // UI 업데이트, 다시 render 함수를 실행
  }
}

function filter(event){ // event를 매개변수로 받음, 누구를 클릭했는지에 대한 정보
    //console.log("filter",event.target.id); // 각 탭의 아이디를 잘 불러오는지 확인
    if (event) {
        mode = event.target.id; // 각 탭의 아이디를 변수로 지정해서 사용
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top =
            event.target.offsetTop + (event.target.offsetHeight) - 3 + "px";
    } 
    filterList = []; // task.isComplete=false or true인 아이템만 모아놓은 변수
    if(mode === "all"){
        // 전체리스트를 보여준다
        render();
    }else if(mode === "ongoing"){
        // 진행중인 아이템을 보여준다.
        // task.isComplete=false 인 아이템을 보여준다
        for(let i=0; i<taskList.length; i++){ // taskList를 돌면서
            if(taskList[i].isComplete === false){ // 값이 false와 같은 인덱스를 찾아
                filterList.push(taskList[i]) // filterList에 추가해준다
            }
        }
        render();
        console.log("진행중",filterList);
    }else if(mode === "done"){
        // 끝나는 아이템을 보여준다
        // task.isComplete=true 인 아이템을 보여준다
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){ // 값이 true와 같은 인덱스를 찾아
                filterList.push(taskList[i]) // filterList에 추가해준다
            }
        }
        render();
        console.log("끝남",filterList);
    }
}



function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
// 각 아이템(할일)마다 랜덤한 고유의 아이디를 부여해 구별
// 모든 정보에는 아이디가 필요
