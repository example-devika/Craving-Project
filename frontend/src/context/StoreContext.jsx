import React, { createContext, useEffect, useState } from "react";
import axios from"axios"
import { food_list } from "../assets/assets";
import Loginpopup from "../components/Loginpopup/Loginpopup";
export const StoreContext = createContext(null);
export const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    const isLoggedIn = !!localStorage.getItem("token");
    if(!isLoggedIn){
      alert("Please login to add items to your cart");
    navigate("/login");
    }
    // if (!cartItems[itemId]) {
    //   setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    // } else {
    //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    // }
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };
  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     //item=key
  //     if (cartItems[item] > 0) {
  //       let itemInfo = food_list.find((product) => product._id.toString() === item.toString());

  //       console.log(itemInfo)
  //       totalAmount += itemInfo.price * cartItems[item];
  //     }
  //   }
  //   return totalAmount;
  // };
  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = food_list.find((product) => product._id.toString() === item.toString());
  //       if (itemInfo) {
  //         totalAmount += itemInfo.price * cartItems[item];
  //       }
  //     }
  //   }
  //   return totalAmount;
  // };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
  
    if (!food_list || food_list.length === 0) return 0;
  
    Object.keys(cartItems).forEach((itemId) => {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        const itemInfo = food_list.find(
          (product) => product._id.toString() === itemId.toString()
        );
        if (itemInfo && itemInfo.price) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    });
  
    return totalAmount;
  };
  
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  console.log(response.data)
  };
  
  //     useEffect(()=>{
  // console.log(cartItems)
  //     },[cartItems])
  
  const loadCartData=async (token)=>{
    const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData)
  }
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
  
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData()
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
