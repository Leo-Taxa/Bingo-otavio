// Variáveis globais
var intervalId; // ID do intervalo para gerar números automaticamente
var currentPlayer = null; // Jogador atual

// Função para gerar uma tabela de bingo com números aleatórios
function generateBingoTable() {
  var table = '<table>';
  var columns = ['B', 'I', 'N', 'G', 'O'];
  var numbers = generateNumbers();

  // Cabeçalho da tabela
  table += '<thead><tr>';
  for (var i = 0; i < 5; i++) {
    table += '<th>' + columns[i] + '</th>';
  }
  table += '</tr></thead>';

  // Corpo da tabela
  table += '<tbody>';
  for (var row = 0; row < 6; row++) {
    table += '<tr>';
    for (var col = 0; col < 5; col++) {
      var number;
      if (row === 2 && col === 2) {
        number = 'X';
      } else {
        number = numbers[row * 5 + col];
      }
      table += '<td>' + number + '</td>';
    }
    table += '</tr>';
  }
  table += '</tbody>';

  table += '</table>';

  return table;
}

// Função para gerar números aleatórios de 1 a 75 sem repetições
function generateNumbers() {
  var numbers = [];
  var columnRanges = [[1, 15], [16, 30], [31, 45], [46, 60], [61, 75]];

  for (var i = 0; i < columnRanges.length; i++) {
    var columnRange = columnRanges[i];

    for (var j = columnRange[0]; j <= columnRange[1]; j++) {
      numbers.push(j);
    }
  }

  numbers.sort(function () {
    return 0.5 - Math.random();
  });

  return numbers;
}

// Função para adicionar um jogador ao jogo
function addPlayer() {
  var playerName = prompt('Insira o nome do jogador:');
  if (playerName) {
    if (currentPlayer === null) {
      currentPlayer = playerName;
      startGame();
    }
    var cartela = generateBingoTable();
    var cartelasContainer = document.getElementById('body_cartelas');
    var newCartela = document.createElement('div');
    newCartela.className = 'cartela';
    newCartela.innerHTML = '<h4>' + playerName + '</h4>' + cartela;
    cartelasContainer.appendChild(newCartela);
  }
}

// Função para iniciar o jogo
function startGame() {
  var buttonGerarCartela = document.querySelector('#header_cartelas button');
  buttonGerarCartela.addEventListener('click', addPlayer);

  var buttonJogar = document.querySelector('#header_lancamentos button');
  buttonJogar.addEventListener('click', jogarNumero);

  intervalId = setInterval(jogarNumero, 1000);
}

// Função para sortear um número aleatório de 1 a 75
function sortearNumero() {
  return Math.floor(Math.random() * 75) + 1;
}

// Função para atualizar a tabela de lançamentos
function atualizarLancamentos(numero) {
    var bodyLancamentos = document.getElementById('body_lancamentos');
    var novoLancamento = document.createElement('div');
    novoLancamento.innerText = numero;
  
    bodyLancamentos.appendChild(novoLancamento);
  }
  
  // Função para verificar se um jogador ganhou o jogo
  function verificarVitoria() {
    var cartelas = document.querySelectorAll('.cartela');
  
    for (var i = 0; i < cartelas.length; i++) {
      var cells = cartelas[i].querySelectorAll('td');
      var win = true;
  
      // Verificar linhas
      for (var j = 0; j < 5; j++) {
        if (cells[j].innerText !== 'X') {
          win = false;
          break;
        }
      }
  
      if (win) {
        alert('Jogador ' + cartelas[i].querySelector('h4').innerText + ' venceu!');
        clearInterval(intervalId); // Parar a geração automática de números
        break;
      }
  
      win = true;
  
      // Verificar colunas
      for (var j = 0; j < 5; j++) {
        if (cells[j * 5 + 2].innerText !== 'X') {
          win = false;
          break;
        }
      }
  
      if (win) {
        alert('Jogador ' + cartelas[i].querySelector('h4').innerText + ' venceu!');
        clearInterval(intervalId); // Parar a geração automática de números
        break;
      }
  
      win = true;
  
      // Verificar diagonais
      if (
        cells[0].innerText === 'X' &&
        cells[6].innerText === 'X' &&
        cells[12].innerText === 'X' &&
        cells[18].innerText === 'X' &&
        cells[24].innerText === 'X'
      ) {
        alert('Jogador ' + cartelas[i].querySelector('h4').innerText + ' venceu!');
        clearInterval(intervalId); // Parar a geração automática de números
        break;
      }
  
      if (
        cells[4].innerText === 'X' &&
        cells[8].innerText === 'X' &&
        cells[12].innerText === 'X' &&
        cells[16].innerText === 'X' &&
        cells[20].innerText === 'X'
      ) {
        alert('Jogador ' + cartelas[i].querySelector('h4').innerText + ' venceu!');
        clearInterval(intervalId); // Parar a geração automática de números
        break;
      }
    }
  }
  
  // Função para jogar um número e atualizar a tabela
  function jogarNumero() {
    var numeroSorteado = sortearNumero();
    atualizarLancamentos(numeroSorteado);
    marcarNumero(numeroSorteado);
    verificarVitoria();
  }
  
  // Função para marcar um número na tabela
  function marcarNumero(numero) {
    var cartelas = document.querySelectorAll('.cartela');
  
    for (var i = 0; i < cartelas.length; i++) {
      var cells = cartelas[i].querySelectorAll('td');
  
      for (var j = 0; j < cells.length; j++) {
        if (cells[j].innerText == numero) {
          cells[j].classList.add('marked');
          break;
        }
      }
    }
  }

  // Iniciar o jogo
var buttonGerarCartela = document.querySelector('#header_cartelas button');
buttonGerarCartela.addEventListener('click', addPlayer);

var buttonJogar = document.querySelector('#header_lancamentos button');
buttonJogar.addEventListener('click', jogarNumero);

var intervalId; // Variável para armazenar o ID do intervalo

// Função para iniciar o jogo
function startGame() {
  buttonGerarCartela.disabled = false; // Habilitar o botão de gerar cartela
  buttonJogar.disabled = true; // Desabilitar o botão de jogar número
}

// Função para adicionar um jogador ao jogo
function addPlayer() {
  var playerName = prompt('Insira o nome do jogador:');
  if (playerName) {
    var cartela = generateBingoTable();
    var cartelasContainer = document.getElementById('body_cartelas');
    var newCartela = document.createElement('div');
    newCartela.className = 'cartela';
    newCartela.innerHTML = '<h4>' + playerName + '</h4>' + cartela;
    cartelasContainer.appendChild(newCartela);

    buttonGerarCartela.disabled = true; // Desabilitar o botão de gerar cartela
    buttonJogar.disabled = false; // Habilitar o botão de jogar número

    startAutomaticGeneration(); // Iniciar geração automática de números
  }
}

// Função para iniciar a geração automática de números
function startAutomaticGeneration() {
  intervalId = setInterval(jogarNumero, 1000); // Gera um número a cada 1 segundo (1000 milissegundos)
}

// Função para parar a geração automática de números
function stopAutomaticGeneration() {
  clearInterval(intervalId);
}

// Iniciar o jogo
startGame();

