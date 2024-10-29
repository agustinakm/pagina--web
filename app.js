document.addEventListener('DOMContentLoaded', function () {

    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('#navbar__menu'); 

    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    // CART FUNCTIONALITY
    function toggleCart() {
        const cartSection = document.querySelector('#cart');
        cartSection.classList.toggle('active'); // This adds/removes the 'active' class
    }

    //  "Order Now" button
    const orderNowButton = document.querySelector('.navbar__btn .button');
    orderNowButton.addEventListener('click', function(e) {
        e.preventDefault(); 
        toggleCart();
    });

    // minimizar header (your cart)
    const cartHeader = document.querySelector('#cart h3');
    cartHeader.addEventListener('click', function() {
        const cartSection = document.querySelector('#cart');
        cartSection.classList.toggle('minimized');
    });

    // LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    function addToCart(id, name, price) {
        let item = cart.find(item => item.id === id);
        
        if (item) {
            item.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCartUI();
        saveCartToLocalStorage();
    }


    function updateCartUI() {
        let cartContainer = document.querySelector('#cart-items');
        cartContainer.innerHTML = ''; 

        cart.forEach(item => {
            let cartItem = document.createElement('div');
            cartItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

            let removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', () => removeOneItem(item.id));

            let addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.classList.add('add-btn');
            addButton.addEventListener('click', () => addOneMore(item.id));

            cartItem.appendChild(removeButton);
            cartItem.appendChild(addButton);
            cartContainer.appendChild(cartItem);
        });
    }

    // guardar en LocalStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function removeOneItem(id) {
        let item = cart.find(item => item.id === id);
        if (item && item.quantity > 1) {
            item.quantity--; 
        } else {
            cart = cart.filter(item => item.id !== id); 
        }
        updateCartUI();
        saveCartToLocalStorage();
    }

    
    function addOneMore(id) {
        let item = cart.find(item => item.id === id);
        if (item) {
            item.quantity++; 
        }
        updateCartUI();
        saveCartToLocalStorage();
    }

    
    document.querySelector('#checkout').addEventListener('click', function() {
        let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        alert(`Your total is $${total}. Proceeding to checkout...`);
        cart = []; 
        updateCartUI(); 
        saveCartToLocalStorage(); 
    });

    
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            let id = button.getAttribute('data-id');
            let name = button.getAttribute('data-name');
            let price = parseFloat(button.getAttribute('data-price'));
            addToCart(id, name, price);
        });
    });

    
    updateCartUI();
});
