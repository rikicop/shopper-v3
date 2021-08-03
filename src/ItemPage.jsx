/* import React,{useState} from "react"; */
import PropTypes from "prop-types";
import "./ItemPage.css";
import Item from "./Item";


function ItemPage({ items, onAddToCart,searchTerm }) {
 
  return (
    <div className="Buscador">

    <ul className="ItemPage-items">
      {items.filter((val)=> 
          (searchTerm === "" || val.name.toLowerCase().includes(searchTerm.toLowerCase()))    
      ).map((item) => (
        <li key={item.id} className="ItemPage-item">
          <Item item={item}>
            <button className="Item-addToCart" onClick={() => onAddToCart(item)} >
              Add to Cart
            </button>
          </Item>
        </li>
      ))}
    </ul>
    </div>
  );
}

ItemPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
export default ItemPage;
