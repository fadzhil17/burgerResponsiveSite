//toggle drawer

const exit = document.querySelector('.exit');

document

const navbarNav = document.querySelector('.navbar-nav');

document.querySelector('#hamburger').onclick = () => {
    navbarNav.classList.toggle('active');
}

document.querySelector('.exit').onclick = () =>{
    navbarNav.classList.remove('active')
}

//click aside of sidebar
const hamburger = document.querySelector('#hamburger');

document.addEventListener('click', function(e){
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
})

/*-------------------------------------------*/
// add to cart features
const buttons = document.querySelectorAll('.menu-card button');
const cart = document.getElementById('cart');
const totalElement = document.getElementById('total');
const cartCount = document.getElementById('cart-count');
const taxElement = document.getElementById('tax');
const subtotalElement = document.getElementById('subtotal');
const checkoutButton = document.getElementById('checkout');

const selectedItems = {};
const TAX_AMOUNT = 0.60;

function handleButtonClick(event) {
    const button = event.currentTarget;
    const card = button.closest('div');

    const itemId = card.className;
    const itemName = card.querySelector('h2').textContent;
    const itemPrice = parseFloat(card.querySelector('.price').textContent.replace('RM', '').trim());
    const itemImage = card.querySelector('img').src;

    if (selectedItems[itemId]) {
        selectedItems[itemId].count++;
    } else {
        selectedItems[itemId] = {
            name: itemName,
            price: itemPrice,
            image: itemImage,
            count: 1,
        };
    }

    console.log(selectedItems);
    updateCart();
}

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

function updateCart() {
    cart.innerHTML = '';
    let subtotal = 0;
    let itemCount = 0;
    let index = 0;

    for (const itemId in selectedItems) {
        const item = selectedItems[itemId];
        const listItem = document.createElement('li');

        listItem.classList.add(index % 2 === 0 ? 'color1' : 'color2'); 
        index++; 
        
        const itemDetails = document.createElement('div');
        itemDetails.innerHTML = `<img src="${item.image}" alt="${item.name}">
                                 <span>${item.name}</span>
                                 <span>× ${item.count}</span>
                                 <span>RM ${item.price * item.count}</span>`;

        const quantityContainer = document.createElement('div');
        const quantityText = document.createElement('span');
        const addButton = document.createElement('button');
        const subtractButton = document.createElement('button');

        addButton.textContent = '+';
        subtractButton.textContent = '-';
        quantityText.textContent = item.count;

        addButton.addEventListener('click', () => {
            addItem(itemId);
        });

        subtractButton.addEventListener('click', () => {
            removeItem(itemId);
        });

        quantityContainer.appendChild(subtractButton);
        quantityContainer.appendChild(quantityText);
        quantityContainer.appendChild(addButton);

        itemDetails.appendChild(quantityContainer);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', () => {
            deleteItem(itemId);
        });

        listItem.appendChild(itemDetails);
        listItem.appendChild(removeButton);
        cart.appendChild(listItem);

        subtotal += item.price * item.count;
        itemCount += item.count;
    }

    if (itemCount === 0) {
        cart.innerHTML = '<li>Cart is Empty, Please Select the Burger</li>'; 
    }

    const tax = itemCount > 0 ? TAX_AMOUNT : 0;
    const total = subtotal + tax;

    subtotalElement.textContent = `SUB-TOTAL: RM ${subtotal.toFixed(2)}`;
    taxElement.textContent = `TAX: RM ${tax.toFixed(2)}`;
    totalElement.textContent = `TOTAL: RM ${total.toFixed(2)}`;
    cartCount.textContent = itemCount;
}

function addItem(itemId) {
    if (selectedItems[itemId]) {
        selectedItems[itemId].count++;
    }
    updateCart();
}

function removeItem(itemId) {
    if (selectedItems[itemId]) {
        selectedItems[itemId].count--;
        if (selectedItems[itemId].count <= 0) {
            delete selectedItems[itemId];
        }
    }
    updateCart();
}

function deleteItem(itemId) {
    if (selectedItems[itemId]) {
        delete selectedItems[itemId];
    }
    updateCart();
}

function initializeCart() {
    if (Object.keys(selectedItems).length === 0) {
        cart.innerHTML = '<li>Cart is Empty</li>';
    }
}

var myCart = document.getElementById("myCart");
var modal = document.getElementById("myModalCart");
var span = document.getElementsByClassName("close")[0];
var contShop = document.getElementById('continue-shopping');

myCart.onclick = function() {
    initializeCart();
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

contShop.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

myCart.onclick = function() {
    initializeCart(); // Ensure cart is initialized when modal is opened
    modal.style.display = "block";
}

initializeCart();


function handleCheckout() {
    if (Object.keys(selectedItems).length === 0) { 
        alert("Please select items to purchase first.");
        return;
    }

    console.log("Processing payment...");

    for (const itemId in selectedItems) {
        delete selectedItems[itemId];
    }

    updateCart();
    alert("Thank you for your purchase!");
}

checkoutButton.addEventListener('click', handleCheckout);