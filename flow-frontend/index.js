//render li elements
function populateList(todo = [], todoList) {
  todoList.innerHTML = todo.map((item, i) => {
    return `
      <li>
        <input type="checkbox" data-id=${item.id} id="item${i}" ${item.done ? 'checked' : ''} />
        <label for="item${i}">${item.text}</label>
        <button type="button" class="btn btn-default btn-sm glyphicon glyphicon-trash" data-id=${item.id}>
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
      <input type="text" name="item" value="${item.text}" data-id="${item.id}" size="35">
    </form>
    `;
  }).join('');
  //create submit button
  const editSubmit = '<input type="submit" class="edit-button" value="Save Changes" id="edit-submit"></input>'
  Q1EditMain.insertAdjacentHTML( 'beforeend', editSubmit );
  //create patch request
  const editSubmitBtn = document.querySelector('#edit-submit');
  
  //onchange listener feature** for greater optimization

  //save the id of the text in a dataset to patch and then save it to an array
  const idsNode = Array.from(document.querySelectorAll('#Q1-editing'))
  const ids = idsNode.map(id => {
    return id[0].dataset.id
  })
  //the event listener should receive a form update object
  
  editSubmitBtn.addEventListener('click', e => 
    {
    let changes = Array.from(e.target.parentElement.querySelectorAll('input'))
    changes.splice(-1, 1)
    patchForm(changes, ids)
    populateList(Q1Items, Q1ToDo);
    Q1EditMain.innerHTML = ""
      Q1EditMain.innerHTML = 
      `<button id="Q1-edit-btn" type="button" class="btn btn-default btn-sm glyphicon glyphicon-cog">
      </button>
      <p></p>
      <ul id="Q1-todo" class="todo" data-id="Q1Items" data-postid="1">
      </ul>
      <form id="Q1" class="add-items">
        <input type="text" name="item" placeholder="Item Name" required>
        <input type="submit" value="+ Add Item">
    </form>`
    Q1ToDo = document.querySelector('#Q1-todo');
  })
  
}


// Q1Items = Q1Items.filter( item =>  item.id != e.target.dataset.id )
// Q1ToDo.addEventListener('click', e => {deleteItem(e, Q1ToDo); Q1Items = Q1Items.filter( item =>  item.id != e.target.dataset.id );})

// Q1Items.find( item =>  item.id == 1 ).text = "Finish my project"


function patchForm(textChanges, ids){
  
  const input = textChanges
  const idArr = ids
  
  if (idArr.length > 0){
  
  const id = idArr.shift()
  let formUpdate = {
    text: input.shift().value
  }
  // console.log(formUpdate)
  let configObj = {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(formUpdate)
  }
  // console.log(configObj)
  
  fetch(`http://localhost:3000/items/${id}`, configObj)
  .then(resp => resp.json())
  .then(data => {Q1Items.find( item =>  item.id == id ).text = data.text; patchForm(input, idArr)})
  }else{
    return populateList(Q1Items, Q1ToDo);
  }
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

  //send post request to backend
  postItem(item, itemList, quadrant)
  
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

function postItem(item, itemList, quadrant){
  
  let configObj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item)
  }
  
  fetch('http://localhost:3000/items', configObj)
  .then(resp => resp.json())
  .then(data => {itemList.push(data);
    populateList(itemList, quadrant);
    localStorage.setItem(`${quadrant.dataset.id}`, JSON.stringify(itemList));
  })
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