import React from 'react';
import '../styles/singleProduct.css';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface Props {
  product: Product;
}

const SingleProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">₹ {product.price}</p>
        <p className="product-description">{product.description}</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;
