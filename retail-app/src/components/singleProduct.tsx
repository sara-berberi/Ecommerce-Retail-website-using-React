import React from 'react';
import '../styles/singleProduct.css';
const BagIcon = require('../assets/Bag.png'); 

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
          <img src="https://cdn.shopify.com/s/files/1/1859/8979/files/image17_3cfc7cfb-8215-40b7-a297-db7285d5375b.png?v=1610384290" alt="Default Product Image" />
        )}
      </div>
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price"> {product.price} ALL</p>
        <p className="product-description">{product.description}</p>
        {/* <button className="add-to-cart">Add to Cart</button> */}
      </div>
      <img src={BagIcon} alt="Add to Cart" className="add-to-cart-icon" />

    </div>
  );
};

export default SingleProduct;
