// productGrid.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleProduct from './singleProduct.tsx';
import '../styles/ProductGrid.css';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: [String]; // Updated to include imageUrl
}

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    return response.data.map((product: any) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl, // Ensure imageUrl is mapped correctly
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return []; // Handle error gracefully or return empty array
  }
};



const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productList = await fetchProducts();
        console.log('Product List:', productList); // Check if productList contains imageUrl
        setProducts(productList);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    loadProducts();
  }, []);
  
  return (
    <div className="product-grid">
      {products.map((product) => (
        <SingleProduct key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
