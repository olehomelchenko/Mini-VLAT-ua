const questions = [
    {
        question: "Якою була ціна нафти в лютому 2020 року?",
        optionA: "$50.54",
        optionB: "$47.02",
        optionC: "$42.34",
        optionD: "$43.48",
        correctOption: "optionA",
    },
    {
        question: "У якої країни найменша частка золотих медалей?",
        optionA: "Велика Британія",
        optionB: "США",
        optionC: "Японія",
        optionD: "Австралія",
        correctOption: "optionA",
    },
    {
        question: "Яка середня швидкість інтернету в Японії?",
        optionA: "42.30 Mbps",
        optionB: "40.51 Mbps",
        optionC: "35.25 Mbps",
        optionD: " 16.6 Mbps",
        correctOption: "optionB",
    },
    {
        question: "Яка ціна арахісу в Сеулі",
        optionA: "$5.2",
        optionB: "$6.1",
        optionC: "$7.5",
        optionD: "$4.5",
        correctOption: "optionB",
    },
    {
        question: "Яку приблизно частку ринку смартфонів займає Samsung?",
        optionA: "17.6%",
        optionB: "25.3%",
        optionC: "10.9%",
        optionD: "35.2%",
        correctOption: "optionA",
    },

    {
        question: "На яку відстань переважно пересувалися користувачі таксі",
        optionA: "60-70 км",
        optionB: "30-40 км",
        optionC: "20-30 км",
        optionD: "50-60 км",
        correctOption: "optionB",
    },

    {
        question: "Існує негативний зв'язок між зростом і масою 85 осіб.",
        optionA: "Правда",
        optionB: "Хиба",
        optionC: "",
        optionD: "",
        correctOption: "optionA",
    },

    {
        question: "Якою була середня ціна фунту кавових бобів у вересні 2019?",
        optionA: "$0.71",
        optionB: "$0.90",
        optionC: "$0.80",
        optionD: "$0.63",
        correctOption: "optionA",
    },

    {
        question: "Яким було співвідношення дівчаток, названих «Ісла», до дівчаток, названих «Амелія», у 2012 році у Великій Британії?",
        optionA: "1 до 1",
        optionB: "1 до 2",
        optionC: "1 до 3",
        optionD: "1 до 4",
        correctOption: "optionB",
    },

    {
        question: "У метрополітену якого міста найбільша кількість станцій?",
        optionA: "Пекін",
        optionB: "Шанхай",
        optionC: "Лондон",
        optionD: "Сеул",
        correctOption: "optionB",
    },

    {
        question: "Станом на 2021 рік, населення Харківської області переважало чисельністю населення Львівської області",
        optionA: "Правда",
        optionB: "Хиба",
        optionC: "",
        optionD: "",
        correctOption: "optionA",
    },

    {
        question: "eBay входить до категорії «Програмне забезпечення».",
        optionA: "Правда",
        optionB: "Хиба",
        optionC: "",
        optionD: "",
        correctOption: "optionB",
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