import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../components/api";
import Loader from "../components/Loader";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      await API.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      alert("Added To Cart");
      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="detail-page">
      <div className="detail-card">
        <img src={product.image} alt={product.name} />

        <div className="detail-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h2>₹{product.price}</h2>

          <button className="btn" onClick={addToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;