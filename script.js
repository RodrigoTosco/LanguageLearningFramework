let germanText = document.getElementById("wordGerman");
let spanishText = document.getElementById("wordSpanish");
let addToListButton= document.getElementById("addWordToList");
let listTable = document.getElementById("listTable");
let termTypeRadios = document.querySelectorAll('#termTypeRadios input[name="termType"]:checked');

myStorage = window.localStorage;

// counter variable for row id
let rowid = 0;
let wordList = [];

if(window.localStorage.getItem('wordList') != null){
    wordList = JSON.parse(window.localStorage.getItem('wordList'));
    rowid = JSON.parse(window.localStorage.getItem('rowid'));

    console.log(wordList.length + " largo de la lista");
    for(i = 0; i < wordList.length; i++){
        console.log("pasando por: " + i + " con valores:");
        //wordList[i].germanText,wordList[i].spanishText,wordList[i].id 
        addToTableList(wordList[i].germanText,wordList[i].spanishText,wordList[i].id);
    }
}

console.log(wordList);


addToListButton.addEventListener('click',addToList);

function addToList(){
    rowid += 1;
    termType = document.querySelectorAll('#termTypeRadios input[name="termType"]:checked')[0].value;    
    let term = {germanText: germanText.value, spanishText: spanishText.value, type:termType, id: rowid}
    wordList.push(term);
    console.log(term);
    addToTableList(term.germanText, term.spanishText, rowid);
}

function addToTableList(germanText, spanishText, id){
    row = listTable.insertRow();
    cell1 = row.insertCell();
    cell2 = row.insertCell();
    row.setAttribute('id', id);
    cell1.innerHTML = germanText;
    cell2.innerHTML = spanishText;
}

listTable.addEventListener('click', promptButton);
let myButton = document.createElement('button');
myButton.innerText = "Delete";
myButton.className = "deleteButton";
let selectedRow;


myButton.addEventListener('click', deleteRow);

function promptButton(e){
    let targetRow = e.target.parentNode
    if(selectedRow ===  targetRow){

    }
    else {
        selectedRow = targetRow;
        if(e.target != myButton && e.target.nodeName === "TD"){
            selectedRow = targetRow;
            targetRow.lastElementChild.append(myButton);
        }
    };
}

function deleteRow(e){
    let index = -1;
    for(let i = 0; i<wordList.length; i++){
        if(wordList[i].id == selectedRow.id){
            index = i;
            break;
        }
    }
    wordList.splice(index,1);

    selectedRow.parentNode.removeChild(selectedRow);

    //e.target.parentNode.parentNode.parentNode.removeChild(myButton.parentNode.parentNode);
}


let saveButton = document.getElementById('btnSaveTable');
saveButton.addEventListener('click', saveTable); 

let deleteButton = document.getElementById('btnDeleteTable');
deleteButton.addEventListener('click', deleteTable); 

function saveTable(){
    myStorage.setItem('wordList', JSON.stringify(wordList));
    myStorage.setItem('rowid', JSON.stringify(rowid));
    console.log("Saving");
}

function deleteTable(){
    myStorage.clear();
    rowid = 0;
    wordList = [];
    let tableHead = listTable.rows[0];
    console.log(tableHead);
    let newTable = document.createElement('table');
    newTable.append(tableHead);
    listTable.parentElement.replaceChild(newTable, listTable);
    listTable = newTable;
    listTable.addEventListener('click', promptButton);
    selectedRow = 0;

}