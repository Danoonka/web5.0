let initial = document.querySelector('#initial');
let birthDate = document.querySelector('#birthDate');
let address = document.querySelector('#address');
let mail = document.querySelector('#mail');
let tag = document.querySelector('#tag');
const btn = document.getElementById('btn')
const infoContainer = document.querySelector('.info_container');
let numberOfRow = 6;
let numberOfColumns = 6;
let tableContainer = document.querySelector('.table_container')
let colorPicker = document.querySelector('.colorPicker')
let elArray = [initial, birthDate, address, mail, tag];
let regExArray = [
    /([А-Яа-я-.]+) ([А-Яа-я-.]+) ([А-Яа-я-.]+)/g,
    /(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[012]).((19|20)\d\d)/g,
    /(м|с|смт). ([А-Я]{1}[а-яё]{1,23})/gm,
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    /(@)([a-zA-Z0-9_.]{1,30}$)/gm
]

let tilesElem = [];


function checkIfValid(elArray, regExArray){
    let boolArray = [];
    for (let i = 0; i < elArray.length; i++){
        if (elArray[i].value.match(regExArray[i])){
            boolArray.push(1);
        }else{
            boolArray.push(0);
        }
    }

    if (boolArray.includes(0)){
        for (let i = 0; i < boolArray.length; i++){
            if (boolArray[i] === 0){
                checkColor(i);
            }
        }
        boolArray = [];
    }else{
        let h2 = document.createElement('h2');
        h2.innerHTML = 'Ведені дані';
        infoContainer.append(h2);
        for (let i = 0; i < elArray.length; i++){
            let par = document.createElement('p');
            par.innerHTML = document.getElementsByTagName('label')[i].textContent + elArray[i].value;
            elArray[i].classList.add('getNormal')
            infoContainer.append(par);
        }
        boolArray = [];
    }
}

function checkColor(index){
    elArray[index].classList.add('getRed');
}

btn.addEventListener('click', ()=>{
    checkIfValid(elArray,regExArray)
})


function createArray(){
    let gameRows = new Array(numberOfRow);
    for (let i = 0; i < numberOfRow; i++) {
        gameRows[i] = new Array(numberOfColumns);
        for (let j = 0; j < numberOfColumns; j++){
            gameRows[i][j] = '';
        }
    }return gameRows;
}
let gameRows = createArray();
let counter = 1;
gameRows.forEach((gameRow, index ) => {
    const rowElem = document.createElement('div');
    rowElem.setAttribute('id', 'row-' + index)
    rowElem.className = 'table_row';
    gameRow.forEach((square, squareIndex) => {
        if (counter <= 36){
            const squareElem = document.createElement('div');
            squareElem.setAttribute('id','row-'+ index+ '-square-' + squareIndex);
            squareElem.className = 'tile';
            squareElem.innerHTML = `${counter}`;
            rowElem.append(squareElem);
            counter++;
            tilesElem.push('row-'+ index+ '-square-' + squareIndex)

        }
    })

    tableContainer.append(rowElem);
})



let myTile = document.querySelector('#row-0-square-5')

myTile.addEventListener('mouseover', () => {
    myTile.setAttribute('style', `background-color:#${randomColor()}` )
})

function randomColor(){
    return Math.floor(Math.random()*16777215).toString(16);
}

colorPicker.addEventListener("input", function(){
    let theColor = colorPicker.value;
    myTile.addEventListener('click', () => {
        myTile.setAttribute('style', `background-color:${theColor}`)
    })
}, false);

myTile.addEventListener('dblclick', ()=> {
    let tile = document.querySelectorAll(".tile");
    console.log(tile)
    tile.forEach(el =>{
        el.setAttribute('style', `background-color:#caa6b8`)
    })
})



