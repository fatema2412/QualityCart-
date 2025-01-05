 async function load(){
    try{
 let res = await fetch("https://understood-steel-touch.glitch.me/products",{
    method:"GET",

})
    let data = await res.json()
    console.log(data);
    displayData(data)
}
catch(err){
    console.log(err)
}
 

}

// cart logic 
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



window.onload = load;




function displayData(data) {
    let cont = document.getElementById("gliproduct"); 
    cont.innerHTML = "";
    data.forEach((product) => {
        let card = document.createElement("div");
    card.classList.add("product");


       let imgContainer = document.createElement("div");
        imgContainer.classList.add("product-images");
        console.log( typeof product.image)
        product.image.forEach((image) => {
            let img = document.createElement("img");
          img.src = image;
          img.alt = `${product.name}`
          img.classList.add("product-image");
          imgContainer.appendChild(img);
        });
    
    

    
        let name = document.createElement("h3");
        name.textContent = product.name;
        let description = document.createElement("p");
        description.textContent = product.description;
        let price = document.createElement("p");
        price.textContent = `Price: ₹${product.price}`;
        let stock = document.createElement("p");
        stock.textContent = `Stock: ${product.stock}`;
        let qualityCartBtn = document.createElement("button");
    qualityCartBtn.textContent = "QualityCart Direct";
    qualityCartBtn.className = "fancy-button";
    let onlineOnlyBtn = document.createElement("button");
    onlineOnlyBtn.textContent = "Online Only";
    onlineOnlyBtn.className = "fancy-button";
    let buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    buttonContainer.addEventListener("click", () => {
        window.location.href = "while.html";
    })
    buttonContainer.append(qualityCartBtn, onlineOnlyBtn);
    let membersOnly = document.createElement("div");
    membersOnly.textContent = "Members Only";
    membersOnly.className = "fancy-text";



    
        card.append(imgContainer, buttonContainer,membersOnly,name, description, price, stock);
        cont.append(card);
    });


}
     

const images = [
    "https://cdn.bfldr.com/56O3HXZ9/at/n95jmwn7bjs78nfwjrqhv7wk/d_25w03353_hero_jan_mvm_cover.jpg?auto=webp&format=jpg",
    "https://mobilecontent.costco.com/live/resource/img/20241230_NewYears_Imgs/C_20241230_NewYears_US_ComHero_D_v1.jpg",
    "https://cdn.bfldr.com/56O3HXZ9/at/4pqhr3gnskz7c8g7g39thtg/d_25w05045_hero_samsung_tvs.jpg?auto=webp&format=jpg",
    "https://bfasset.costco-static.com/56O3HXZ9/at/rwch8zrvrfq84vps8thspn6/d_25w04077_homepage_hero_jan_connection.jpg?auto=webp&format=jpg",
    "https://cdn.bfldr.com/56O3HXZ9/at/tskqbfc6c3mwntqc5hqjns7/d_25w05002_hero_apparel_bmas.jpg?auto=webp&format=jpg"
  ];
  
  let index = 0;
  
  function showNextImage() {
    index++;
    if (index >= images.length) {
      index = 0; 
    }
    document.getElementById("moving-image").src = images[index];
  }
  
  function showPrevImage() {
    index--;
    if (index < 0) {
      index = images.length - 1; 
    }
    document.getElementById("moving-image").src = images[index];
  }
  
  setInterval(showNextImage, 4000);
  
  document.getElementById("prev-button").addEventListener("click", showPrevImage);
  document.getElementById("next-button").addEventListener("click", showNextImage);
  
  
  // Content data for each category
const contentData = {
  appliances: {
    title: "Why Buy Appliances at QualityCart?",
    image:"https://bfasset.costco-static.com/56O3HXZ9/at/4r6vpmhs5h675tbz8w9r9kh4/24w05103-img-appliances.png?auto=webp&format=jpg",
    description: `QualityCart offers a large selection of premium, feature-loaded
     appliances to make your life a whole lot easier. Browse our extensive
      selection of high-end appliances in a variety of sizes, colors and 
      finishes—you're sure to find something you love. Best of all, our prices
       include a two-year manufacturer warranty, delivery, installation and haul
 away service of your old equipment, and basic installation parts on select 
 appliances.`,
},
  mattresses: {
   title: "Why Buy Mattresses at QualityCart ?",
    image: "https://bfasset.costco-static.com/56O3HXZ9/at/j92n7mwqchjknw63snvsh5kb/24w05103-img-mattresses.png?auto=webp&format=jpg", 
    description: `The average person gets approximately eight hours of sleep
   per night—that's a third of your day spent in bed! That's why it's essential 
  that you have a mattress that provides you with the comfort and support you
 deserve. At Costco, you'll find an exceptional selection of premium-brand 
 mattresses in every size, material, and comfort level—so you're sure to 
 find the perfect mattress that fits both your needs and budget.`,
  },
  tires:{
    title: "Why Buy Tires  at QualityCart?",
    image:"https://bfasset.costco-static.com/56O3HXZ9/at/qkxvmcx76wppk53r934754b/24w05109-img-tires.png?auto=webp&format=jpg",
    description:`Finding tires that will keep you safe through any 
    weather conditions and all seasons is easy with the selection at
     QualityCart. Other tire shops find it hard to beat our prices,
      where you can get car, truck, trailer, golf, and even industrial-grade
       ATV tires.`,

  },
  televisions:{
    title: "Why Buy Televisions  at QualityCart?",
    image:"https://bfasset.costco-static.com/56O3HXZ9/at/nrcrt472sgvb84pvw8xrb/24w05103-img-televisions.png?auto=webp&format=jpg",
    description:`QualityCart has curated a selection of TVs from trusted brands 
    such as LG, Samsung, Sony, TCL, and Hisense. We offer everything from 
    high-resolution 4K OLED to 1080p TVs—all with the quality and value 
    you expect as a QualityCart member.`,

  },
  jewelry:{
    title: "Why Buy Jewellery at QualityCart?",
    image:"https://static.vecteezy.com/system/resources/thumbnails/036/208/992/small_2x/ai-generated-indian-culture-celebrates-beauty-with-jewelry-and-decoration-generated-by-ai-photo.jpg",
    description:`QualityCart offers a dazzling selection of jewelry in every 
   style, from traditional to contemporary. You will find high-end and one of 
a kind specially curated pieces as well as an array of color gemstones, 
pearls, gold and diamonds.  Whether you are shopping for a gift for a special someone,
   an engagement ring or a self purchase you will find exceptional
    quality and prices at QualityCart !`


  },

  optical:{
    title: "Why Buy optical at QualityCart?",
    image:"https://m.media-amazon.com/images/I/41MTu+Y+YHL._AC_UY1100_.jpg",
    description:`QualityCart Optical provides expert care from highly
     skilled opticians, offering high quality and exceptional value with a 
     wide selection of contacts, designer frames, and state-of-the art lenses.
     Most major vision insurance plans are accepted and eye exams are available 
     from independent doctors of optometry.`


  },
  travel:{
    title:"Why Buy Cruises at QualityCart",
    image:"https://bfasset.costco-static.com/56O3HXZ9/at/rvrzfmprs6hrnnfc8rvv475x/24w05103-img-cruises.jpg?auto=webp&format=jpg",
    description:`Cruising with QualityCart Travel means value. 
    QualityCart members receive a Digital Shop Card with every 
    sailing and enjoy member-exclusive included extras. Look for
     Buyer's Choice and Kirkland Signature TM cruises for the biggest value!`,
  }
  
};

// Function to update content
function updateContent(category) {
  const contentTitle = document.getElementById("content-title");
  const contentImage = document.getElementById("content-image");
  const contentDescription = document.getElementById("content-description");

  const data = contentData[category];
  if (data) {
    contentTitle.textContent = data.title;
    contentImage.src = data.image;
    contentDescription.textContent = data.description;
  }
}

// Add event listeners to menu items
document.querySelectorAll(".left-menu li").forEach((item) => {
  item.addEventListener("click", () => {
    const category = item.getAttribute("data-category");

    updateContent(category);
  });
});
 document.querySelector(".content-button").addEventListener("click",()=>{
  window.location.href = "while.html";
 })


// document.querySelector(".button-container").addEventListener("click", () => {
//   window.location.href = "while.html";
// });