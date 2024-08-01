import React from 'react';
import TopBar from '../components/topBarFirstpage.tsx';
import Slideshow from '../components/slideshow.tsx';
import TopCategories from '../components/topCategories.tsx';
import ProductGrid from '../components/productGrid.tsx';

const ProductListings: React.FC = () => {
  return (
    <div className="main-page">
        <div className='top-bar mb-3'>
        <TopBar />
        </div>
        {/* <div className = 'slideshow mt-3 mb-3'>
        <Slideshow />
        </div> */}
        <div className='productListings mt-16 pt-10' >
            <ProductGrid/>
        </div>
        {/* <div className='suggestedCateg mt-5 mb-3' >
        <TopCategories/>
        </div> */}
    </div>
  );
};

export default  ProductListings;
