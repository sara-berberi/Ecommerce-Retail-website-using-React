import React, { useState, useEffect } from 'react';
import SingleProduct from './singleProduct.tsx';
import '../styles/ProductGrid.css';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  // Mock API call - replace with actual API call
  return [
    { id: 1, name: 'T-Shirt', image: 'tshirt.jpg', price: 500, description: 'Comfortable cotton T-shirt' },
    { id: 2, name: 'Jeans', image: 'jeans.jpg', price: 1200, description: 'Stylish blue jeans' },
    // Add more products here...
  ];
};

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productList = await fetchProducts();
      setProducts(productList);
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
