document.getElementById("recipeForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const image = document.getElementById("image").value;

    // Construct data object to send to the server
    const recipeData = { title, category, ingredients, instructions, image };

    // Send data to the server using Fetch API
    try {
        const response = await fetch("/submit-recipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipeData),
        });

        if (response.ok) {
            alert("Recipe submitted successfully!");
            document.getElementById("recipeForm").reset();
        } else {
            alert("Failed to submit recipe.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});

// Add "active" class to the current page link
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });