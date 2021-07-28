import React, { useState } from "react";
import Nav from "./Nav";
import "./App.css";
import ItemPage from "./ItemPage";
import { items } from "./static-data";
import CartPage from "./CartPage";

const App = () => {
  const [activeTab, setActiveTab] = useState("items");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const summarizeCart = (cart) => {
    console.log('En este cart acontinuación el mete todos los productos, hasta los repetidos.')
    console.log('Cada vez que aprieto el boton.')
    console.log('Esto es cart: ',cart)
    const groupedItems = cart.reduce((summary, item) => {
      console.log('Esto es summary de reduce: ',summary)
      /* Si ya existe un sumary[item.id] lo que hace es acumular count de ese mismo que ya existe  */
      /* En otras palabras sumary[id] siempre es uno solo pero con el count acumulado */
      /* sumary SIEMPRE ES ALGO la primera vez es {...item, count: 0,} */
      console.log('Esto es item de reduce: ',item)
      console.log('Esto es item.id', item.id)
      /* Esto no es una creación de variable */
      /* Ese [item.id] es para crear un control y saber cuando
      acumular o cuando crear */
      summary[item.id] = summary[item.id]  || {...item, count: 0, total:0};
      console.log('summary[item.id] antes del count++:', summary[item.id])
      summary[item.id].count++;
      summary[item.id].total=summary[item.id].count*summary[item.id].price;
     /*  let total = summary.total++ */
      /* summary + item */
      console.log('Item despues de reduce:', item)
      console.log('summary[item.id]:', summary[item.id])
      console.log('summary Final:', summary)

      
      /* console.log('TOTAL: ', total) */
      /* console.log("allproducts: ", allprices);) */
      return summary;

    }, {});
    
   /* Los objetos no son iterables por eso te da error 
      tuve que transformarlo a array */

   /* const newArray= Object.values(groupedItems);

   const newTotal = newArray.reduce((a,b)=> Number(a) + Number(b.total),[])
   console.log('newArray: ',newArray)
   console.log('newTotal: ',newTotal) */
    
   return Object.values(groupedItems)


    
  };
  
  console.log('summarizeCart: ', summarizeCart(cart));
  const newArray= Object.values(summarizeCart(cart));
  console.log('The new Array: ', newArray)
  const newTotal = newArray.reduce((a,b)=> Number(a) + Number(b.total),[])
  console.log('The newTotal: ', newTotal)

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

  /* Esto va en return  <div>{cart.length} items</div>
   */

  return (
    <div className="App">
      <Nav activeTab={activeTab} onTabChange={setActiveTab} />
      <div>{cart.length} Artículos -- Total {newTotal}</div>
      <main className="App-content">
        <Content
          tab={activeTab}
          onAddToCart={addToCart}
          onRemoveItem={removeItem}
          cart={summarizeCart(cart)}
        />
      </main>
    </div>
  );
};

const Content = ({ tab, onAddToCart, onRemoveItem, cart }) => {
  switch (tab) {
    default:
    case "items":
      return <ItemPage items={items} onAddToCart={onAddToCart} />;
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
