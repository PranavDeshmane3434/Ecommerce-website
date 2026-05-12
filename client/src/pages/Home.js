import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../components/api";
import Loader from "../components/Loader";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    countInStock: "",
  });

  const location = useLocation();

  const searchKeyword =
    new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchKeyword.trim()) {
      const filtered = products.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchKeyword.toLowerCase())
      );

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchKeyword, products]);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", {
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
      });

      setShowForm(false);

      setForm({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        countInStock: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h1 className="title">Latest Products</h1>

      {/* ADD PRODUCT BUTTON */}
      <button
        className="add-product-btn"
        onClick={() => setShowForm(!showForm)}
      >
        + Add Product
      </button>

      {/* ADD PRODUCT FORM */}
      {showForm && (
        <form className="product-form" onSubmit={addProduct}>
          <h2>Add New Product</h2>

          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            name="countInStock"
            placeholder="Stock"
            type="number"
            value={form.countInStock}
            onChange={handleChange}
          />

          <button type="submit" className="btn">
            Add Product
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="btn cancel"
          >
            Cancel
          </button>
        </form>
      )}

      {/* PRODUCTS */}
      {filteredProducts.length === 0 ? (
        <h2>No Products Found</h2>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="card" key={product._id}>
              <img src={product.image} alt={product.name} />

              <div className="card-body">
                <h3>{product.name}</h3>

<p>{product.description}</p>

<h2>₹{product.price}</h2>

<p className="stock">
  {product.countInStock > 0 ? (
    <span className="in-stock">
      In Stock: {product.countInStock}
    </span>
  ) : (
    <span className="out-stock">Out of Stock</span>
  )}
</p>
                <Link
                  to={`/product/${product._id}`}
                  className="btn"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;