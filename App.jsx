import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {

  const { cart } = useContext(CartContext);

  const [token, setToken] = useState("");
  const [history, setHistory] = useState([]);

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  useEffect(() => {

    const savedToken =
      localStorage.getItem("canteenToken");

    const savedHistory =
      JSON.parse(
        localStorage.getItem("canteenHistory")
      ) || [];

    if (savedToken)
      setToken(savedToken);

    setHistory(savedHistory);

  }, []);

  const generateToken = () => {

    if(cart.length === 0){
      alert("Add food items first!");
      return;
    }

    const tokenNumber =
      "CB" +
      Math.floor(
        100 + Math.random() * 900
      );

    setToken(tokenNumber);

    localStorage.setItem(
      "canteenToken",
      tokenNumber
    );

    const order = {
      token: tokenNumber,
      total,
      date: new Date().toLocaleString()
    };

    const updatedHistory = [
      order,
      ...history
    ];

    setHistory(updatedHistory);

    localStorage.setItem(
      "canteenHistory",
      JSON.stringify(updatedHistory)
    );

    alert(
      `Token Generated Successfully: ${tokenNumber}`
    );
  };

  return (
    <div className="cart">

      <h2>Your Order</h2>

      <div className="cart-items">

        {cart.length === 0 ? (
          <p className="empty-cart">
            No items added
          </p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="cart-item"
            >
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))
        )}

      </div>

      <div className="cart-total">
        Total ₹{total}
      </div>

      {token && (
        <div className="token-card">

          <h3>Current Token</h3>

          <h1>{token}</h1>

        </div>
      )}

      <button
        className="checkout-btn"
        onClick={generateToken}
      >
        Generate Token
      </button>

      <div className="history-box">

        <h3>Order History</h3>

        {history.length === 0 ? (
          <p>No Orders Yet</p>
        ) : (
          history.map((item,index) => (
            <div
              key={index}
              className="history-item"
            >
              <strong>
                {item.token}
              </strong>

              <p>
                ₹{item.total}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Cart;
