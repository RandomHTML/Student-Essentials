const inputBox = document.querySelector(".input-box");

function addNumber(number) {
    if (["-", "Unsolvable Question"].includes(inputBox.value)) {
        inputBox.value = number;
    } else {
        inputBox.value += number;
    }
}

function clearInput() {
    inputBox.value = "-";
}

function copyAnswer() {
    solveInput();
    navigator.clipboard.writeText(inputBox.value);
}

function solveInput() {
    setLocalStorage(inputBox.value);

    try {
        let result = eval(inputBox.value);
        if (isNaN(result)) {
            inputBox.value = "Unsolvable Question";
        } else {
            inputBox.value = result;
        }
    } catch (error) {
        inputBox.value = "Unsolvable Question";
    }
}

function setLocalStorage(value) {
    const lsValue = localStorage.getItem("historyAvailability");
    let historyArray = [];

    if (lsValue === "true") {
        historyArray = localStorage.getItem("history").split(",");
    }

    historyArray.push(value);

    if (historyArray.length > 10) {
        historyArray = historyArray.slice(-10);
    }

    localStorage.setItem("historyAvailability", "true");
    localStorage.setItem("history", historyArray.join(","));

    setFrontEnd();
}

function setFrontEnd() {
    const finalStringArr = localStorage.getItem("history").split(",");
    const numberOfTries = finalStringArr.length;

    for (let i = 0; i < 10; i++) {
        const historyEl = document.querySelector(`.history-element-${i + 1}`);
        const index = numberOfTries - i - 1;

        if (!historyEl) continue;

        if (index < 0) {
            historyEl.innerText = "";
        } else {
            let answer = eval(finalStringArr[index]);
            let answerSpacedOutArr = `${finalStringArr[index]}=${answer}`.split("");
            let answerSpacedOut = "";

            for (let i = 0; i < answerSpacedOutArr.length; i++){
                answerSpacedOut += `${answerSpacedOutArr[i]} `
            }

            historyEl.innerText = `${index+1}) ${answerSpacedOut}`;
        }
    }
}

function clearHis() {
    localStorage.removeItem("historyAvailability");
    localStorage.removeItem("history");

    for (let i = 0; i < 10; i++) {
        const historyEl = document.querySelector(`.history-element-${i + 1}`);

        historyEl.innerText = "";
    }
}

setFrontEnd();