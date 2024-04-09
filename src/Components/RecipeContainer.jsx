/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

function RecipeContainer({ recipe, editMode, onEdit, onSave, onDelete }) {
  const [editedRecipe, setEditedRecipe] = useState({ ...recipe });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(editedRecipe);
  };

  return (
    <>
      <div className="recipe-container">
        <div className="recipe">
          <h2>{recipe.title}</h2>
          {editMode ? (
            <div>
              <input
                type="text"
                name="title"
                value={editedRecipe.title}
                onChange={handleChange}
              />
              <textarea
                name="description"
                value={editedRecipe.description}
                onChange={handleChange}
              />
              <textarea
                name="ingredients"
                value={editedRecipe.ingredients}
                onChange={handleChange}
              />
              <textarea
                name="directions"
                value={editedRecipe.directions}
                onChange={handleChange}
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <>
              <p>
                <strong>Description:</strong> {recipe.description}
              </p>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p>
                <strong>Directions:</strong> {recipe.directions}
              </p>
            </>
          )}
          <img
            src={recipe.photoUrl}
            alt={recipe.title}
            width={300}
            height={300}
          />
          {editMode ? null : (
            <div>
              <button onClick={() => onEdit(recipe.id)}>Edit</button>
              <button onClick={() => onDelete(recipe.id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RecipeContainer;
