// cartContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ApiConfig from "../apiConfig/ApiConfig";
import { apiRequestHandler } from "../apiConfig/service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null); // 👤 user info
  const [loadingUser, setLoadingUser] = useState(true);

  // 🛒 Add item
  const addToCart = (item) => {
    const isExisting = cartItems.some(
      (cartItem) =>
        cartItem.name === item.name &&
        cartItem.category === item.category &&
        cartItem.price === item.price
    );

    if (isExisting) return false;

    setCartItems((prevItems) => [
      ...prevItems,
      { ...item, id: uuidv4(), quantity: 1 },
    ]);
    return true;
  };

  // 🗑 Remove item
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 👤 Fetch user
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoadingUser(false);
      return;
    }

    try {
      const res = await apiRequestHandler({
        method: "GET",
        endPoint: ApiConfig.getProfile,
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res)
      if (res?.success) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("User profile fetch error:", error);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  // 🔁 Load user on first mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        user,
        loadingUser,
        refreshUser: fetchUserProfile,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Still exported as useCart
export const useCart = () => useContext(CartContext);
