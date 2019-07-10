//render li elements
function populateList(todo = [], todoList) {
  todoList.innerHTML = todo.map((item, i) => {
    return `
      <li>
        <input type="checkbox" data-id=${item.id} id="item${i}" ${item.done ? 'checked' : ''} />
        <label for="item${i}">${item.text}</label>
        <button type="button" class="btn btn-default btn-sm" data-id=${item.id}>
        <span class="glyphicon glyphicon-trash"></span> 
      </button>
      </li>
    `;
  }).join('');
}




// itemList = Q1Items, quadrant = Q1ToDo
function editForm(e, itemList, quadrant){
  //remove all quadrant div elements
  Q1EditMain.innerHTML = ""
  //render form in quadrant
  Q1EditMain.innerHTML = itemList.map((item, i) => {
    return `
    <form id="Q1-editing" class="edit-items">
      <input type="text" name="item" value="${item.text}" size="35">
    </form>
    `;
  }).join('');
  //create submit button
  const editSubmit = '<input type="submit" class="edit-button" value="Save Changes" id="edit-submit"></input>'
  Q1EditMain.insertAdjacentHTML( 'beforeend', editSubmit );
  //create patch request
  const editSubmitBtn = document.querySelector('#edit-submit');
  editSubmitBtn.addEventListener('click', e => patchForm(e, itemList, quadrant))
}


function patchForm(e, itemList, quadrant){
  console.log(e.target)
  console.log(itemList)
  console.log(quadrant)
}

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