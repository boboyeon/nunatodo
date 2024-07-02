// 유저가 값을 입력한다
// +버튼을 클릭하면, 할 일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 같다
// Not Done, Done 탭을 누르면 언더바가 이동한다
// Done 탭은 끝난 아이템만, Not Done 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task_input");
let addButton = document.getElementById("add_button");
let taskList = []
addButton.addEventListener("click",addTask);

function addTask(){
    let taskContent = taskInput.value
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = '';
    for(let i=0;i<taskList.length;i++){
        resultHTML += `<div class="task">
                <div>집가기</div>
                <div>
                    <button>check</button>
                    <button>delete</button>
                </div>
            </div>`
    }
    document.getElementById("task_board").innerHTML = resultHTML;
}