import { createContext, useState } from 'react';

export const AppContext = createContext({
  products: [],
  cart: [],
  addToCart: () => {},
});


export const AppProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
  
    const addToCart = (product) => {
      setCart((prevCart) => [...prevCart, product]);
    };

    return (
        <AppContext.Provider value={{ products, cart, addToCart }}>
          {children}
        </AppContext.Provider>
      );
    };