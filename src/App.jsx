import React, { useState } from "react";
import Nav from "./Nav";
import "./App.css";
import ItemPage from "./ItemPage";
import { items } from "./static-data";
import CartPage from "./CartPage";

const App = () => {
  const [activeTab, setActiveTab] = useState("items");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const summarizeCart = (cart) => {
    const groupedItems = cart.reduce((summary, item) => {
      summary[item.id] = summary[item.id]  || {...item, count: 0, total:0};
      console.log('summary[item.id] antes del count++:', summary[item.id])
      summary[item.id].count++;
      summary[item.id].total=summary[item.id].count*summary[item.id].price;
    
      return summary;

    }, {});
    
   return Object.values(groupedItems)
   
  };
  
 
  const newArray= Object.values(summarizeCart(cart));
  const newTotal = newArray.reduce((a,b)=> Number(a) + Number(b.total),[])

  const removeItem = (item) => {
    let index = cart.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      setCart((cart) => {
        const copy = [...cart];
        copy.splice(index, 1);
        return copy;
      });
    }
  };

  return (
    <div className="App">
      
      <Nav activeTab={activeTab} onTabChange={setActiveTab} setSearchTerm={setSearchTerm}/>
      <div>{cart.length} Artículos -- Total {newTotal}</div>
      <main className="App-content">
        <Content
          tab={activeTab}
          onAddToCart={addToCart}
          onRemoveItem={removeItem}
          cart={summarizeCart(cart)}
          searchTerm={searchTerm}
        />
      </main>
    </div>
  );
};

const Content = ({ tab, onAddToCart, onRemoveItem, cart,searchTerm }) => {
  switch (tab) {
    default:
    case "items":
      return <ItemPage items={items} onAddToCart={onAddToCart} searchTerm={searchTerm}/>;
    case "cart":
      return (
        <CartPage
          items={cart}
          onAddOne={onAddToCart}
          onRemoveOne={onRemoveItem}
        />
      );
  }
};

export default App;
