import React from 'react'
import "./Sidebar.css"
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to="/add" className="sidebar-option">
                <img src="/add.png" alt="add" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to="/list" className="sidebar-option">
                <img src="/list.png" alt="list" />
                <p>List Items</p>
            </NavLink> <NavLink to="/orders" className="sidebar-option">
                <img src="/list.png" alt="order" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
