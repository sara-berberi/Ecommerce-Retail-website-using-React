import * as React from "react";
import '../styles/TopCategories.css';


function TopCategories() {
    return (
      <div className="top-categories">
        <div className="categories-container">
          <div className="category">
            <div className="image-placeholder" />
            <div className="category-title">FUSTANE</div>
          </div>
          <div className="category">
            <div className="image-placeholder" />
            <div className="category-title">SPORT</div>
          </div>
          <div className="category">
            <div className="image-placeholder" />
            <div className="category-title">SEZONALE</div>
          </div>
          <div className="category">
            <div className="image-placeholder" />
            <div className="category-title">PANTALLONA</div>
          </div>
        </div>
        <div className="view-all-button">
          Shiko te gjitha
        </div>
      </div>
    );
  }
  
  export default TopCategories;