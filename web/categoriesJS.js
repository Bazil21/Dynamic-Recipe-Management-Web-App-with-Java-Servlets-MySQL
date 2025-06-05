console.log("Page loaded!");

// Highlight selected category on click
document.querySelectorAll('.category').forEach(item => {
  item.addEventListener('click', function () {
    const category = this.dataset.category;
    
    
    // Highlight selected category
    document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active-category'));
    this.classList.add('active-category');

    // Implement filtering logic based on category
    const recipeCards = document.querySelectorAll('#recipeCards .card');
    recipeCards.forEach(card => {
      if (category === 'all' || card.textContent.toLowerCase().includes(category)) {
        card.parentElement.style.display = 'block'; // Show matching recipes
      } else {
        card.parentElement.style.display = 'none'; // Hide non-matching recipes
      }
    });
  });
});

// Reset filters to "All" when pressing the reset button
document.querySelector('.btn-dark').addEventListener('click', function () {
  
  // Reset to "All"
  document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active-category'));
  document.querySelector('[data-category="all"]').classList.add('active-category');

  // Show all recipes
  const recipeCards = document.querySelectorAll('#recipeCards .card');
  recipeCards.forEach(card => {
    card.parentElement.style.display = 'block';
  });
});

  // Add "active" class to the current page link
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

// CSS to highlight active category
const style = document.createElement('style');
style.innerHTML = `
  .active-category {
    background-color: #99b4c2;
    color: #fff;
    font-weight: bold;
  }
`;
document.head.appendChild(style);


// Function to get query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  // Highlight selected category and filter recipes on page load
  document.addEventListener('DOMContentLoaded', () => {
    const selectedCategory = getQueryParam('category') || 'all';
  
    // Highlight the selected category
    const categoryElements = document.querySelectorAll('.category');
    categoryElements.forEach((item) => {
      if (item.dataset.category === selectedCategory) {
        item.classList.add('active-category');
      } else {
        item.classList.remove('active-category');
      }
    });
  
    // Filter recipes
    const recipeCards = document.querySelectorAll('#recipeCards .card');
    recipeCards.forEach((card) => {
      if (selectedCategory === 'all' || card.textContent.toLowerCase().includes(selectedCategory)) {
        card.parentElement.style.display = 'block'; // Show matching recipes
      } else {
        card.parentElement.style.display = 'none'; // Hide non-matching recipes
      }
    });
  });
  
  // Reset filters to "All" when pressing the reset button
  document.querySelector('.btn-dark').addEventListener('click', function () {
    
    // Reset to "All"
    document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active-category'));
    document.querySelector('[data-category="all"]').classList.add('active-category');
  
    // Show all recipes
    const recipeCards = document.querySelectorAll('#recipeCards .card');
    recipeCards.forEach(card => {
      card.parentElement.style.display = 'block';
    });
  });

  function fetchRecipes(category) {
    fetch(`/api/recipes/category?category=${category}`)
      .then(response => response.json())
      .then(data => {
        const recipeCards = document.getElementById('recipeCards');
        recipeCards.innerHTML = '';
        data.forEach(recipe => {
          const cardHTML = `
            <div class="col-md-4">
              <div class="card">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                <div class="card-body text-center">
                  <h5 class="card-title">${recipe.title}</h5>
                  <button class="btn btn-primary" style="background-color: #99b4c2; color: white;" onclick="location.href='recipe.html?id=${recipe.id}'">View Recipes</button>
                </div>
              </div>
            </div>
          `;
          recipeCards.innerHTML += cardHTML;
        });
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }
  
  