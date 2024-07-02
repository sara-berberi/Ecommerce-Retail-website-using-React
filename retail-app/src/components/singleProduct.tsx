import React from 'react';
import '../styles/singleProduct.css';

interface Product {
  id: string;
  name: string;
  images?: string[]; // Optional array of image URLs
  price: number;
  description: string;
}

interface Props {
  product: Product;
}

const SingleProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-images">
        {product.images && product.images.length > 0 ? (
          product.images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`${product.name} Image ${index}`} />
          ))
        ) : (
          <img src="default-image-url.jpg" alt="Default Product Image" />
        )}
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
