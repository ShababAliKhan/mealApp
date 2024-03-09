const apiKey = "39b7098796b6417aa12bad04807d8231"; // Replace with your actual API key

// Authentication Code

document.addEventListener("DOMContentLoaded", function () {
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("authenticated");

  if (isAuthenticated) {
    // User is authenticated, allow access to main functionality
    // You can put your main functionality code here
    console.log("User is authenticated");

    // Add event listener to logout button
    document
      .getElementById("logoutButton")
      .addEventListener("click", function () {
        logout();
      });
  } else {
    // User is not authenticated, redirect to the login page
    window.location.href = "login.html";
  }
});

function logout() {
  // Clear authentication flag from localStorage
  localStorage.removeItem("authenticated");

  // Redirect to the login page
  window.location.href = "login.html";
}

document
  .getElementById("searchButton")
  .addEventListener("click", searchRecipes);

function searchRecipes() {
  const query = document.getElementById("searchInput").value.trim();
  if (query === "") {
    alert("Please enter a search query.");
    return;
  }

  showLoadingIndicator(); // Show loading indicator before fetching data

  fetch(
    `https://api.spoonacular.com/recipes/search?query=${query}&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      hideLoadingIndicator(); // Hide loading indicator after data is fetched
      displayResults(data.results);
    })
    .catch((error) => {
      hideLoadingIndicator(); // Hide loading indicator in case of error
      console.error("Error fetching recipes:", error);
    });
}

function displayResults(recipes) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";
  if (recipes.length === 0) {
    resultsContainer.innerHTML = `<div class="error">OOPS !!! No recipe found with those ingredients. Try with other ingredients</div>`;
  }

  recipes.forEach((recipe) => {
    recipe.image = "https://spoonacular.com/recipeImages/" + recipe.image;
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>Ready in ${recipe.readyInMinutes} minutes</p>
            <p>Servings: ${recipe.servings}</p>
            <button class="save-button" data-recipe-id="${recipe.id}">Save</button>
            <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
        `;
    resultsContainer.appendChild(recipeCard);

    // Add event listener to save button
    recipeCard.querySelector(".save-button").addEventListener("click", () => {
      saveFavoriteRecipe(recipe);
    });
  });
}

function saveFavoriteRecipe(recipe) {
  let favoriteRecipes =
    JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
  favoriteRecipes.push(recipe);
  localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  alert("Recipe saved to favorites!");
}

function showLoadingIndicator() {
  document.getElementById("loadingContainer").style.display = "block";
}

function hideLoadingIndicator() {
  document.getElementById("loadingContainer").style.display = "none";
}
