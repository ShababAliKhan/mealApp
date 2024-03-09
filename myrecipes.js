document.addEventListener("DOMContentLoaded", function () {
  displaySavedRecipes();
});

function displaySavedRecipes() {
  const myRecipesContainer = document.getElementById("myRecipes");
  myRecipesContainer.innerHTML = "";

  let favoriteRecipes =
    JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
  if (favoriteRecipes.length === 0) {
    myRecipesContainer.innerHTML = "<p>No saved recipes found.</p>";
  } else {
    favoriteRecipes.forEach((recipe) => {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");
      recipeCard.innerHTML = `
          <h2>${recipe.title}</h2>
          <img src="${recipe.image}" alt="${recipe.title}">
          <p>Ready in ${recipe.readyInMinutes} minutes</p>
          <p>Servings: ${recipe.servings}</p>
          <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
        `;
      myRecipesContainer.appendChild(recipeCard);
    });
  }
}
