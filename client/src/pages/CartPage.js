import { useEffect, useState } from "react";
import API from "../components/api";
import Loader from "../components/Loader";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCheckout, setShowCheckout] =
    useState(false);

  const [toast, setToast] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");

      const validItems = data.filter(
        (item) => item.product
      );

      setCart(validItems);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

const increaseQty = async (item, quantity) => {
  const product = item.product;

  // ❌ INLINE STOCK CHECK
  if (quantity + 1 > product.countInStock) {
    setToast(`Only ${product.countInStock} in stock`);
    setTimeout(() => setToast(""), 2000);
    return;
  }

  await API.put(`/cart/${item._id}`, {
    quantity: quantity + 1,
  });

  fetchCart();
};
  const decreaseQty = async (id, quantity) => {
    if (quantity <= 1) return;

    await API.put(`/cart/${id}`, {
      quantity: quantity - 1,
    });

    fetchCart();
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`);

    fetchCart();
  };

  const total = cart.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Full Name is required";
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter valid 10 digit phone number";
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Invalid email";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode =
        "Enter valid 6 digit pincode";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod =
        "Select payment method";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const placeOrder = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    for (const item of cart) {
      const product = item.product;

      // ❌ CHECK STOCK
      if (item.quantity > product.countInStock) {
        setToast(
          `Only ${product.countInStock} of ${product.name} in stock`
        );

        setTimeout(() => setToast(""), 3000);
        return;
      }

      // 🔻 UPDATE PRODUCT STOCK
      const newStock =
        product.countInStock - item.quantity;

      await API.put(`/products/${product._id}`, {
        ...product,
        countInStock: newStock,
      });

      // 🗑 DELETE IF STOCK IS 0
      if (newStock <= 0) {
        await API.delete(`/products/${product._id}`);
      }

      // 🗑 REMOVE FROM CART
      await API.delete(`/cart/${item._id}`);
    }

    setCart([]);

    setToast("🎉 Order Placed Successfully!");

    setTimeout(() => setToast(""), 3000);

    setShowCheckout(false);
  } catch (error) {
    console.log(error);
  }
};

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h1 className="title">Shopping Cart</h1>

      {toast && <div className="toast">{toast}</div>}

      {cart.length === 0 ? (
        <h2>Cart is Empty</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <img
                src={item.product.image}
                alt={item.product.name}
              />

              <div className="cart-details">
                <h3>{item.product.name}</h3>

                <h2>₹{item.product.price}</h2>

                <div className="qty-controls">
                  <button
                    onClick={() =>
                      decreaseQty(
                        item._id,
                        item.quantity
                      )
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                   onClick={() => increaseQty(item, item.quantity)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h1 className="total">
            Total: ₹{total}
          </h1>

          <button
            className="checkout-btn"
            onClick={() =>
              setShowCheckout(!showCheckout)
            }
          >
            Proceed To Checkout
          </button>

          {showCheckout && (
            <form
              className="checkout-form"
              onSubmit={placeOrder}
            >
              <h2>Delivery Details</h2>

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              <p className="error">
                {errors.fullName}
              </p>

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="error">
                {errors.phone}
              </p>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
              <p className="error">
                {errors.email}
              </p>

              <textarea
                name="address"
                placeholder="Full Address"
                value={formData.address}
                onChange={handleChange}
              />
              <p className="error">
                {errors.address}
              </p>

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <p className="error">
                {errors.city}
              </p>

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
              <p className="error">
                {errors.state}
              </p>

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
              <p className="error">
                {errors.pincode}
              </p>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="">
                  Select Payment Method
                </option>

                <option value="Cash On Delivery">
                  Cash On Delivery
                </option>

                <option value="UPI On Delivery">
                  UPI On Delivery
                </option>
              </select>

              <p className="error">
                {errors.paymentMethod}
              </p>

              <button
                type="submit"
                className="place-order-btn"
              >
                Place Order
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default CartPage;