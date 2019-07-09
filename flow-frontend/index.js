//element for Quadrant forms input section
const quadrantOne = document.querySelector('#Q1');
const quadrantTwo = document.querySelector('#Q2');
const quadrantThree = document.querySelector('#Q3');
const quadrantFour = document.querySelector('#Q4');
const body = document.querySelector('body')

//ul of Quadrant items
const Q1ToDo = document.querySelector('#Q1-todo');
let Q1Items;
const Q2ToDo = document.querySelector('#Q2-todo');
let Q2Items;
const Q3ToDo = document.querySelector('#Q3-todo');
let Q3Items = JSON.parse(localStorage.getItem('Q3Items')) || [];
const Q4ToDo = document.querySelector('#Q4-todo');
let Q4Items = JSON.parse(localStorage.getItem('Q4Items')) || [];

//render li elements
function populateList(todo = [], todoList) {
  todoList.innerHTML = todo.map((item, i) => {
    return `
      <li>
        <input type="checkbox" data-id=${item.id} id="item${i}" ${item.done ? 'checked' : ''} />
        <label for="item${i}">${item.text}</label>
        <button type="button" class="btn btn-default btn-sm" data-id=${item.id}>
        <span class="glyphicon glyphicon-trash"></span> Trash 
      </button>
      </li>
    `;
  }).join('');
}

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
Q1ToDo.addEventListener('click', e => {deleteItem(e, Q1ToDo); Q1Items = Q1Items.filter( item =>  item.id != e.target.dataset.id ); console.log(Q1Items)})
Q2ToDo.addEventListener('click', e => {deleteItem(e, Q2ToDo); Q2Items = Q2Items.filter( item =>  item.id != e.target.dataset.id ); console.log(Q2Items)})
Q3ToDo.addEventListener('click', e => {deleteItem(e, Q3ToDo); Q3Items = Q3Items.filter( item =>  item.id != e.target.dataset.id ); console.log(Q3Items)})
Q4ToDo.addEventListener('click', e => {deleteItem(e, Q4ToDo); Q4Items = Q4Items.filter( item =>  item.id != e.target.dataset.id ); console.log(Q4Items)})

// //event listener for edit

// Q1ToDo.addEventListener('dblclick', e => editItem(e, Q1Items, Q1ToDo))


// function editItem(e, itemList, quadrant){
//   console.log(e.target)
// }













//event handler callbacks

function addItem(e, itemList, quadrant) {
  e.preventDefault();
  const text = (e.target.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false,
    category_id: parseInt(quadrant.dataset.postid)
  };
  itemList.push(item);
  populateList(itemList, quadrant);

  //send post request to backend
  postItem(item)
  localStorage.setItem(`${quadrant.dataset.id}`, JSON.stringify(itemList));
  e.target.reset();
}

function deleteItem(e, quadrant){
  if (!e.target.matches('button')) return;
  //id of the Item in database
  const id = e.target.dataset.id
  fetch(`http://localhost:3000/items/${id}`, {method: 'DELETE'})
  .then(resp => resp.json())
  .then(data => {console.log(data)})
  localStorage.removeItem(`${quadrant.dataset.id}`);
  
  e.target.parentNode.parentNode.removeChild(e.target.parentNode)
  
}

function toggleDone(e, itemList, quadrant) {
  e.preventDefault()
  if (!e.target.matches('label')) return;
  const el = e.target;
  const id = el.previousSibling.previousSibling.dataset.id;
  const item = itemList.find((item) => item.id == id);
  item.done = !item.done;

  localStorage.setItem(`${quadrant.dataset.id}`, JSON.stringify(itemList));
  populateList(itemList, quadrant);
}

//database callback functions

function postItem(item){
  
  let configObj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item)
  }
  
  fetch('http://localhost:3000/items', configObj)
  .then(resp => resp.json())
  .then(data => console.log(data))
}


function fetchListItems(){
fetch('http://localhost:3000/items').then(resp => resp.json()).then(data => assignList(data))
}

//populates list from database
function assignList(data){

  Q1Items = JSON.parse(localStorage.getItem('Q1Items')) ||data.filter(item => item.category_id == 1) || [];

  Q2Items = JSON.parse(localStorage.getItem('Q2Items')) ||data.filter(item => item.category_id == 2) ||  [];

  Q3Items = JSON.parse(localStorage.getItem('Q3Items')) || data.filter(item => item.category_id == 3) ||  [];


  Q4Items = JSON.parse(localStorage.getItem('Q4Items')) ||data.filter(item => item.category_id == 4) || [];

  populateList(Q1Items, Q1ToDo);
  populateList(Q2Items, Q2ToDo);
  populateList(Q3Items, Q3ToDo);
  populateList(Q4Items, Q4ToDo);
  
}

fetchListItems();