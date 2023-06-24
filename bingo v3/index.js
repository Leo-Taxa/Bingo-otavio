let jogadores = [];
let numeroDisplay = document.getElementById("numeroDisplay");
let jogadoresContainer = document.getElementById("jogadoresContainer");
let interval;

function generatejogador() {
    let jogadorNomeInput = document.getElementById("jogadorNomeInput");
    let jogadorName = jogadorNomeInput.value.trim();
    if (jogadorName === "") {
        alert("Por favor insira o nome do jogador");
        return;
    }

    let jogador = {
        name: jogadorName,
        numeros: []
    };

    let columnRanges = [
        { min: 1, max: 15 },
        { min: 16, max: 30 },
        { min: 31, max: 45 },
        { min: 46, max: 60 },
        { min: 61, max: 75 }
    ];

    for (let i = 0; i < 5; i++) {
        let columnNumbers = [];
        while (columnNumbers.length < 5) {
            let num = Math.floor(Math.random() * (columnRanges[i].max - columnRanges[i].min + 1)) + columnRanges[i].min;
            if (!columnNumbers.includes(num)) {
                columnNumbers.push(num);
            }
        }

        for (let j = i; j < 25; j += 5) {
            jogador.numeros[j] = columnNumbers[Math.floor(j / 5)];
        }
    }

    jogadores.push(jogador);
    updatejogadores();
    jogadorNomeInput.value = "";
}



function updatejogadores() {
    jogadoresContainer.innerHTML = "";
    for (let i = 0; i < jogadores.length; i++) {
        let jogador = jogadores[i];
        let table = document.createElement("table");
        for (let j = 0; j < 5; j++) {
            let row = document.createElement("tr");
            for (let k = 0; k < 5; k++) {
                let cell = document.createElement("td");
                let index = j * 5 + k;
                if (index === 12) {
                    cell.textContent = "X";
                    cell.className = "center-cell";
                } else {
                    cell.textContent = jogador.numeros[index];
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        let jogadorName = document.createElement("p");
        jogadorName.textContent = "Jogador: " + jogador.name;
        jogadoresContainer.appendChild(jogadorName);
        jogadoresContainer.appendChild(table);
    }
}

function playGame() {
    let numeros = [];
    for (let i = 1; i <= 75; i++) {
        numeros.push(i);
    }

    interval = setInterval(() => {
        if (numeros.length > 0) {
            let index = Math.floor(Math.random() * numeros.length);
            let numero = numeros.splice(index, 1)[0];
            console.log("Numero: " + numero);
            displayNumeros(numero);
            marknumero(numero);

            let ganhador = Vencedor();
            if (ganhador) {
                clearInterval(interval);
                alert(`Bingo! ${ganhador.name} é o vencedor!`);
            }
        } else {
            clearInterval(interval);
            alert("Game Over.");
        }
    }, 1000);
}

function displayNumeros(numero) {
    numeroDisplay.value = "numero: " + numero;
}

function marknumero(numero) {
    let tables = document.getElementsByTagName("table");
    for (let i = 0; i < tables.length; i++) {
        let cells = tables[i].getElementsByTagName("td");
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent == numero) {
                cells[j].style.backgroundColor = "lightgreen";
                break;
            }
        }
    }
}

function Vencedor() {
    for (let i = 0; i < jogadores.length; i++) {
        let jogador = jogadores[i];
        let table = document.getElementsByTagName("table")[i];
        let cells = table.getElementsByTagName("td");
        let allGreen = true;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent !== "X" && cells[j].style.backgroundColor !== "lightgreen") {
                allGreen = false;
                break;
            }
        }
        if (allGreen) {
            return jogador;
        }
    }
    return null;
}

function restartGame() {
    clearInterval(interval);
    numeroDisplay.value = "";
    let tables = document.getElementsByTagName("table");
    for (let i = 0; i < tables.length; i++) {
        let cells = tables[i].getElementsByTagName("td");
        for (let j = 0; j < cells.length; j++) {
            cells[j].style.backgroundColor = "";
        }
    }
}