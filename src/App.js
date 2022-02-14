import { useState } from 'react';
import './App.css';

// This is the root component -- it acts as a function and returns
// whatever we want to render to our app
function App() {

  // This is a hook, where we will update 
  // our current user input value
  const [input, setInput] = useState("");
  // This is a hook, which will update our to do list array
  // 'item'
  const [item, setItem] = useState([]);

  // This updates the current value of the input field
  const inputHandler = (event) => {
    setInput(event.target.value);
  }

  let itemCount = 0;

  // Here we check for an 'Enter' key press
  // If enter is pressed while focus is on the input field,
  // we pass the input value to the listHandler
  const enterCheck = (event) => {
    if(event.key === 'Enter') {
      listHandler(input);
    }
  }

  // The listHandler will manage whatever 'input' value it is passed.
  // If blank, do nothing and return, otherwise add it to our
  // to do list array
  const listHandler = (x) => {
    let inputField = document.getElementById('input-field');
    if (x === '' || inputField.value === '') {
      setInput('')
      return;
    } else {
      let myList = [...item];
      myList.push(x);
      setItem(myList);
    }
    inputField.value = '';
    itemCount++;
  }

  // This will "delete"* an element from our array...
  // *not really! -- to prevent any unexpected behaviours
  // in the styling or attributes of each array element, it's
  // important they keep the same index they are assigned when created.
  // A deletion of one element, means a change of index for another!
  // Instead we will just hide the element when it is "deleted"
  const deleteHandler = (event) => {
    event.target.parentNode.setAttribute('style', 'display: none');
  }

  // This will handle any style changes of an element when its
  // 'done' button is clicked.
  const doneButton = (event) => {
    // The event here is a click
    if (event.target.value === 'false') {
      event.target.value = 'true';
      event.target.textContent = 'not done';
      event.target.parentNode.setAttribute('style', 'filter: brightness(50%');
    } else if (event.target.value === 'true') {
      event.target.value = 'false';
      event.target.textContent = 'done';
      event.target.parentNode.setAttribute('style', 'filter: brightness(100%)');
    }
  }

  // Everything within this Root Component 'return' is to be rendered
  return (
    <div>
      <h1 className="header">To Do List</h1>
      <div className="input-container">
        <label id="input-label" for="input">Enter task:</label>
        <input id="input-field" name="input" onChange={inputHandler} onKeyDown={enterCheck} />
        <button id="enter-button" onClick={() => listHandler(input)}>enter</button>
      </div>

      {item.map( (element, index) => {
        return (
          <div key={index} value={index} className="list-items" id={`item${itemCount}`}>
            <h2>{element}</h2>
            <button id="delete-button" onClick={deleteHandler}>delete</button>
            <button id="done-button" onClick={doneButton} value='false'>done</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
