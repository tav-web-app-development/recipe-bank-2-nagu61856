import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import RecipeContainer from "./Components/RecipeContainer";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editMode, setEditMode] = useState(null); // State to track which recipe is in edit mode
  const [editedRecipe, setEditedRecipe] = useState(null); // State to store the edited recipe

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch recipes from API
  const fetchRecipes = async () => {
    try {
      const response = await fetch("https://api.sampleapis.com/recipes/recipes");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Function to handle editing of recipe
  const handleEdit = (recipeId) => {
    setEditMode(recipeId);
    const recipeToEdit = recipes.find(recipe => recipe.id === recipeId);
    setEditedRecipe({...recipeToEdit});
  };

  // Function to save edited recipe
  const handleSave = () => {
    // Perform save operation, e.g., update database
    setEditMode(null); // Exit edit mode
    setEditedRecipe(null); // Clear edited recipe
    // Here you can send the editedRecipe to the backend to update the database
  };

  // Function to delete recipe
  const handleDelete = (recipeId) => {
    // Perform delete operation, e.g., delete from database
    const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
  };

  // Function to scroll to the end of the page
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Navbar scrollToBottom={scrollToBottom} />
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeContainer
            key={recipe.id}
            recipe={recipe}
            editMode={editMode === recipe.id}
            editedRecipe={editedRecipe}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default App;
