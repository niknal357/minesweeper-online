const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let rows = parseInt(urlParams.get('rows'));
let cols = parseInt(urlParams.get('cols'));
let mine_count = parseInt(urlParams.get('mines'));
let shape = urlParams.get('shape');
let highlight_assist = urlParams.get('highlight_assist') == "true";
if (rows == null || cols == null || mine_count == null) {
    window.location.href = "index.html";
}

var color_1 = "#4444aa";
var color_2 = "#008300";
var color_3 = "#cc4444";
var color_4 = "#a429d9";
var color_5 = "#b5670e";
var color_6 = "#31ebc2";
var color_7 = "#a8136c";
var color_8 = "#000000";
var color_complete = "#dddddd";

//let mine_density = 0.246;
//let mine_count = Math.ceil(rows * cols * mine_density);
var grid = [];
var visu_grid = [];
var gridmade = false;
var playing = true;

for (var r = 0; r < rows; r++) {
    visu_grid.push([]);
    for (var c = 0; c < cols; c++) {
        visu_grid[visu_grid.length - 1].push("u");
    }
}

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
                visu_grid[r][c] = '-';
                grid[grid.length - 1].push("-");
            }
        }
    }
} else if (shape == 'triangle') {
    for (var r = 0; r < rows; r++) {
        grid.push([]);
        for (var c = 0; c < cols; c++) {

        }
    }
}

window.addEventListener('load', function() {
    var extra = "";
    extra += "?rows=" + rows;
    extra += "&cols=" + cols;
    extra += "&mines=" + mine_count;
    extra += "&shape=" + shape;
    extra += "&highlight_assist=" + highlight_assist;
    document.getElementById('returnButton').setAttribute('onclick', "window.location.href='index.html" + extra + "'")
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
                if (shape == "donut") {
                    if ((r + c) % 2 == 0) {
                        button.classList.add("donute");
                    } else {
                        button.classList.add("donuto");
                    }
                } else {
                    if ((r + c) % 2 == 0) {
                        button.classList.add("bute");
                    } else {
                        button.classList.add("buto");
                    }
                }
                button.id = "but_" + r + 'm' + c;
                button.setAttribute("onClick", "javascript: clickHandler(" + r + ", " + c + ");");
                button.style.padding = "0";
                button.style.left = c * 35 + "px";
                button.style.top = r * 35 + 80 + "px";
                document.body.appendChild(button);
            }
        }
    }
    update_outlines();
})

function update_outlines() {
    for (var ra = 0; ra < rows; ra++) {
        for (var ca = 0; ca < cols; ca++) {
            if (grid[ra][ca] == "-") { continue; }
            if (ra == 0 || visu_grid[ra - 1][ca] == "-") {
                document.getElementById("but_" + ra + "m" + ca).style.borderTop = "2px solid #095210";
            } else if (visu_grid[ra - 1][ca] != visu_grid[ra][ca]) {
                document.getElementById("but_" + ra + "m" + ca).style.borderTop = "1px solid #095210";
            } else {
                document.getElementById("but_" + ra + "m" + ca).style.borderTop = "0px solid #095210";
            }
        }
    }
    for (var ra = 0; ra < rows; ra++) {
        for (var ca = 0; ca < cols; ca++) {
            if (grid[ra][ca] == "-") { continue; }
            if (ca == 0 || visu_grid[ra][ca - 1] == "-") {
                document.getElementById("but_" + ra + "m" + ca).style.borderLeft = "2px solid #095210";
            } else if (visu_grid[ra][ca - 1] != visu_grid[ra][ca]) {
                document.getElementById("but_" + ra + "m" + ca).style.borderLeft = "1px solid #095210";
            } else {
                document.getElementById("but_" + ra + "m" + ca).style.borderLeft = "0px solid #095210";
            }
        }
    }
    for (var ra = 0; ra < rows; ra++) {
        for (var ca = 0; ca < cols; ca++) {
            if (grid[ra][ca] == "-") { continue; }
            if (ra == rows - 1 || visu_grid[ra + 1][ca] == "-") {
                document.getElementById("but_" + ra + "m" + ca).style.borderBottom = "2px solid #095210";
            } else if (visu_grid[ra + 1][ca] != visu_grid[ra][ca]) {
                document.getElementById("but_" + ra + "m" + ca).style.borderBottom = "1px solid #095210";
            } else {
                document.getElementById("but_" + ra + "m" + ca).style.borderBottom = "0px solid #095210";
            }
        }
    }
    for (var ra = 0; ra < rows; ra++) {
        for (var ca = 0; ca < cols; ca++) {
            if (grid[ra][ca] == "-") { continue; }
            if (ca == cols - 1 || visu_grid[ra][ca + 1] == "-") {
                document.getElementById("but_" + ra + "m" + ca).style.borderRight = "2px solid #095210";
            } else if (visu_grid[ra][ca + 1] != visu_grid[ra][ca]) {
                document.getElementById("but_" + ra + "m" + ca).style.borderRight = "1px solid #095210";
            } else {
                document.getElementById("but_" + ra + "m" + ca).style.borderRight = "0px solid #095210";
            }
        }
    }
}

function reveal(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
        return;
    }
    if (grid[r][c] == 'f' || grid[r][c] == 'bf') {
        return;
    }
    if (grid[r][c] == '-') {
        return;
    }
    visu_grid[r][c] = 'o';
    if (grid[r][c] == 'ub') {
        playing = false;
        for (var ro = 0; ro < rows; ro++) {
            for (var co = 0; co < cols; co++) {
                if (grid[ro][co] == 'ub') {
                    grid[ro][co] = 'b'
                    document.getElementById("but_" + ro + "m" + co).textContent = '💣';
                    if (shape == "donut") {
                        document.getElementById("but_" + ro + "m" + co).classList.remove("donute");
                        document.getElementById("but_" + ro + "m" + co).classList.remove("donuto");
                    } else {
                        document.getElementById("but_" + ro + "m" + co).classList.remove("bute");
                        document.getElementById("but_" + ro + "m" + co).classList.remove("buto");
                    }
                    document.getElementById("but_" + ro + "m" + co).classList.add("mine");
                } else if (grid[ro][co] == 'bf') {
                    if (shape == "donut") {
                        document.getElementById("but_" + ro + "m" + co).classList.remove("donute");
                        document.getElementById("but_" + ro + "m" + co).classList.remove("donuto");
                    } else {
                        document.getElementById("but_" + ro + "m" + co).classList.remove("bute");
                        document.getElementById("but_" + ro + "m" + co).classList.remove("buto");
                    }
                    document.getElementById("but_" + ro + "m" + co).classList.add("correctflag");
                } else if (grid[ro][co] == 'f') {
                    if (shape == "donut") {
                        document.getElementById("but_" + ro + "m" + co).classList.remove("donute");
                        document.getElementById("but_" + ro + "m" + co).classList.remove("donuto");
                    } else {
                        document.getElementById("but_" + ro + "m" + co).classList.remove("bute");
                        document.getElementById("but_" + ro + "m" + co).classList.remove("buto");
                    }
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
            color = color_1
        } else if (cnt == 2) {
            color = color_2;
        } else if (cnt == 3) {
            color = color_3;
        } else if (cnt == 4) {
            color = color_4;
        } else if (cnt == 5) {
            color = color_5;
        } else if (cnt == 6) {
            color = color_6;
        } else if (cnt == 7) {
            color = color_7;
        } else if (cnt == 8) {
            color = color_8;
        }

        document.getElementById("but_" + r + "m" + c).style.color = color;
        document.getElementById("but_" + r + "m" + c).textContent = '' + cnt;
        if ((r + c) % 2 == 0) {
            document.getElementById("but_" + r + "m" + c).classList.add("revealede");
        } else {

            document.getElementById("but_" + r + "m" + c).classList.add("revealedo");
        }
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
        setTimeout(() => {
            alert("you win");
        }, 10)
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
    if (highlight_assist) {
        for (var ra = 0; ra < rows; ra++) {
            for (var ca = 0; ca < cols; ca++) {
                let cnt = 0;
                for (var ro = -1; ro < 2; ro++) {
                    for (var co = -1; co < 2; co++) {
                        if (ro != 0 || co != 0) {
                            if (ra + ro >= 0 && ra + ro < rows && ca + co >= 0 && ca + co < cols) {
                                if (grid[ra + ro][ca + co] == 'ub' || grid[ra + ro][ca + co] == 'bf' || grid[ra + ro][ca + co] == 'b') {
                                    cnt++;
                                }
                            }
                        }
                    }
                }
                let flag_cnt = 0;
                for (var ro = -1; ro < 2; ro++) {
                    for (var co = -1; co < 2; co++) {
                        if (ro != 0 || co != 0) {
                            if (ra + ro >= 0 && ra + ro < rows && ca + co >= 0 && ca + co < cols) {
                                if (grid[ra + ro][ca + co] == 'f' || grid[ra + ro][ca + co] == 'bf') {
                                    flag_cnt++;
                                }
                            }
                        }
                    }
                }
                if (grid[ra][ca] == 'o') {
                    let color = "#ff0000";
                    if (cnt == flag_cnt) {
                        color = color_complete;
                    } else {
                        if (cnt == 1) {
                            color = color_1
                        } else if (cnt == 2) {
                            color = color_2;
                        } else if (cnt == 3) {
                            color = color_3;
                        } else if (cnt == 4) {
                            color = color_4;
                        } else if (cnt == 5) {
                            color = color_5;
                        } else if (cnt == 6) {
                            color = color_6;
                        } else if (cnt == 7) {
                            color = color_7;
                        } else if (cnt == 8) {
                            color = color_8;
                        }
                    }
                    document.getElementById("but_" + ra + "m" + ca).style.color = color;
                }
            }
        }
    }
    update_outlines();
    check_win();
}