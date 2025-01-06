let currentTask = 0;
let tasks = generateTasks(10); // 3 задания изменить на 10
let startTime = new Date().getTime();
let timerInterval = setInterval(updateTimer, 1000);

function generateTasks(num) {
    let tasks = [];
    for (let i = 0; i < num; i++) {
        let num1 = Math.floor(Math.random() * 100) + 1; // 5 изменить на 50
        let num2 = Math.floor(Math.random() * 100) + 1; // 5 изменить на 50
        let operation = Math.random() < 0.5 ? '+' : '-';
        if (operation === '-' && num1 < num2) { 
            let temp = num1;
            num1 = num2;
            num2 = temp;
             if ((num1+num2) > 100) {
                    num1 = Math.floor(Math.random() * 50) + 10; // 5 изменить на 50
                    num2 = Math.floor(Math.random() * 50) + 10; // 5 изменить на 50
                };
        };    
        tasks.push({ num1, num2, operation });
    };

    return tasks;
};

function showNextTask() {
    let task = tasks[currentTask];
    document.getElementById('task').innerText = ` ${task.num1} ${task.operation} ${task.num2} = `;
    document.getElementById('task1').innerText = `Задание № ${currentTask + 1}:  `;
};

function checkAnswer(event) {
    if (event.key === 'Enter') {
        let userAnswer = parseInt(document.getElementById('answer').value);
        let task = tasks[currentTask];
        let correctAnswer = task.operation === '+' ? task.num1 + task.num2 : task.num1 - task.num2;
        if (userAnswer === correctAnswer) {
            currentTask++;
            document.getElementById('answer').value = '';
            if (currentTask < tasks.length) {
                showNextTask();
            } else {
                clearInterval(timerInterval);
                document.getElementById('task').innerText = 'Игра закончена! Твое время: ' + document.getElementById('timer').innerText;
                saveResult();
            }
        } else {
            alert('Ответ не верный, попробуйте еще раз!');
        }
    };
};
function updateTimer() {
    let currentTime = new Date().getTime();
    let timeDiff = currentTime - startTime;
    let minutes = Math.floor(timeDiff / 60000);
    let seconds = Math.floor((timeDiff % 60000) / 1000);
    checkColor(timeDiff / 1000);
    document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
function rebootTasks() {
    currentTask = 0;
    tasks = generateTasks(10); // 3 задания изменить на 10
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
    showNextTask();


};
function checkColor(time) {
    if (time > 120)
        document.getElementById('timer').style.color = 'red', document.getElementById('timer').style.fontSize = '30px';
    else
        document.getElementById('timer').style.color = 'black', document.getElementById('timer').style.fontSize = '20px';
};

function saveResult() {
    let result = document.getElementById('timer').innerText;
    let list = document.getElementById('results');
    let li = document.createElement('li');
    li.style.listStyleImage = 'url("./image/182509_cat_fight_catfight_icon.png")';
    li.innerText = result;
    list.appendChild(li);
    localStorage.setItem('results', list.innerHTML);

};

showNextTask();

