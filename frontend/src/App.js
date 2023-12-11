import './App.css';
import Header from "./components/layout/Header/Header.js"
import {Route, BrowserRouter as Routes} from "react-router-dom"
import WebFont from "webfontloader"
import React from 'react';
import Footer from './components/layout/Footer/Footer.js'
import Home from './components/Home/Home.js';

function App() {
React.useEffect(() => {

  WebFont.load({
    google:{
      families:["Roboto", "Droid Sans", "Chilanka"]
    }
  })
},[])

  return (
    <Routes>
      <Header/>
      <Home/>
    {/* <Route exact path='/' element={Home} /> */}
    <Footer/>
    </Routes>
  );
}

export default App;
