let items;


document.addEventListener("DOMContentLoaded", function () {

    const addItemForm = document.getElementById("addItemForm");
    const itemList = document.getElementById("itemList");

    addItemForm.addEventListener("submit", handleUserSubmission);

    displayItems();

});



function handleUserSubmission(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseFloat(document.getElementById("quantity").value);


    if (name === null || description === null || price === null || quantity === null) {
        alert('Please fill in all fields with valid data.');
    }

    else {
        addItem(name, description, price, quantity);
        event.target.reset();
    }


}



// Function to add an user to the crud crud server
function addItem(name, description, price, quantity) {
    const newItem = {
        name: name,
        description: description,
        price: price,
        quantity: quantity
    };

    console.log(newItem);
    postItem(newItem);
}





function postItem(item) {
    console.log(item);
    axios.post('https://crudcrud.com/api/f28b984072884a62ad8607207876a924/items', item)
        .then((item) => {
            console.log(item);
            displayItems();
        })
        .catch((err) => console.log(err));
}


function updateItem(id, item) {
    axios.put(`https://crudcrud.com/api/f28b984072884a62ad8607207876a924/items/${id}`, item)
        .then((itemUpdated) => {
            console.log('putting new object');
            console.log(itemUpdated);
            displayItems();
        })
        .catch((err) => console.log(err));
}



function deleteItem(id) {
    axios.delete(`https://crudcrud.com/api/f28b984072884a62ad8607207876a924/items/${id}`)
        .then((item) => {
            console.log(item);
            displayItems();
        })
        .catch((err) => console.log(err));
}





// Function to display the submitted details
function displayItems() {
    axios.get('https://crudcrud.com/api/f28b984072884a62ad8607207876a924/items')
        .then((response) => {
            items = [...response.data] || [];
            console.log(items);

            const itemList = document.getElementById('itemList');
            itemList.innerHTML = '';

            items.forEach((item, index) => {
                console.log(item);
                const itemElement = document.createElement("div");
                itemElement.classList.add("item");
                itemElement.innerHTML = `
                <h3>Name: ${item.name}</h3>          
                <p>Description: ${item.description}</p>          
                <p>Price: ${item.price}Rs.</p>            
                <p>Quantity: ${item.quantity}</p>
            `;


                // Create Buy 1 button
                const buyButton1 = document.createElement('button');
                buyButton1.className = 'buyButton';
                buyButton1.textContent = 'Buy 1';
                buyButton1.setAttribute('data-action', 'Buy 1');
                buyButton1.addEventListener('click', () => {

                    updateItem1(item);

                });

                // Create Buy 2 button
                const buyButton2 = document.createElement('button');
                buyButton2.className = 'buyButton';
                buyButton2.textContent = 'Buy 2';
                buyButton2.setAttribute('data-action', 'Buy 2');
                buyButton2.addEventListener('click', () => {

                    updateItem2(item);

                });

                // Create Buy 3 button
                const buyButton3 = document.createElement('button');
                buyButton3.className = 'buyButton';
                buyButton3.textContent = 'Buy 3';
                buyButton3.setAttribute('data-action', 'Buy 3');
                buyButton3.addEventListener('click', () => {

                    updateItem3(item);

                });


                itemElement.appendChild(buyButton1);
                itemElement.appendChild(buyButton2);
                itemElement.appendChild(buyButton3);
                itemList.appendChild(itemElement);
            });

        })
        .catch((error) => console.log(error));


}


function updateItem1(item) {
    const updatedItem = item;
    const currentQuantity = parseInt(updatedItem.quantity);

    if (currentQuantity > 1) {

        const newItem = {
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: currentQuantity - 1
        }

        updateItem(updatedItem._id, newItem);

    }
    else if (currentQuantity === 1) {
        deleteItem(updatedItem._id);
    }
    else {
        console.log('Item quantity are insufficient');
    }
}



function updateItem2(item) {
    const updatedItem = item;
    const currentQuantity = parseInt(updatedItem.quantity);

    if (currentQuantity > 2) {

        const newItem = {
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: currentQuantity - 2
        }

        updateItem(updatedItem._id, newItem);
    } else if (currentQuantity === 2) {
        deleteItem(updatedItem._id);
    }
    else {
        console.log('Item quantity are insufficient');
    }
}




function updateItem3(item) {
    const updatedItem = item;
    const currentQuantity = parseInt(updatedItem.quantity);
    
    if (currentQuantity > 3) {
        const newItem = {
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: currentQuantity - 3
        }

        updateItem(updatedItem._id, newItem);

    } else if (currentQuantity === 3) {
        deleteItem(updatedItem._id);
    }
    else {
        console.log('Item quantity are insufficient');
    }
}









