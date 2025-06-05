function navigateToCategory(category) {
  // Navigate to categories.html with a query parameter
  window.location.href = `categories.html?category=${encodeURIComponent(category)}`;
}

  
  function navigateToType(type) {
    window.location.href = type + '.html';
  }
  
  function performSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (query) {
      window.location.href = `searchResults.html?query=${encodeURIComponent(query)}`;
    } else {
      alert("Please enter a search term.");
    }
  }
  
  // Add "active" class to the current page link
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});


  
