const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let rows = parseInt(urlParams.get('rows'));
let cols = parseInt(urlParams.get('cols'));
let mine_count = parseInt(urlParams.get('mines'));
let shape = urlParams.get('shape')
if (rows == null || cols == null || mine_count == null) {
    window.location.href = "index.html";
}
//let mine_density = 0.246;
//let mine_count = Math.ceil(rows * cols * mine_density);
var grid = [];
var gridmade = false;
var playing = true;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
if (shape == null || shape == 'rect') {
    for (var r = 0; r < rows; r++) {
        grid.push([]);
        for (var c = 0; c < cols; c++) {
            grid[grid.length - 1].push("u");
        }
    }
} else if (shape == 'donut') {
    for (var r = 0; r < rows; r++) {
        grid.push([]);
        for (var c = 0; c < cols; c++) {
            ra = r - rows / 2 + 0.5;
            ca = c - cols / 2 + 0.5;

            if ((ca * ca) / (cols / 4 * cols) + (ra * ra) / (rows / 4 * rows) <= 1 && (ca * ca) / (cols / 4 * cols) + (ra * ra) / (rows / 4 * rows) >= 0.25) {

                grid[grid.length - 1].push("u");
            } else {

                grid[grid.length - 1].push("o");
            }
        }
    }
}

window.addEventListener('load', function() {
    document.getElementById('flags').innerText = mine_count;
    //for (var i = 0; i < rows; i++) {
    //    var div = document.createElement("div");
    //    for (var j = 0; j < cols; j++) {
    //        var button = document.createElement("button");
    //        button.classList.add("but");
    //        button.id = "but_" + i + 'm' + j;
    //        button.setAttribute("onClick", "javascript: clickHandler(" + i + ", " + j + ");");
    //        button.style.padding = "0";
    //        //button.style.border = "px";
    //        div.appendChild(button);
    //    }
    //    document.body.appendChild(div);
    //}
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            if (grid[r][c] == 'u') {
                var button = document.createElement("button");
                button.classList.add("but");
                button.id = "but_" + r + 'm' + c;
                button.setAttribute("onClick", "javascript: clickHandler(" + r + ", " + c + ");");
                button.style.padding = "0";
                button.style.left = c * 35 + "px";
                button.style.top = r * 35 + 80 + "px";
                document.body.appendChild(button);
            }
        }
    }
})

function reveal(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
        return;
    }
    if (grid[r][c] == 'ub') {
        playing = false;
        for (var ro = 0; ro < rows; ro++) {
            for (var co = 0; co < cols; co++) {
                if (grid[ro][co] == 'ub') {
                    grid[ro][co] = 'b'
                    document.getElementById("but_" + ro + "m" + co).textContent = '💣';
                    document.getElementById("but_" + ro + "m" + co).classList.remove("but");
                    document.getElementById("but_" + ro + "m" + co).classList.add("mine");
                } else if (grid[ro][co] == 'bf') {
                    document.getElementById("but_" + ro + "m" + co).classList.remove("but");
                    document.getElementById("but_" + ro + "m" + co).classList.add("correctflag");
                } else if (grid[ro][co] == 'f') {
                    document.getElementById("but_" + ro + "m" + co).classList.remove("but");
                    document.getElementById("but_" + ro + "m" + co).classList.add("incorrectflag");
                }
            }
        }
    }
    let cnt = 0;
    for (var ro = -1; ro < 2; ro++) {
        for (var co = -1; co < 2; co++) {
            if (ro != 0 || co != 0) {
                if (r + ro >= 0 && r + ro < rows && c + co >= 0 && c + co < cols) {
                    if (grid[r + ro][c + co] == 'ub' || grid[r + ro][c + co] == 'bf' || grid[r + ro][c + co] == 'b') {
                        cnt++;
                    }
                }
            }
        }
    }
    if (grid[r][c] == 'u') {
        if (cnt == 0) {
            cnt = "";
        }
        let color = "#ff0000";
        if (cnt == 1) {
            color = "#6666ff";
        } else if (cnt == 2) {
            color = "#33aa33";
        } else if (cnt == 3) {
            color = "#ff5555";
        } else if (cnt == 4) {
            color = "#aa33aa";
        } else if (cnt == 5) {
            color = "#ee55ee";
        } else if (cnt == 6) {
            color = "#aa3333";
        } else if (cnt == 7) {
            color = "#22aaaa";
        } else if (cnt == 8) {
            color = "#ffff00";
        }
        document.getElementById("but_" + r + "m" + c).style.color = color;
        document.getElementById("but_" + r + "m" + c).textContent = '' + cnt;
        document.getElementById("but_" + r + "m" + c).classList.add("revealed");
        grid[r][c] = 'o';
        if (cnt == 0) {
            for (var ro = -1; ro < 2; ro++) {
                for (var co = -1; co < 2; co++) {
                    reveal(r + ro, c + co);
                }
            }
        }
    }
}

function check_win() {
    var fail = false;
    for (var ro = 0; ro < rows; ro++) {
        for (var co = 0; co < cols; co++) {
            if (!(grid[ro][co] == 'o' || grid[ro][co] == 'ub' || grid[ro][co] == 'bf')) {
                fail = true;
            }
        }
    }
    if (!fail) {
        playing = false;
        alert("you win");
    }
}

function clickHandler(r, c) {
    if (!playing) {
        return;
    }
    if (!gridmade) {
        var min_cnt = 0;
        while (min_cnt < mine_count) {
            var fail = 0;
            let rg = getRandomInt(rows);
            let cg = getRandomInt(cols);
            while (grid[rg][cg] != 'u' || (Math.abs(r - rg) + Math.abs(c - cg)) <= 2) {
                rg = getRandomInt(rows);
                cg = getRandomInt(cols);
                fail++;
                if (fail > 100) {
                    grid = [];
                    for (var r = 0; r < rows; r++) {
                        grid.push([]);
                        for (var c = 0; c < cols; c++) {
                            grid[grid.length - 1].push("u");
                        }
                    }
                    min_cnt = 0;
                }
            }
            grid[rg][cg] = 'ub';
            min_cnt++;
        }
        gridmade = true;
    }
    let e = window.event;
    if (e.shiftKey) {
        if (grid[r][c] == "u") {
            grid[r][c] = "f";
            document.getElementById('flags').innerText -= 1;
        } else if (grid[r][c] == "f") {
            grid[r][c] = "u";
            document.getElementById('flags').innerText = parseInt(document.getElementById('flags').innerText) + 1;
        } else if (grid[r][c] == "bf") {
            grid[r][c] = "ub";
            document.getElementById('flags').innerText = parseInt(document.getElementById('flags').innerText) + 1;
        } else if (grid[r][c] == "ub") {
            grid[r][c] = "bf";
            document.getElementById('flags').innerText -= 1;
        }
    } else {
        reveal(r, c);
    }
    if (grid[r][c] == "u") {
        document.getElementById("but_" + r + "m" + c).textContent = '';
    } else if (grid[r][c] == "f") {
        document.getElementById("but_" + r + "m" + c).textContent = '🚩';
    } else if (grid[r][c] == "bf") {
        document.getElementById("but_" + r + "m" + c).textContent = '🚩';
    } else if (grid[r][c] == "ub") {
        document.getElementById("but_" + r + "m" + c).textContent = '';
    }
    check_win();
}