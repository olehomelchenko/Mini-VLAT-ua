const questions = [
    {
        question: "Яким був ціновий діапазон бареля нафти у 2020 році?",
        optionA: "$16.55 - $57.52",
        optionB: "$19.52 - $59.00",
        optionC: "$23.43 - $60.72",
        optionD: "$21.82 - $87.52",
        correctOption: "optionA",
    },

    {
        question: "Який діапазон середньої швидкості інтернету в Азії?",
        optionA: "5.50Mbps - 30.60Mbps",
        optionB: "7.00Mbps - 29.40Mbps",
        optionC: "6.40Mbps - 27.38Mbps",
        optionD: "5.50Mbps - 28.60Mbps",
        correctOption: "optionD",
    },
    {
        question: "Яка ціна арахісу в Лас Веґасі?",
        optionA: "$9.0",
        optionB: "$6.1",
        optionC: "$10.3",
        optionD: "$4.3",
        correctOption: "optionB",
    },

    {
        question: "Який рейтинг схвалення республіканців серед людей, які мають освітній рівень післядипломної освіти?",
        optionA: "35%",
        optionB: "27%",
        optionC: "23%",
        optionD: "20%",
        correctOption: "optionB",
    },

    {
        question: "Яку приблизно частку ринку смартфонів займає Samsung?",
        optionA: "20%",
        optionB: "25%",
        optionC: "30%",
        optionD: "15%",
        correctOption: "optionB",
    },

    {
        question: "Скільки людей оцінили таксі рейтингом між 4.2 та 4.4?",
        optionA: "270",
        optionB: "190",
        optionC: "300",
        optionD: "290",
        correctOption: "optionB",
    },

    {
        question: "Існує негативна лінійна залежність між ростом і вагою 85 чоловіків.",
        optionA: "True",
        optionB: "False",
        optionC: "",
        optionD: "",
        correctOption: "optionB",
    },

    {
        question: "Якою була середня ціна фунту кавових бобів в вересні 2013?",
        optionA: "$5.15",
        optionB: "$6.2",
        optionC: "$4.8",
        optionD: "$4.3",
        correctOption: "optionA",
    },

    {
        question: "Яку кількість дівчаток назвали «Олівія» у 2010 році у Великобританії?",
        optionA: "2000",
        optionB: "2500",
        optionC: "1700",
        optionD: "2400",
        correctOption: "optionC",
    },

    {
        question: "Яка загальна протяжність системи метро в Пекіні?",
        optionA: "525 km",
        optionB: "495 km",
        optionC: "305 km",
        optionD: "475 km",
        correctOption: "optionA",
    },

    {
        question: "У 2015 році рівень безробіття у Вашингтоні (WA) був вищим, ніж у Вісконсині (WI).",
        optionA: "True",
        optionB: "False",
        optionC: "",
        optionD: "",
        correctOption: "optionA",
    },

    {
        question: "Для якого сайту кількість унікальних відвідувачів була найбільшою в 2010 році?",
        optionA: "Amazon",
        optionB: "Chase",
        optionC: "PayPal",
        optionD: "Citibank",
        correctOption: "optionD",
    }

]
var graph_box = document.getElementById('graph_box');
var question = document.getElementById("question");
var option1 = document.querySelector("#option1");
var option2 = document.querySelector("#option2");
var option3 = document.querySelector("#option3");
var option4 = document.querySelector("#option4");
var next = document.querySelector("#sub-button");
var answers = document.querySelectorAll('.answer');
var showScore = document.querySelector('#showScore');
var cont = document.querySelector(".continue");
var timeCount = document.querySelector(".timer");

var questionCount = 0;
var score = 0;
var counter;
var loadQuestion = () => {
    var questionList = questions[questionCount];
    question.innerText = questionList.question;
    option1.innerText = questionList.optionA;
    option2.innerText = questionList.optionB;
    option3.innerText = questionList.optionC;
    option4.innerText = questionList.optionD;
}
loadQuestion();


var checkAnswer = () => {
    var answer;
    answers.forEach((curAnsElem) => {
        if (curAnsElem.checked) {
            answer = curAnsElem.id;
        }
    })
    return answer;
}

next.addEventListener('click', () => {
    var checkedAnswer = checkAnswer();
    console.log(checkedAnswer);

    if (checkedAnswer === questions[questionCount].correctOption) {
        score++;
        console.log("Score:" + score);
        sessionStorage.setItem("scores", score)
    };

    questionCount++;
    deSelectAll();

    if (questionCount < questions.length) {

        if (questionCount === 1) {
            BarChart();
            loadQuestion();
        }
        else if (questionCount === 2) {
            StackedBar();
            loadQuestion();
        }
        else if (questionCount === 3) {
            stacked100();
            loadQuestion();

        }
        else if (questionCount === 4) {
            pieChart();
            loadQuestion();
        }
        else if (questionCount === 5) {
            histogram();
            loadQuestion();
        }
        else if (questionCount === 6) {
            scatterplot();
            loadQuestion();
            document.getElementById("optionC").disabled = true;
            document.getElementById("optionD").disabled = true;
        }
        else if (questionCount === 7) {
            areaChart();
            loadQuestion();
            document.getElementById("optionC").disabled = false;
            document.getElementById("optionD").disabled = false;
        }
        else if (questionCount === 8) {
            stackedArea();
            loadQuestion();
            document.getElementById("optionC").disabled = false;
            document.getElementById("optionD").disabled = false;
        }
        else if (questionCount === 9) {
            bubbleChart();
            loadQuestion();
            document.getElementById("optionC").disabled = false;
            document.getElementById("optionD").disabled = false;
        }
        else if (questionCount === 10) {
            choropleth();
            loadQuestion();
            document.getElementById("optionC").disabled = true;
            document.getElementById("optionD").disabled = true;
        }
        else if (questionCount === 11) {
            treemap();
            loadQuestion();
            document.getElementById("optionC").disabled = false;
            document.getElementById("optionD").disabled = false;
        }
        else {
            loadQuestion();
        }
        console.log(questionCount);
    }
    else {
        location.href = "score.html"
    }
})

var deSelectAll = () => {
    answers.forEach((curAnsElem) => curAnsElem.checked = false);
}
if (questionCount === 0) {
    linechart();
}