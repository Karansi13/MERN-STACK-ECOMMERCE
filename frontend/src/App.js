import './App.css';
import Header from "./components/layout/Header/Header.js"
import{ BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WebFont from "webfontloader"
import React from 'react';
import Footer from './components/layout/Footer/Footer.js'
import Home from './components/Home/Home.js';
import ProductDetails from "./components/Product/ProductDetails.js"

function App() {
React.useEffect(() => {

  WebFont.load({
    google:{
      families:["Roboto", "Droid Sans", "Chilanka"]
    }
  })
},[])

  return (
    <Router>

      <Header/>

    <Routes>

    <Route exact path='/' element={<Home/>} />
    <Route exact path='/product/:id' element={<ProductDetails/>} />

    </Routes>

      <Footer/>

    </Router>
  );
}

export default App;
