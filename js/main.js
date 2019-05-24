const contBMI = document.querySelector('.bmi');
const contCalories = document.querySelector('.calories');
const bmi = document.querySelector('.check-BMI');
const calories = document.querySelector('.check-calories');
const btnBMI = document.querySelector('.btn-check');
const backToHome = document.querySelectorAll('.backtohome');
const btnCalories = document.querySelector('.calculate');

// Active mode 
function activeBMI() {
    bmi.classList.toggle('disabled');
    removeChoice();
}

function activeCalories() {
    calories.classList.toggle('disabled');
    removeChoice();
}

// function active disable on choice elements
function removeChoice() {
    contBMI.classList.toggle('disabled');
    contCalories.classList.toggle('disabled');
}

// Get data function
function getData(e) {
    e.preventDefault();
    const valueWeight = document.getElementById('weight').value;
    const valueGrowth = document.getElementById('growth').value;
    const heading = document.querySelector('.check-BMI .result')
    let resultGrowth = (valueGrowth / 100) * 2;
    let result = valueWeight / resultGrowth;

    const checkResult = () => {
        if (result < 16) {
            return 'wygłodzenie';
        } else if (result <= 16.99) {
            return 'wychudzenie';
        } else if (result <= 18.49) {
            return 'niedowaga';
        } else if (result <= 24.99) {
            return 'waga prawidłowa';
        } else if (result <= 29.99) {
            return 'nadwaga';
        } else if (result <= 34.99) {
            return 'I stopień otyłości';
        } else if (result <= 29.99) {
            return 'II stopień otyłości';
        } else if (result <= 40) {
            return 'otyłość skrajna';
        } else if (result >= 80) {
            return 'Coś poszło nie tak. Upewnij się, że wpisane przez Ciebie dane są poprawne';
        }
    }

    if (valueWeight === "" || valueGrowth === "") {
        return alert("Uzupełnij wszystkie pola!");
    }

    const yourBMI = checkResult();
    heading.textContent = yourBMI;
    if (yourBMI === 'wygłodzenie' || yourBMI === 'otyłość skrajna' || yourBMI === 'wychudzenie' || yourBMI === 'II stopień otyłości') {
        heading.style.color = 'red';
    } else if (yourBMI === 'I stopień otyłości' || yourBMI === 'niedowaga') {
        heading.style.color = '#ff5f5f';
    } else {
        heading.style.color = 'green';
    }

    document.getElementById('weight').value = "";
    document.getElementById('growth').value = "";
}

// select gender
const gender = [...document.querySelectorAll('.check-calories .gender .choice-gender')];
let selectedGender;

function selectGender() {
    selectedGender = this.dataset.option
    gender.forEach(element => element.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 2px green';
}

// CALORIES MODE 
function calculateCalories(e) {
    e.preventDefault();
    let resultCal;
    const calWeight = document.getElementById('weight-bmr').value;
    const calGrowth = document.getElementById('growth-bmr').value;
    const age = document.getElementById('age').value;
    const activity = document.getElementById('choice-activity').value;
    const choicePlan = document.getElementById('choice-plan').value;
    const headingCal = document.querySelector('.calories-result');

    const calculateWoman = () => {
        resultCal = (655 + (9.6 * calWeight) + (1.8 * calGrowth) - (4.7 * age)) * activity;
    }

    const calculateMan = () => {
        resultCal = (66 + (13.7 * calWeight) + (5 * calGrowth) - (6.76 * age)) * activity;
    }

    if (selectedGender === "woman") {
        calculateWoman();
    } else {
        calculateMan();
    }

    if (choicePlan === "increase") {
        resultCal += 200;
    } else if (choicePlan === "decrease") {
        resultCal -= 200;
    }

    if (choicePlan === "" || activity === "" || calWeight === "" || calGrowth === "" || selectedGender === "" || age === "") {
        alert("Uzupełnij wszystkie pola!")
        return;
    }

    headingCal.textContent = `${Math.floor(resultCal)} kalorii`
}

// back to home button 
backToHome.forEach((button) => {
    button.addEventListener('click', () => {
        bmi.classList.add('disabled');
        calories.classList.add('disabled');
        contBMI.classList.remove('disabled');
        contCalories.classList.remove('disabled');
    })
})

// event on choose mode 
contBMI.addEventListener('click', activeBMI);
contCalories.addEventListener('click', activeCalories);

// calculate bmi
btnBMI.addEventListener('click', getData);

// calculate calories
btnCalories.addEventListener('click', calculateCalories);
gender.forEach(element => element.addEventListener('click', selectGender));