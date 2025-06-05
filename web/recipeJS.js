//this code is to allow user to set rating and save the rating 
//so when the page is visited again, the rating is saved
//rating is saved in local storage at specified ID
//source used: https://www.youtube.com/watch?v=_gToDN-aoyI

let stars = document.querySelectorAll(".rating span");
let products = document.querySelectorAll(".rating");
let ratings = [];
for(let st of stars) {
    st.addEventListener("click", function(){
        let children = st.parentElement.children;

        for(let child of children){
            if(child.getAttribute("data-clicked")){
                return false;
            }
        }
        this.setAttribute("data-clicked", "true");
        let rating = this.dataset.rating;
        let productID = this.parentElement.dataset.productid;
        console.log(rating, productID);


        let data = {
            "stars" : rating,
            "product-id" : productID
        }

        ratings.push(data);
        localStorage.setItem("rating", JSON.stringify(ratings));
   
    });
}

if(localStorage.getItem("rating")){
    ratings = JSON.parse(localStorage.getItem("rating"));
    for(let rating of ratings){
        for(product of products){
            if(rating["product-id"] == product.dataset.productid){
                let reversedStars = Array.from(product.children).reverse();
                let index = parseInt(rating["stars"]- 1);
                reversedStars[index].setAttribute("data-clicked", "true");
            }
        }
    }
}

document.getElementById('favoriteCheckbox').addEventListener('change', function () {
    const recipeId = 1; // Assign a unique ID for each recipe
    const recipeTitle = "Chocolate Chip Cookies";
    const recipeImg = "Baking2.jpg";

    // Retrieve the existing favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the recipe already exists in favorites
    const exists = favorites.find(recipe => recipe.id === recipeId);

    if (!exists) {
        favorites.push({ id: recipeId, title: recipeTitle, img: recipeImg });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Recipe added to favorites!');
    } else {
        alert('This recipe is already in your favorites!');
    }
});

// Function to load recipe data dynamically
async function loadRecipe(recipeId) {
    try {
        const response = await fetch(`http://localhost:8080/api/recipe?id=${recipeId}`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to fetch recipe");
        }

        const recipe = await response.json();
        document.getElementById("recipeTitle").innerText = recipe.title || "No Title Available";
        document.getElementById("recipeImg").src = recipe.image || "default-image.jpg";

        const ingredientsList = document.getElementById("ingredientsList");
        ingredientsList.innerHTML = recipe.ingredients
            ? recipe.ingredients.split("\n").map(i => `<p><input type="checkbox"> ${i}</p>`).join("")
            : "<p>No ingredients available.</p>";

        const instructionsList = document.getElementById("instructionsList");
        instructionsList.innerHTML = recipe.instructions
            ? recipe.instructions.split("\n").map((i, idx) => `<li>${idx + 1}. ${i}</li>`).join("")
            : "<p>No instructions available.</p>";
    } catch (error) {
        console.error("Error loading recipe:", error.message);
        alert(`Failed to load the recipe: ${error.message}`);
    }
}

// Extract recipe ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("id");

if (recipeId) {
    loadRecipe(recipeId);
} else {
    alert("No recipe ID provided!");
}
