import Canvas from './app/Canvas'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeBook from './app/RecipeBook';
import AddRecipe from './app/AddRecipe';
import Profile from './app/Profile';
import Missing from './app/Missing';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Canvas />} >
          <Route index element={<RecipeBook />} />
          <Route path='recept-toevoegen' element={<AddRecipe />} />
          <Route path="profiel" element={<Profile />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
