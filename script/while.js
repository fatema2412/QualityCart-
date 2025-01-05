function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.classList.toggle("visible");
}
function generateStars(rating) {
    return Array.from({ length: 5 })
    // here creates an array with 5 undefined elements
    .map((item, i) =>
        (i < Math.floor(rating) ? "★" : "☆"))
      .join("");
  }

//   Cart Logic
document.addEventListener("DOMContentLoaded", () => {
    const cartLink = document.getElementById("cart-link");
    const cartCountSpan = document.getElementById("cart-count");
  
    const updateCartCount = async () => {
      try {
        const response = await fetch("https://understood-steel-touch.glitch.me/cart");
        const cart = await response.json();
        const itemCount = cart.length; 
        cartCountSpan.innerText = `(${itemCount})`;
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    updateCartCount();
    // window.location.reload();

  
  });



let currentPage = 1;
let itemsPerPage = 6; 
let originalProducts = []; 
let filteredProducts = []; 
let cart = {};

// Fetch products with pagination from API
async function fetchProducts(page=1,limit=6) {
    try {
        const response = await fetch(`https://understood-steel-touch.glitch.me/displayproduct?_page=${page}&_limit=${limit}`);

        const data = await response.json();
        console.log(page)
        originalProducts = [...data];
        filteredProducts = [...originalProducts];
        displayData(filteredProducts); 
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayData(data) {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; // Clear the container

    data.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        const productImage = document.createElement("img");
        productImage.src = product.pic
        productImage.alt = product.name;

        const productName = document.createElement("h3");
        productName.innerHTML = product.name;

        const productCategory = document.createElement("p");
        productCategory.innerHTML = `Category: ${product.category}`;

        const productPrice = document.createElement("p");
        productPrice.innerHTML = `Price: $${product.price}`;

        const productRating = document.createElement("p");
        productRating.innerHTML = `${generateStars(product.rating)}`;

        const productDelivery = document.createElement("p");
        productDelivery.innerHTML =  product.delivery === 'Available' ? 'Delivery-available' : 'Delivery-out';
        productDelivery.className =
        product.delivery === "Available" ? "delivery-available" : "delivery-out";
        
  

 

        const addToCartButton = document.createElement("button");
        addToCartButton.innerHTML = "Add to Cart";
        if (product.delivery === "Out of Stock") {
            addToCartButton.disabled = true;
            addToCartButton.style.backgroundColor = "#ccc";
            addToCartButton.style.cursor = "not-allowed";
          } else {
            addToCartButton.addEventListener("click", () => addToCart(product));
          }
      

        
      

        productCard.append(productImage,productName,productCategory,productPrice,productRating,productDelivery,addToCartButton)
        container.append(productCard);
    });
}
fetchProducts(currentPage, itemsPerPage);
handlePagination();



function applyFiltersAndSorting() {
    // Sort by price
    const sortPriceElement = document.getElementById("SortbyPrice");
    if (sortPriceElement) {
        const sortValue = sortPriceElement.value;
        if (sortValue === "htl") {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === "lth") {
            filteredProducts.sort((a, b) => a.price - b.price);
        }
    }

    // Sort alphabetically
    const alphaSortElement = document.getElementById("SortbyAlba");
    if (alphaSortElement) {
        const alphaSort = alphaSortElement.value;
        if (alphaSort === "one") {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (alphaSort === "two") {
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        }
    }

    // Update display
    displayData(filteredProducts);
}
let filterElement = document.getElementById("filter");

filterElement.addEventListener("change", function () {
    const filterValue = filterElement.value.toLowerCase();

    if (filterValue) {
        filteredProducts = originalProducts.filter((product) =>
            product.category.toLowerCase() === filterValue
        );
    } else {
        filteredProducts = [...originalProducts];
    }

    // Apply sorting after filtering
    applyFiltersAndSorting();
});
document.getElementById("filter")?.addEventListener("change", applyFiltersAndSorting);
document.getElementById("SortbyPrice")?.addEventListener("change", applyFiltersAndSorting);
document.getElementById("SortbyAlba")?.addEventListener("change", applyFiltersAndSorting);

async function addToCart (product){
    const productId = product.id
    if(cart[productId]){
        cart[productId].quantity += 1; 

    }
    else{
        cart[productId] = { ...product, quantity: 1 };
    }

    try{
    let res= await fetch("https://understood-steel-touch.glitch.me/cart",{
    "method":"POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart[productId]),
  });
  console.log(cart[product.id]);
  alert(`${product.name} added to cart successfully!`);
  window.location.reload();




}
catch(err){
 console.log(err)
 alert("Error in adding to cart")
}
}

// function handlePagination(){
//  const pagination=document.getElementById("pagination")
 
//  pagination.innerHTML=""
//  for(i=1;i<=5;i++){
//     const button=document.createElement("button")
//     button.innerText=i;
//     button.dataset.page=i;
//     if(i==currentPage){
//         console.log(currentPage)
//         button.classList.add("active");

//     }
//     button.addEventListener("click", ()=>{
//         currentPage = parseInt(button.dataset.page);
//         fetchProducts(currentPage, itemsPerPage);
//         handlePagination();
  
//     });
//     pagination.append(button);

//  }
// }
function handlePagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; // Clear existing buttons

    for (let i = 1; i <=5; i++) { // Assuming 5 total pages
        const button = document.createElement("button");
        button.innerText = i;
        button.dataset.page = i; // Use dataset to store the page number

        if (i == currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            currentPage = parseInt(button.dataset.page); // Parse dataset.page
            fetchProducts(currentPage, itemsPerPage); // Fetch new products
            handlePagination(); // Re-render pagination buttons
        });

        pagination.append(button);
    }
}



