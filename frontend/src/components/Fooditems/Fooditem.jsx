import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Fooditem.css";
import { counter } from "@fortawesome/fontawesome-svg-core";
import { StoreContext } from "../../context/StoreContext";

const Fooditem = ({ id, name, desc, image, price }) => {
  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext)
  return (
    <div className="food_item" id="food_item">
      <div className="food-item-img-container">
        <img src={url+"/images/"+image} alt="" className="food-item-image" />
        <div className="food-item-count">
        {!cartItems?.[id] ? (
          <button className="Add" onClick={() =>addToCart(id)}>
            Add
          </button>
        ) : (
          <div className="food-item-counter">
            <button className="remove btn" onClick={()=>removeFromCart(id)}>-</button>
            <p className="count">{cartItems[id]}</p>
            <button className="add btn" onClick={() => addToCart(id)}>+</button>
          </div>
        )}
        </div>
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating} alt="rating" />
        </div>
        <p className="food-item-desc">
      {desc}
        </p>
        <p className="food-item-price">
          <span>$</span>
          {price}
        </p>
      </div>
    </div>
  );
};

export default Fooditem;
