/**
 * first tusk function
 * function to calculate numbers that was entered into input fields
 * numbers must end with 2, 3, 7
 * the result must be put out under the input fields into paragraph
 */
function countingTheSumOfNumbersWithEndings(numberFrom, numberTo) {
    let result = 0;
    for (let i = numberFrom; i < 1 + numberTo; i++) {
        if (i.toString().endsWith('2') || i.toString().endsWith('7') || i.toString().endsWith('3')) {
            result += i;
        }
    }
    return result;
}

function calculateNumbers() {
    const result = document.getElementById('result');
    const firstInputField = document.getElementById("first_N");
    const secondInputField = document.getElementById("second_N");
    let firstValue = parseInt(firstInputField.value);
    let secondValue = parseInt(secondInputField.value);
    if (secondValue < firstValue) {
        result.innerHTML = countingTheSumOfNumbersWithEndings(secondValue, firstValue).toString();
    } else {
        result.innerHTML = countingTheSumOfNumbersWithEndings(firstValue, secondValue).toString();
    }
}

function translateFromTimeFormatToSeconds() {
    let inputFormSeconds = document.getElementById('seconds');
    inputFormSeconds = inputFormSeconds.value;
    let hours, minutes, seconds;
    seconds = inputFormSeconds % 60;
    inputFormSeconds -= seconds;
    minutes = Math.floor(inputFormSeconds / 60);
    hours = Math.floor(minutes / (60));
    minutes = minutes - (hours * 60);
    document.getElementById('format_show').innerHTML = hours + ":" + minutes + ":" + seconds;
}

function translateFromSecondsToTimeFormat() {
    let format = document.getElementById('time');
    let date = new Date(format.valueAsDate);
    document.getElementById('seconds_show').innerHTML = 'seconds: ' + (date.getSeconds() + (date.getMinutes() * 60) + (date.getUTCHours() * 3600));
}

function calculateTimeSpan() {
    const firstDayHole = new Date(0);
    let year, month, day, hour, min, sec;
    let firstDay = document.getElementById('first_date');
    let secondDay = document.getElementById('second_date');
    let output = document.getElementById('result_of_calculation');
    firstDay = new Date(firstDay.value);
    secondDay = new Date(secondDay.value);
    if (isNaN(firstDay) || isNaN(secondDay)) {
        output.innerHTML = "Error. Invalid date";
        return;
    }
    let timestamp;
    if (firstDay.getFullYear() < secondDay.getFullYear()) {
        timestamp = secondDay.getTime() - firstDay.getTime();
    } else {
        timestamp = firstDay.getTime() - secondDay.getTime();
    }
    let timestampDay = (new Date(timestamp));
    year = timestampDay.getFullYear() - firstDayHole.getFullYear();
    month = timestampDay.getMonth() - firstDayHole.getMonth();
    day = timestampDay.getDate() - firstDayHole.getDate();
    hour = timestampDay.getHours() - firstDayHole.getHours();
    min = timestampDay.getMinutes() - firstDayHole.getMinutes();
    sec = timestampDay.getSeconds() - firstDayHole.getSeconds();
    if (hour < 0) {
        day--;
        hour += 24;
    }
    output.innerHTML = 'years: ' + year + ';month: ' + month + ';day: ' + day + ';hour: ' + hour
        + ';min: ' + min + ';sec: ' + sec;
}

function createAChessboard() {
    document.getElementById('chess_board').innerHTML = "";
    const widthAmount = document.getElementById('chess_width').value;
    const heightAmount = document.getElementById('chess_height').value;
    let widthAndHeightOfCubes = ((document.body.clientWidth-25) / widthAmount);
    let mainDiv = document.getElementById('chess_board');
    mainDiv.style.display = 'inline-block';
    mainDiv.style.height = widthAndHeightOfCubes * heightAmount + "px";
    mainDiv.style.width = widthAndHeightOfCubes * widthAmount+ "px";
    widthAndHeightOfCubes = (mainDiv.clientWidth / widthAmount);
    let firstCubeColor = false;
    for (let i = 0; i < heightAmount; i++) {
        if (firstCubeColor) {
            createMarkupOfChessboard(firstCubeColor, widthAndHeightOfCubes, widthAmount)
        } else {
            createMarkupOfChessboard(firstCubeColor, widthAndHeightOfCubes, widthAmount)
        }
        firstCubeColor = !firstCubeColor;
    }
}

function createMarkupOfChessboard(firstColor, widthAndHeightOfCubes, widthAmount) {
    if (firstColor) {
        let flag = false;
        for (let j = 0; j < widthAmount; j++) {
            if (flag) {
                createCellsAndAppToChessboard(widthAndHeightOfCubes, widthAndHeightOfCubes, 'black');
                flag = !flag;
            } else {
                createCellsAndAppToChessboard(widthAndHeightOfCubes, widthAndHeightOfCubes, 'white');
                flag = !flag;
            }
        }
    } else {
        let flag = false;
        for (let j = 0; j < widthAmount; j++) {
            if (flag) {
                createCellsAndAppToChessboard(widthAndHeightOfCubes, widthAndHeightOfCubes, 'white');
                flag = !flag;
            } else {
                createCellsAndAppToChessboard(widthAndHeightOfCubes, widthAndHeightOfCubes, 'black');
                flag = !flag;
            }
        }
    }
}

function createCellsAndAppToChessboard(width, height, color) {
    let mainDiv = document.getElementById('chess_board');
    let div = document.createElement('div');
    div.style.width = width + 'px';
    div.style.height = height + 'px';
    div.style.display = 'inline-block';
    div.style.backgroundColor = color;
    mainDiv.appendChild(div);
}

function findThePartInTheString() {
    let string = document.getElementById('sting_to_find_in').value;
    const regular = new RegExp(document.getElementById('find_in_string').value, 'ig');
    const resultOfSearching = document.getElementById('found_string');
    string = string.replace(new RegExp(regular, 'gi'), "<mark>" + "\$&" + "</mark>");
    resultOfSearching.innerHTML = string;
}

function findLinksAndIPs() {
    const inputData = document.getElementById('link_finder').value;
    const output = document.getElementById('links');
    output.innerHTML = '';
    let arrayOfLinksAndIPs = (inputData.match(new RegExp('((http|ftp|https):\/\/)?([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?|([0-9]{1,3}[.]){3}[0-9]{1,3}', 'ig')));
    for (let i = 0; i < arrayOfLinksAndIPs.length; i++) {
        arrayOfLinksAndIPs[i] = arrayOfLinksAndIPs[i].replace(new RegExp('(http|ftp|https):\/\/'),'');
    }
    arrayOfLinksAndIPs = arrayOfLinksAndIPs.sort();
    for (let i = 0; i < arrayOfLinksAndIPs.length; i++) {
        let outputLi = document.createElement('a');
        outputLi.appendChild(document.createTextNode(arrayOfLinksAndIPs[i]));
        outputLi.href ='https://'+ arrayOfLinksAndIPs[i];
        let li = document.createElement('li');
        console.log(outputLi);
        li.appendChild(outputLi);
        output.appendChild(li);
    }
}