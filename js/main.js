// JavaScript for Block Stacker
const NUM_ROWS = 12;
const NUM_COLS = 6;
var process, interval, row, col, flag;

var table = document.getElementById("table");
var result = document.getElementById("result");

window.onload = function() {
    // populate table
    for (var i = 0; i < NUM_ROWS; i++) {
        var r = table.insertRow(i);
        for (var j = 0; j < NUM_COLS; j++) {
            var c = r.insertCell(j);
        }
    }
};

function newgame() {
    // reset value
    result.innerHTML = "";
    var element = document.createElement("span");
    element.id = "spaceholder";
    element.innerHTML = ".";
    result.appendChild(element);
    while (table.hasChildNodes())
        table.removeChild(table.firstChild);

    // populate table
    for (var i = 0; i < NUM_ROWS; i++) {
        var r = table.insertRow(i);
        for (var j = 0; j < NUM_COLS; j++) {
            var c = r.insertCell(j);
        }
    }

    clearInterval(process);
    interval = 150;
    row = NUM_ROWS - 1;
    col = 2;
    flag = true;
    moveTwoBlocks();
}

function moveOneBlock() {
    console.log(interval);
    process = setInterval(function() {
        table.rows[row].cells[col].style["background-color"] = "rgba(128, 0, 0, 0.9)";
        table.rows[row].cells[col].value = "";
        if (col == 0 || col == NUM_COLS - 1)
            flag = !flag;
        if (flag) col++;
        else      col--;
        table.rows[row].cells[col].style["background-color"] = "rgba(255, 255, 255, 0.7)";
        table.rows[row].cells[col].value = "marked";
    }, interval);
}

function moveTwoBlocks() {
    console.log(interval);
    process = setInterval(function() {
        table.rows[row].cells[col].style["background-color"] = "rgba(128, 0, 0, 0.9)";
        table.rows[row].cells[col].value = "";

        if (flag) {
            table.rows[row].cells[col+1].style["background-color"] = "rgba(128, 0, 0, 0.9)";
            table.rows[row].cells[col+1].value = "";
        }
        else {
            table.rows[row].cells[col-1].style["background-color"] = "rgba(128, 0, 0, 0.9)";
            table.rows[row].cells[col-1].value = "";
        }

        if (col == 1 || col == NUM_COLS - 2)
            flag = !flag;

        if (flag) col++;
        else      col--;

        table.rows[row].cells[col].style["background-color"] = "rgba(255, 255, 255, 0.7)";
        table.rows[row].cells[col].value = "marked";
        if (flag) {
            table.rows[row].cells[col+1].style["background-color"] = "rgba(255, 255, 255, 0.7)";
            table.rows[row].cells[col+1].value = "marked";
        }
        else {
            table.rows[row].cells[col-1].style["background-color"] = "rgba(255, 255, 255, 0.7)";
            table.rows[row].cells[col-1].value = "marked";
        }

    }, interval);
}

window.onkeypress = function(e) {
    console.log(e.keyCode);
    if (e.keyCode == 98) {
        clearInterval(process);
        if (row != NUM_ROWS - 1 && row > NUM_ROWS - 6 && table.rows[row+1].cells[col].value != "marked" && (table.rows[row].cells[col+1].value == "marked" ? table.rows[row+1].cells[col+1].value != "marked" : table.rows[row+1].cells[col-1].value != "marked")) 
            result.innerHTML = "You lose :(";
        else if (row != NUM_ROWS - 1 && row <= NUM_ROWS - 6 && table.rows[row+1].cells[col].value != "marked")
            result.innerHTML = "You lose :(";
        else {
            if (row == 0)
                result.innerHTML = "You win :)  ";
            else {
                row--;
                interval = interval * 0.9;
                if (row > NUM_ROWS - 6)
                    moveTwoBlocks();
                else
                    moveOneBlock();
            }
        }
    }
        
};
