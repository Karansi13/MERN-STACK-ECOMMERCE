import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard.js"
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useSelector,useDispatch } from "react-redux"
import Loader from "../layout/Loader/loader.js";
import { useAlert } from "react-alert";

const Home = () => {

  const alert = useAlert()
  const dispatch = useDispatch();
  const { loading , error, products, productsCount } = useSelector(
  (state) => state.products 
);
  useEffect(() =>  {
    if(error) {
       alert.error(error)
       dispatch(clearErrors())
    }
    dispatch(getProduct())
  },[dispatch],error)

  return (
        <Fragment>
          {loading ? (
            <Loader/>
          ) : (
            <Fragment>
          <MetaData title="Ecommerce"/>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse/>
              </button>
            </a>
          </div>

          
          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products && products.map((product) => (<Product product={product} /> ))}
          </div>
    </Fragment>
          )}
        </Fragment>
  );
};

export default Home;