import React from "react";

const Nav = ({ activeTab, onTabChange, setSearchTerm }) => {
  const itemClass = (tabName) =>
    `App-nav-item ${activeTab === tabName ? "selected" : ""}`;

  const inputClass = (tabName) =>
    `App-nav-input ${activeTab !== tabName ? "selected" : ""}`;
  return (
    <nav className="App-nav">
      <ul>
        <li className={itemClass("items")}>
          <button onClick={() => onTabChange("items")}>Items</button>
        </li>
        <li className={itemClass("cart")}>
          <button onClick={() => onTabChange("cart")}>Cart</button>
        </li>
        <li className={inputClass("items")}>
          Buscar <input type="text" onChange={e=>{setSearchTerm(e.target.value)}} />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
