
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from './components/Dashboard';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import AddProductForm from './components/AddProductForm';
function App() {
  return (
    <>
      <BrowserRouter>
      <div className="flex flex-col h-screen">
      <Routes>
        <Route path="/" element={<Header />}>
            <Route index path="/" element={<HomePage  />}/>
            <Route path="/aboutUs" element={<AboutUs />} />

            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/addProduct" element={<AddProductForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<SignUp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

        
      </div>
      </BrowserRouter>
      
    </>
    
  );
}

export default App;
