function cambiarPagina() {
    window.location.href = '../take-photo/take-photo.html';
    //window.location.href = '../../player1/index.html';
}
function cambiarPagina2() {
    window.location.href = '../players-score/players-score.html';
}
function cambiarPagina3() {
    window.location.href = '../players-score/players-score.html';
}

function setup() {
    noCanvas();
    createElements();
}

function createElements() {
    let logo = createImg('../imgs/rappi-logo.png', 'Rappi Logo');
    logo.style('max-width', '100%');
    logo.style('height', 'auto');
    logo.style('margin-bottom', '20px');

    let menuDiv = createDiv('');
    menuDiv.class('menu-buttons');

    let startButton = createButton('Start');
    startButton.mousePressed(cambiarPagina);

    let playersScoreButton = createButton('Players Score');
    playersScoreButton.mousePressed(cambiarPagina2);

    let quitButton = createButton('Quit');
    quitButton.mousePressed(cambiarPagina);

    logo.parent('body');
    menuDiv.parent('body');
    startButton.parent(menuDiv);
    playersScoreButton.parent(menuDiv);
    quitButton.parent(menuDiv);
}
