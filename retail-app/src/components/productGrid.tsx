import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleProduct from './singleProduct.tsx';
import '../styles/ProductGrid.css'; // Import the CSS file

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: [string]; // Ensure imageUrl is an array of strings
}

const fetchProducts = async (filters: any, sort: string): Promise<Product[]> => {
  try {
    const response = await axios.get('http://localhost:5000/api/products', {
      params: { ...filters, sort }
    });
    return response.data.map((product: any) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.images, // Ensure imageUrl is mapped correctly
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return []; // Handle error gracefully or return empty array
  }
};

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('');
  const [subcategory, setSubcategory] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<string>('popularity');

  const loadProducts = async () => {
    try {
      const filters = {
        category,
        subcategory,
        minPrice,
        maxPrice
      };
      const productList = await fetchProducts(filters, sort);
      console.log('Product List:', productList); // Check if productList contains imageUrl
      setProducts(productList);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [category, subcategory, minPrice, maxPrice, sort]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    setSubcategory(''); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubcategory(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value ? Number(event.target.value) : null;
    setMinPrice(value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value ? Number(event.target.value) : null;
    setMaxPrice(value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  return (
    <div>
      <div className="filters justify-center">
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Select your gender</option>
          <option value="Femra">Femra</option>
          <option value="Meshkuj">Meshkuj</option>
        </select>
        {category && (
          <select value={subcategory} onChange={handleSubcategoryChange}>
            <option value="">All Subcategories</option>
            {category === 'Femra' && (
              <>
                <option value="Bluza">Bluza</option>
                <option value="Pantallona">Pantallona</option>
                <option value="Funde">Funde</option>
                <option value="Fustane">Fustane</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Intimo">Intimo</option>
                <option value="Sport">Sport</option>
                <option value="Kepuce">Kepuce</option>
                <option value="Aksesore">Aksesore</option>
              </>
            )}
            {category === 'Meshkuj' && (
              <>
                <option value="Bluza">Bluza</option>
                <option value="Pantallona">Pantallona</option>
                <option value="Kemisha">Kemisha</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Intimo">Intimo</option>
                <option value="Sport">Sport</option>
                <option value="Kepuce">Kepuce</option>
                <option value="Aksesore">Aksesore</option>
              </>
            )}
            {category === 'Femije' && (
              <>
                <option value="Bluza">Bluza</option>
                <option value="Pantallona">Pantallona</option>
                <option value="Kemisha">Kemisha</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Kepuce">Kepuce</option>
                <option value="Aksesore">Aksesore</option>
              </>
            )}
          </select>
        )}
        <select value={minPrice || ''} onChange={handleMinPriceChange}>
          <option value="">Min Price</option>
          <option value="0">0</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
        <select value={maxPrice || ''} onChange={handleMaxPriceChange}>
          <option value="">Max Price</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
          <option value="2000">2000</option>
        </select>
        <select value={sort} onChange={handleSortChange}>
          <option value="popularity">Popularity</option>
          <option value="lowest">Lowest Price</option>
          <option value="highest">Highest Price</option>
        </select>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
