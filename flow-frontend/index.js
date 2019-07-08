
  const quadrantOne = document.querySelector('#Q1');
  const quadrantTwo = document.querySelector('#Q2');
  const quadrantThree = document.querySelector('#Q3');
  const quadrantFour = document.querySelector('#Q4');

  const Q1ToDo = document.querySelector('#Q1-todo');

  let Q1Items;

  const Q2ToDo = document.querySelector('#Q2-todo');
  let Q2Items;
  
  const Q3ToDo = document.querySelector('#Q3-todo');
  let Q3Items = JSON.parse(localStorage.getItem('Q3Items')) || [];

  const Q4ToDo = document.querySelector('#Q4-todo');
  let Q4Items = JSON.parse(localStorage.getItem('Q4Items')) || [];


  function addItem(e, itemList, quadrant) {
    e.preventDefault();
    const text = (e.target.querySelector('[name=item]')).value;
    const item = {
      text,
      done: false
    };

    itemList.push(item);
    populateList(itemList, quadrant);
    localStorage.setItem(`${quadrant.dataset.id}`, JSON.stringify(itemList));
    e.target.reset();
  }

  function removeAllItems(){
    localStorage.removeItem('Q1Items');
    Q1ToDo.innerHTML = ''
  }

  function populateList(todo = [], todoList) {
    todoList.innerHTML = todo.map((item, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''} />
          <label for="item${i}">${item.text}</label>
        </li>
      `;
    }).join('');
  }

  function toggleDone(e, itemList, quadrant) {
    if (!e.target.matches('input')) return; 
    const el = e.target;
    const index = el.dataset.index;
    itemList[index].done = !itemList[index].done;
    localStorage.setItem('Q1Items', JSON.stringify(itemList));
    populateList(itemList, quadrant);
  }

  quadrantOne.addEventListener('submit', e => addItem(e, Q1Items, Q1ToDo));
  quadrantTwo.addEventListener('submit', e =>  addItem(e, Q2Items, Q2ToDo));
  quadrantThree.addEventListener('submit', e => addItem(e, Q3Items, Q3ToDo));
  quadrantFour.addEventListener('submit', e => addItem(e, Q4Items, Q4ToDo));


  Q1ToDo.addEventListener('click', e => toggleDone(e, Q1Items, Q1ToDo));

  
  fetchListItems();


function fetchListItems(){
  fetch('http://localhost:3000/items').then(resp => resp.json()).then(data => assignList(data))
}

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
