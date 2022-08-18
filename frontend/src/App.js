import './App.css';
import NavBar from './Components/NavBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './Components/HomePage'
import ProductsPage from './Components/ProductsPage';
function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Products' element={<ProductsPage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
