const cartContainer = document.getElementById("cart-container");
const totalItemsElement = document.getElementById("total-items");
const totalAmountElement = document.getElementById("total-amount");

async function fetchCart() {
    try {
        const response = await fetch("https://understood-steel-touch.glitch.me/cart")       
         const cartData = await response.json()
         displayCart(cartData);

    }
    catch(err){
        console.log(err)
        alert('Something went wrong in fetching the data')
    }
}

function displayCart(cartData) {
    const cartContainer = document.getElementById("cart-container");
    const totalItemsElement = document.getElementById("total-items");
    const totalAmountElement = document.getElementById("total-amount");

    cartContainer.innerHTML = ""; 

    let totalAmount = 0;
    let totalItems = 0;

    cartData.forEach(element => {
        totalAmount += element.price * element.quantity;
        totalItems += element.quantity;

        const productCard = document.createElement("div");
        productCard.className = "product-card";

        const productName = document.createElement("h3");
        productName.textContent = element.name;

        const productQuantity = document.createElement("p");
        productQuantity.textContent = `Quantity: ${element.quantity}`;

        const productPrice = document.createElement("p");
        productPrice.textContent = `Price: $${element.price}`;

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "Decrease Quantity";
        decreaseButton.addEventListener("click", () => decreaseQuantity(element));

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "Increase Quantity";
        increaseButton.addEventListener("click", () => increaseQuantity(element));


        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeItem(element.id));

        productCard.append(productName, productQuantity, productPrice, decreaseButton,increaseButton, removeButton);
        cartContainer.append(productCard);
    });

    // Update total items and amount
    totalItemsElement.textContent = ` ${totalItems}`;
    totalAmountElement.textContent = ` $${totalAmount.toFixed(2)}`;
}

async function decreaseQuantity(item) {
    if (item.quantity > 1) {
        const updatedItem = { ...item, quantity: item.quantity - 1 };
        try {
     let res=await fetch (`https://understood-steel-touch.glitch.me/cart/${item.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedItem), 
            });
     alert(`${item.name} quantity is decrease`)
     fetchCart()            
        }
        catch(err){
            console.error("Error decreasing quantity:", err);
        }
    }
     else {
            removeItem(item.id);
        }
    
}

async function removeItem(itemId) {
    try {
        const response = await fetch(`https://understood-steel-touch.glitch.me/cart/${itemId}`, {
            "method":"DELETE"

        })
        alert("Items Remove From Cart")
        fetchCart()
    }
        catch(error){
            console.error("Error removing item:", error);

        }
    }
    document.getElementById("payment-button").addEventListener("click", () => {
        window.location.href="payment.html"
    })

    function increaseQuantity(item) {
        // Increment the quantity first
        item.quantity++;
        const updatedItem = { ...item, quantity: item.quantity };
        fetch(`https://understood-steel-touch.glitch.me/cart/${item.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedItem) 
        })
        .then(response => response.json())
        .then(updatedItem => {
            console.log("Item updated:", updatedItem);
            fetchCart() ;
            alert(`${item.name} quantity is increase`)
        })
        .catch(error => {
            console.error("Error updating item:", error);
            alert("Failed to update item. Please try again.");
        });
    

    
    }    

    fetchCart();