
  const quadrantOne = document.querySelector('#Q1');
  const quadrantTwo = document.querySelector('#Q2');
  const quadrantThree = document.querySelector('#Q3');
  const quadrantFour = document.querySelector('#Q4');

  const Q1ToDo = document.querySelector('#Q1-todo');
  const Q1Items = JSON.parse(localStorage.getItem('Q1Items')) || [];

  const Q2ToDo = document.querySelector('#Q2-todo');
  const Q2Items = JSON.parse(localStorage.getItem('Q2Items')) || [];
  
  const Q3ToDo = document.querySelector('#Q3-todo');
  const Q3Items = JSON.parse(localStorage.getItem('Q3Items')) || [];

  const Q4ToDo = document.querySelector('#Q4-todo');
  const Q4Items = JSON.parse(localStorage.getItem('Q4Items')) || [];

  function addItem(e, itemList, quadrant) {
    e.preventDefault();
    const text = (e.target.querySelector('[name=item]')).value;
    const item = {
      text,
      done: false
    };
    itemList.push(item);
    populateList(itemList, quadrant);
    localStorage.setItem('itemList', JSON.stringify(itemList));
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

  function toggleDone(e) {
    if (!e.target.matches('input')) return; 
    const el = e.target;
    const index = el.dataset.index;
    Q1Items[index].done = !Q1Items[index].done;
    localStorage.setItem('Q1Items', JSON.stringify(Q1Items));
    populateList(Q1Items, Q1ToDo);
  }

  quadrantOne.addEventListener('submit', (e) => {addItem(e, Q1Items, Q1ToDo)});
  quadrantTwo.addEventListener('submit', (e) => {addItem(e, Q2Items, Q2ToDo)});
  quadrantThree.addEventListener('submit', (e) => {addItem(e, Q3Items, Q3ToDo)});
  quadrantFour.addEventListener('submit', (e) => {addItem(e, Q4Items, Q4ToDo)});

  Q1ToDo.addEventListener('click', toggleDone);

  populateList(Q1Items, Q1ToDo);
  populateList(Q2Items, Q2ToDo);


  // fetch('http://localhost:3000/items').then(resp => resp.json()).then(data => console.log(data))












  
  // const quadrantOne = document.querySelector('#Q1');
  // const quadrantTwo = document.querySelector('#Q2');
  // const quadrantThree = document.querySelector('#Q3');
  // const quadrantFour = document.querySelector('#Q4');

  // const Q1ToDo = document.querySelector('#Q1-todo');
  // const Q1Items = JSON.parse(localStorage.getItem('Q1Items')) || [];

  // const Q2ToDo = document.querySelector('#Q2-todo');
  // const Q2Items = JSON.parse(localStorage.getItem('Q2Items')) || [];
  
  // const Q3ToDo = document.querySelector('#Q3-todo');
  // const Q3Items = JSON.parse(localStorage.getItem('Q3Items')) || [];

  // const Q4ToDo = document.querySelector('#Q4-todo');
  // const Q4Items = JSON.parse(localStorage.getItem('Q4Items')) || [];

  // function addItem(e,itemList, quad) {
  //   e.preventDefault();
  //   const text = (this.querySelector('[name=item]')).value;
  //   const item = {
  //     text,
  //     done: false
  //   };

  //   itemList.push(item);
  //   populateList(itemList, quad);
  //   localStorage.setItem('itemList', JSON.stringify(itemList));
  //   this.reset();
  // }

  // function removeAllItems(){
  //   localStorage.removeItem('Q1Items');
  //   Q1ToDo.innerHTML = ''
  // }

  // function populateList(todo = [], todoList) {
  //   todoList.innerHTML = todo.map((item, i) => {
  //     return `
  //       <li>
  //         <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''} />
  //         <label for="item${i}">${item.text}</label>
  //       </li>
  //     `;
  //   }).join('');
  // }

  // function toggleDone(e) {
  //   if (!e.target.matches('input')) return; // skip this unless it's an input
  //   const el = e.target;
  //   const index = el.dataset.index;
  //   Q1Items[index].done = !Q1Items[index].done;
  //   localStorage.setItem('Q1Items', JSON.stringify(Q1Items));
  //   populateList(Q1Items, Q1ToDo);
  // }

  // quadrantOne.addEventListener('submit', e => addItem(e, items, Q1ToDo));
  // quadrantTwo.addEventListener('submit', e =>  addItem(e, items, Q2ToDo));
  // quadrantThree.addEventListener('submit', e => addItem(e, items, Q3ToDo));
  // quadrantFour.addEventListener('submit', e => addItem(e, items, Q4ToDo));

  // Q1ToDo.addEventListener('click', toggleDone);

  // populateList(Q1Items, Q1ToDo);
 


  // fetch('http://localhost:3000/items').then(resp => resp.json()).then(data => console.log(data))