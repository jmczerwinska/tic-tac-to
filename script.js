function TicTacToeGame () {
    this.gameContainer = document.querySelector('#game-container');
    this.xUser = 'x';
    this.oUser = 'o';
    this.currentUser = this.xUser;
    this.win = false;
    ;}

TicTacToeGame.prototype.init = function() {
    const xUser = document.querySelector('#x-user').value;
    const oUser = document.querySelector('#o-user').value;
    if(xUser !== oUser && !this.win){
        this.xUser = xUser;
        this.oUser = oUser;
        const table = this.createTable();
        this.gameContainer.innerHTML = '';
        this.gameContainer.appendChild(table);
        this.currentUser = this.xUser;
    } else if(this.win) {
        this.win = false;
        this.init();
    } else {
        this.modal = new Modal ('Wprowadź różne imiona');
    }

};

TicTacToeGame.prototype.results = [
    ['a1','b1','c1'],
    ['a2','b2','c2'],
    ['a3','b3','b3'],
    ['a1','a2','a3'],
    ['b1','b2','b3'],
    ['c1','c2','c3'],
    ['a1','b2','c3'],
    ['a3','b2','c1']
];

TicTacToeGame.prototype.createTable = function () {
    const table = document.createElement('table');
    ['1','2','3'].forEach(function(rowId){
        const row = this.createRow(rowId);
        table.appendChild(row);
    }.bind(this));
    return table;
};

TicTacToeGame.prototype.createRow = function (rowId) {
    const row = document.createElement('tr');
    ['a', 'b', 'c'].forEach(function(col){
        const cell = this.createCell(col + rowId);
        row.appendChild(cell);
    }.bind(this));
    return row;
};

TicTacToeGame.prototype.createCell = function (id) {
    const cell = document.createElement('td');
    cell.className = 'cell';
    cell.id = id;
    cell.dataset.value = '';
    cell.addEventListener('click', this.cellClickHandler.bind(this));
    return cell;
};

TicTacToeGame.prototype.cellClickHandler = function (event) {
    const cell = event.target;
    if(cell.innerHTML !== '' || this.win){
        return;
    }
    if (this.currentUser === this.xUser) {
        cell.innerHTML = '&times;';
        cell.dataset.value = 'x';
    } else {
        cell.innerHTML = '&cir;';
        cell.dataset.value = 'o';
    }
    this.win = this.checkResults();
    if (this.win) {
        this.modal = new Modal ('Wygrał ' + this.currentUser + '!', this.init.bind(this));
    } else {
        this.currentUser = this.currentUser === this.xUser ? this.oUser : this.xUser;
    }
};

TicTacToeGame.prototype.checkResults = function () {
    let win = false;
    for(let idx =0; idx < this.results.length; idx++) {
        const resRow = this.results[idx];
        const result = resRow.map(function(id){
            const cell = document.querySelector('#' + id);
            return cell.dataset.value;
        }).join('');
        if (result === 'xxx' || result === 'ooo') {
            win = true;
            break;
        }
    }
    return win;
};

function Modal (message, closeCallBack) {
    this.closeCallBack = closeCallBack;
    this.modalEl = document.createElement('div');
    this.modalEl.className = 'modal';
    this.modalEl.innerHTML = '<p>' + message + '</p>';
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Zmaknij';
    closeButton.addEventListener('click', this.close.bind(this));
    this.modalEl.appendChild(closeButton);
    document.documentElement.appendChild(this.modalEl);
};

Modal.prototype.close = function () {
    this.modalEl.remove();
    if(this.closeCallBack !== undefined) {
        this.closeCallBack();
    }
};

const game = new TicTacToeGame();
const button = document.querySelector('#start-game');


let xUser = document.querySelector('#x-user');
let oUser = document.querySelector('#o-user');

function checkNames(){
    button.disabled = !(xUser.value !== '' && oUser.value !== '');
};

xUser.addEventListener('input', checkNames);
oUser.addEventListener('input', checkNames);
button.addEventListener('click', function () {
    game.init();
});