const contBMI = document.querySelector('.bmi');
const contCalories = document.querySelector('.calories');
const bmi = document.querySelector('.check-BMI');
const calories = document.querySelector('.check-calories');
const btnBMI = document.querySelector('.btn-check');
const backToHome = document.querySelectorAll('.backtohome');

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
        } else if (result >= 40) {
            return 'otyłość skrajna';
        }
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
btnBMI.addEventListener('click', getData);