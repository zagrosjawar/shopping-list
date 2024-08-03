document.getElementById('new-item').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addItem();
        // addRemoveButtons();  // not needed because addItem() calls addRemoveButtons()
    }
});
/*
    * The above code gets the input element and adds and listens for the Enter key press event on the input field.
    * It checks if the Enter key is pressed, the addItem function is called.
    * When theaddItem executed, it then calls addRemoveButtons().
*/


function addItem() {
    let itemValue = document.getElementById('new-item').value.trim();
    let checked = checkDuplicate(itemValue); // check for duplicate items
    if (itemValue !== '' && !checked) {
        let li = document.createElement('li');
        // create a button element for each list item instead of using addRemoveButtons() function
        let btn = document.createElement('button');
        btn.onclick = removeItem;
        btn.textContent = 'Remove';
        li.textContent = itemValue;
        li.onclick = togglePurchased;
        li.appendChild(btn); // list item element is ready to be appended to the items list
        document.getElementById('items-list').appendChild(li);
        document.getElementById('new-item').value = '';
        //addRemoveButtons();
    } else {
        alert("Add Item or It may already Exists"); //feedback to the user
    }
}

/*
The addItem function is called when the Enter key is pressed or the Add button is clicked.
First, it gets the value of the input field and trims any whitespace.
If the input field is not empty, it creates a new list item element and sets its text content to the input value (the new item).
Then, it adds an onclick event listener to the list item element that calls the togglePurchased function when the item is clicked.
Finally, it appends the new list item element to the items list (<ul id="items-list"></ul>), 
then, it clears the input field value, and calls the addRemoveButtons function to add "Remove" button to the list items.
*/

function togglePurchased(event) {
    const li = event.target.closest('li');
    li.classList.toggle('purchased');
}

/*
The togglePurchased function is called when a list item is clicked.
It recieves the event object as a parameter.
It gets the list item element that was clicked using the closest method 
The closest method is applied to find the closest ancestor element (<li>) that matches the 'li' selector.
(Simply put: "Get the element where the event occured") 

then it toggles(off/on) the 'purchased' class in the list item element using the element.classList.toggle() method.
This toglled class "purchased" is used by Task1.css.
*/

function removeItem(event) {
    //event.stopPropagation();  // not needed
    const li = event.target.closest('li');
    li.parentNode.removeChild(li);
}

/*
When the addItem() function is called, it then calls 
addRemoveButtons() function which adds a "Remove" button to each list item element.
And when the "Remove" button is clicked, the removeItem function is called.
Now: the removeItem function receives the event object as a parameter.
It stops the event from bubbling up to the parent elements using the stopPropagation() method (w3schools.com).
After testing the code, I found that the stopPropagation() method is not needed in this case (commented out).
Reason: the parent element (<ul id="items-list"></ul>) is not listening for the click event.

The removeItem function gets the list item element that contains the clicked button using the closest method.
Then it removes the list item element from the DOM (Document Object Model) using the removeChild() method.
by traversing to the parent node of the list item element and calling the removeChild() method on the child node.

*/



// function addRemoveButtons() {
//     const items = document.querySelectorAll('#items-list li');
//     items.forEach(function(item) { // unnecessary to use forEach (waste of resources)
//         if (!item.querySelector('button')) {
//             let btn = document.createElement('button'); // "Remove" button can be created directly in addItem() function
//             btn.textContent = 'Remove';
//             btn.onclick = removeItem;
//             item.appendChild(btn);
//         }
//     });
// }

/*
This is called when the addItem() function is called.
It gets all the list item elements in the items list using the querySelectorAll method.
Then it iterates over each list item element using the forEach method.
For each list item element, it checks if there is NO button element inside the list item element using the querySelector method.
If there is no button element, it creates a new button element and sets its text content to 'Remove'.
Then it adds an onclick event listener to the button element that calls the removeItem function when the button is clicked.
Finally, it appends the button element to the list item element.
*/





// After provide the detailed explanation of the code, funcitionality of indiviula funtions and their relationship with each other,
// I would like to mention the following:
// This JavaScript file defines the interactive behavior of the shopping list application. (w3schools.com )
// A function is a block of code designed to perform a particular task.
// A JavaScript function is executed when "something" invokes it (calls it).
// Defining the code once, and use it many times (the concept of "reuse").
// It is important to mention that the interaction between the HTML and JavaScript is done through the Document Object Model (HTML DOM).

// Seperating code into functions make the code more readable, maintainable and more importantly reusable.
// Insted of using events in HTML, we are using JavaScript to add event listeners to the elements (managing events in one place).
// The code is well-structured and easy to understand.


// Alternative or improvements:
// No need for: addRemoveButtons() function  and  event.stopPropagation() statement (explained why in the comments)
// Adding else statement in the addItem() function to handle the case when the input field is empty (feedback to the user).
// Adding a check to prevent adding duplicate items (robustness)...etc (not implemented I am just mentioning it).

// this function checks for duplicate items in the list
function checkDuplicate(itemValue) {
    const items = document.querySelectorAll('#items-list li'); // get all list items NodeList
    //console.log("Items: ", items);
    let duplicate = false;
    items.forEach(function (item) {
        // Extract only the text content of <li>, excluding any buttons
        let textContent = Array.from(item.childNodes).reduce((acc, node) => {
            // Include only text nodes (nodeType 3)
            if (node.nodeType === Node.TEXT_NODE) {
                return acc + node.textContent.trim();
            }
            return acc;
        }, '');
        // console.log(textContent); // Logs the text content of the <li> without the button's text
        if (textContent.toLowerCase() === itemValue.trim().toLowerCase()) {
            duplicate = true; // converting list items text to lower case and do comparisonm, if true; set duplicate to true (item already exists).
        }
    });
    //console.log(duplicate);
    return duplicate;
}

/*
The checkDuplicate function is called when the addItem function is called.
It receives the itemValue as a parameter.
Gets all the list item elements in the items (NodeList) list using the querySelectorAll method.
A variable duplicate is initialized to false.
Iterating over each list item element inside items variable using the forEach method.
Then it extracts the text content of the list item element excluding any buttons, because each list item element has a button element inside it.
First, It checks if the nodeType of the node is 3 (text node type) and then it returns the text content of the node after trimming any whitespace.
Do comparison of the textContent of the list item element with the itemValue (new item) after converting both to lowercase.
Return true/false based on the comparison result.
*/


// End of Task1.js file
