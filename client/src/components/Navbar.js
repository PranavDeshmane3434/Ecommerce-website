import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/?search=${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          MERN Shop
        </Link>

        <form className="search-form" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button type="submit">
            <FaSearch />
          </button>
        </form>

        <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;