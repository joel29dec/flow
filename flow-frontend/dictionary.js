//element for Quadrant forms input section
const quadrantOne = document.querySelector('#Q1');
const quadrantTwo = document.querySelector('#Q2');
const quadrantThree = document.querySelector('#Q3');
const quadrantFour = document.querySelector('#Q4');
const body = document.querySelector('body')

//ul of Quadrant items
let Q1ToDo = document.querySelector('#Q1-todo');
let Q1Items;
let Q2ToDo = document.querySelector('#Q2-todo');
let Q2Items;
let Q3ToDo = document.querySelector('#Q3-todo');
let Q3Items = JSON.parse(localStorage.getItem('Q3Items')) || [];
let Q4ToDo = document.querySelector('#Q4-todo');
let Q4Items = JSON.parse(localStorage.getItem('Q4Items')) || [];


//edit button and main div
let Q1EditBtn = document.querySelector('#Q1-edit-btn');
const Q1EditMain = document.querySelector('#Q1-Main');

let Q2EditBtn = document.querySelector('#Q2-edit-btn');
const Q2EditMain = document.querySelector('#Q2-Main');

let Q3EditBtn = document.querySelector('#Q3-edit-btn');
const Q3EditMain = document.querySelector('#Q3-Main');

let Q4EditBtn = document.querySelector('#Q4-edit-btn');
const Q4EditMain = document.querySelector('#Q4-Main');


//event listeners for edit
Q1EditBtn.addEventListener('click', e => editFormQ1(e, Q1Items, Q1ToDo))

//event listeners for edit
Q2EditBtn.addEventListener('click', e => editFormQ2(e, Q2Items, Q2ToDo))

//event listeners for edit
Q3EditBtn.addEventListener('click', e => editFormQ3(e, Q3Items, Q3ToDo))

//event listeners for edit
Q4EditBtn.addEventListener('click', e => editFormQ4(e, Q4Items, Q4ToDo))


//event listeners for submit
quadrantOne.addEventListener('submit', e => addItem(e, Q1Items, Q1ToDo));
quadrantTwo.addEventListener('submit', e =>  addItem(e, Q2Items, Q2ToDo));
quadrantThree.addEventListener('submit', e => addItem(e, Q3Items, Q3ToDo));
quadrantFour.addEventListener('submit', e => addItem(e, Q4Items, Q4ToDo));

//event listeners for checkbox
Q1ToDo.addEventListener('click', e => toggleDone(e, Q1Items, Q1ToDo))
Q2ToDo.addEventListener('click', e => toggleDone(e, Q2Items, Q2ToDo));
Q3ToDo.addEventListener('click', e => toggleDone(e, Q3Items, Q3ToDo));
Q4ToDo.addEventListener('click', e => toggleDone(e, Q4Items, Q4ToDo));

//event listeners for delete
Q1ToDo.addEventListener('click', e => {deleteItem(e, Q1ToDo); Q1Items = Q1Items.filter( item =>  item.id != e.target.dataset.id );})
Q2ToDo.addEventListener('click', e => {deleteItem(e, Q2ToDo); Q2Items = Q2Items.filter( item =>  item.id != e.target.dataset.id );})
Q3ToDo.addEventListener('click', e => {deleteItem(e, Q3ToDo); Q3Items = Q3Items.filter( item =>  item.id != e.target.dataset.id );})
Q4ToDo.addEventListener('click', e => {deleteItem(e, Q4ToDo); Q4Items = Q4Items.filter( item =>  item.id != e.target.dataset.id );})