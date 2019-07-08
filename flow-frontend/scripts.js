const body = document.querySelector('body');
  ;(function renderDiv() {
    body.innerHTML = `
    <div class="wrapper">
    <h2>Trello Clone</h2>
    <p></p>
    <ul class="todo">
      <li>To Do List</li>
    </ul>
    <form class="add-items">
      <input type="text" name="item" placeholder="Item Name" required>
      <input type="submit" value="+ Add Item">
    </form>
  </div>`
  })()

  //create card
  //create button to create a new instance of a category
  //each 



  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.todo');
  const items = JSON.parse(localStorage.getItem('items')) || [];

  function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
      text,
      done: false
    };

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
  }

  function removeAllItems(){
    localStorage.removeItem('items');
    itemsList.innerHTML = ''
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
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }

  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);

  populateList(items, itemsList);
