import React from 'react';
import TopBar from '../components/topBarFirstpage.tsx';
import Slideshow from '../components/slideshow.tsx';
import TopCategories from '../components/topCategories.tsx';

const App: React.FC = () => {
  return (
    <div className="main-page">
        <div className='top-bar'>
        <TopBar />
        </div>
        <div className = 'slideshow mt-3 mb-3'>
        <Slideshow />
        </div>
        <div className='suggestedCateg mt-5 mb-3' >
        <TopCategories/>
        </div>
    </div>
  );
};

export default App;
