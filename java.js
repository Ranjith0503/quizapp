var firstpage = document.getElementById("firstpage");
var instruction = document.getElementById("instruction");
var startbutton = document.getElementById("Startbutton");
var back = document.getElementById("Back");

startbutton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the values of the input fields
  var username = document.getElementById("username").value.trim();
  var email = document.getElementById("email").value.trim();

  // Validate inputs
  if (!username) {
    alert("Please enter your username.");
    return;
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Hide the first page and show the instruction page
  firstpage.style.display = "none";
  instruction.style.display = "flex";
});

back.addEventListener("click", function () {
  firstpage.style.display = "flex";
  instruction.style.display = "none";
});

var quizbutton=document.getElementById("quizbutton")
var questionpage=document.getElementById("question-container")

quizbutton.addEventListener("click",function(){
    instruction.style.display = "none";
    questionpage.style.display="flex"  
})

var backtoint = document.getElementById("backtoint")
backtoint.addEventListener("click",function(){
    instruction.style.display = "flex";
    questionpage.style.display="none"  
})

var questiondata = [
    {
        question: "1. What does HTML stand for?",
        option: [
            "a) Hyper Text Markup Language",
            "b) Home Tool Markup Language",
            "c) Hyperlinks and Text Markup Language",
            "d) Hyper Text Making Language"
        ],
        answer: "a) Hyper Text Markup Language"
    },
    {
        question: "2. Which HTML tag is used to define the largest heading?",
        option: ["a) head tag", "b) h6 tag", "c) heading tag", "d) h1 tag"],
        answer: "d) h1 tag"
    },
    {
        question: "3.Which CSS property is used to change the font size of an element?",
        option: [
            `a)font-size`,
            "b) text-size",
            `c) font-style`,
            `d)font`
        ],
        answer: `a)font-size`
    },
    {
        question: "4.Which CSS property is used to change the text color of an element?",
        option: [
            `a) text-color`,
            "b) color",
            "c) font-color",
            "d) textcolor"
        ],
        answer: "b)color"
    },
    {
        question: "5. What is the purpose of the <title> tag in HTML?",
        option: [
            "a) To specify the title of a paragraph",
            "b) To set the title of the webpage, displayed in the browser's title bar",
            "c) To define a heading on the page",
            "d) To include metadata about the webpage"
        ],
        answer: "b) To set the title of the webpage, displayed in the browser's title bar"
    }
];
let currentquestionIndex = 0;
let score = 0;

function displayquestion() {
const questionPart = document.getElementById("question");
const optionsbtn = document.querySelectorAll(".btn");
const currentQuestion = questiondata[currentquestionIndex];

questionPart.textContent = currentQuestion.question;

optionsbtn.forEach((button, index) => {
button.textContent = currentQuestion.option[index];
//button.onclick = () => checkAnswer(button.textContent);
button.onclick = function () {
            // Check if the selected option is correct
            if (button.textContent === currentQuestion.answer) {
                button.style.background = "black"; // Correct answer
                button.style.color = "white";
            } else {
                button.style.background = "black"; // Incorrect answer
                button.style.color = "white";
            }

            // Disable all buttons to prevent further clicks
            optionsbtn.forEach((btn) => (btn.disabled = true));

            // Automatically proceed to the next question after a delay
            setTimeout(() => {
                currentquestionIndex++;
                if (currentquestionIndex < questiondata.length) {
                    displayquestion();
                } else {
                    showResults();
                }
            }, 3000); // 1-second delay
        };
     button.style.background = ""; 
        button.style.color = ""; 
        button.disabled = false;
});

// Update the 'Next' and 'Back' buttons
const backBtn = document.getElementById("backtoint");
const nextBtn = document.getElementById("nextquestion");

backBtn.disabled = currentquestionIndex === 0; // Disable "Back" on the first question
nextBtn.textContent = currentquestionIndex === questiondata.length - 1 ? "Finish" : "Next Question";
}

function checkAnswer(selectedOption) {
const currentQuestion = questiondata[currentquestionIndex];
if (selectedOption === currentQuestion.answer) {
score++;
}

currentquestionIndex++;
if (currentquestionIndex < questiondata.length) {
displayquestion();
} else {
showResults();
}
}

document.getElementById("backtoint").onclick = () => {
if (currentquestionIndex > 0) {
currentquestionIndex--; // Go to the previous question
displayquestion();
}
};

document.getElementById("nextquestion").onclick = () => {
if (currentquestionIndex < questiondata.length - 1) {
currentquestionIndex++; // Go to the next question
displayquestion();
} else {
showResults(); // End quiz if on the last question
}
};

function showResults() {
clearInterval(timerInterval); // Stop the timer
const questionContainer = document.getElementById("question-container");

// Generate the list of correct answers dynamically
const answerList = questiondata.map((item, index) => {
return `<p>${index + 1}) ${item.answer}</p>`;
}).join(""); // Join("") to combine the array of strings 

questionContainer.innerHTML = `
<h1 class="font-bold text-2xl">Quiz Completed</h1>
<p class="text-lg">Your Score: ${score} / ${questiondata.length}</p>
<h2 class="font-bold text-xl mt-4">Correct Answers:</h2>
${answerList}`;
}

let timerInterval;
let timeRemaining = 300; // 5 minutes in seconds

function startTimer() {
    const timerDisplay = document.getElementById("timer");

    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;

            // Format time as MM:SS
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            timerDisplay.textContent = `Time left: ${minutes}:${seconds.toString().padStart(2, "0")}`;
        } else {
            clearInterval(timerInterval); // Stop the timer
            showResults(); // End the quiz automatically
        }
    }, 1000); // Update every second
}

function showResults() {
    clearInterval(timerInterval); // Stop the timer

    const questionContainer = document.getElementById("question-container");

    // Generate the list of correct answers dynamically
    const answerList = questiondata.map((item, index) => {
        return `<p>${index + 1}) ${item.answer}</p>`;
    }).join(""); // Join("") to combine the array of strings 

    questionContainer.innerHTML = `
        <h1 class="font-bold text-2xl">Quiz Completed</h1>
        <p class="text-lg">Your Score: ${score} / ${questiondata.length}</p>
        <h2 class="font-bold text-xl mt-4">Correct Answers:</h2>
        ${answerList}
<a href="index.html"><button class="bg-blue-600 py-1 px-2 rounded-md" id="nextquestion">Retake the test</button></a>
`;
        
}

// Start the quiz and timer when the page loads
window.onload = () => {
    displayquestion(); // Display the first question
    startTimer(); // Start the timer
};
