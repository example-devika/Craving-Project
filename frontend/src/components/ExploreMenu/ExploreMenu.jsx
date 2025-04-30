import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div>
      <div className="explore-menu" id="explore-menu">
        <h1>Explore Our Menu</h1>
        <p className="explore-menu-text">
          Choose from a diverse menu with group of dishes,snacks,dinner
          items,tiffins,Non-veg,veg
        </p>
        <p className="category">{category}</p>

        <div className="explore-menu-list">
          {menu_list.map((item, index) => {
            return(
            <div key={index} className="explore-menu-list-item" onClick={()=>setCategory(prev=>prev===item.menu_name?'Everything':item.menu_name)}>
              <img src={item.menu_image} alt="image" className={category===item.menu_name?"active":""}/>
              <p>{item.menu_name}</p>
            </div>)
          })}
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default ExploreMenu;
