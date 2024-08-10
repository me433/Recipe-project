import Canvas from './app/Canvas'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import RecipeBook from './app/RecipeBook';
import AddRecipe from './app/AddRecipe';
import Profile from './app/Profile';
import Missing from './app/Missing';


interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  labels: string[];
  pdf: string;
}

function App() {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
   
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Canvas />} >
          <Route index element={<RecipeBook setRecipeList={setRecipeList} recipeList={recipeList} />} />
          <Route path='recept-toevoegen' element={<AddRecipe setRecipeList={setRecipeList} recipeList={recipeList} />} />
          <Route path="profiel" element={<Profile />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
