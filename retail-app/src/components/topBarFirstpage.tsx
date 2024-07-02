import * as React from "react";
import '../styles/topBar.css';
const UserIcon = require('../assets/User_alt.png');
const FavoriteIcon = require('../assets/Favorite.png');
const OrdersIcon = require('../assets/Bag.png');
const LeftBar = require('../assets/LeftBar.png');

function TopBar() {
  const [activeCategory, setActiveCategory] = React.useState("");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeSidebarCategory, setActiveSidebarCategory] = React.useState("");

  const handleCategoryClick = (category) => {
    if (activeCategory !== category) {
      setActiveCategory(category);
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarCategoryClick = (category) => {
    setActiveSidebarCategory(category);
  };

  const categories = [
    { id: 'categories', label: 'Kategorite' },
    { id: 'kontakt', label: 'Kontakt' },
    // Add more categories as needed
  ];

  const sidebarCategories = {
    Femra: ["Bluza", "Pantallona","Funde", "Fustane", "Outerwear", "Intimo" , "Sport", "Kepuce", "Aksesore"],
    Meshkuj:["Bluza", "Pantallona","Kemisha", "Outerwear", "Intimo" , "Sport", "Kepuce", "Aksesore"],
    Femije: ["Bluza", "Pantallona","Kemisha", "Outerwear", "Kepuce", "Aksesore"],
  };

  return (
    <>
      <header>
        <a href="#" className="logo" onClick={handleSidebarToggle}>
          <img src={LeftBar} alt="Logo" />
          <span className="ml-5">My Shop</span>
        </a>

        <ul className={`navbarr ${menuOpen ? 'open' : ''}`}>
          {categories.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                className={activeCategory === category.id ? 'active' : ''}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mainn">
          <div className="icons">
            <img loading="lazy" src={UserIcon} className="icon" />
            <img loading="lazy" src={FavoriteIcon} className="icon" />
            <img loading="lazy" src={OrdersIcon} className="icon" />
          </div>
        </div>
      </header>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>Kategorite</h2>
        {Object.entries(sidebarCategories).map(([category, subcategories]) => (
          <div key={category} className="category">
            <h3 
              className={activeSidebarCategory === category ? 'active' : ''}
              onClick={() => handleSidebarCategoryClick(category)}
            >
              {category}
            </h3>
            <ul>
              {subcategories.map((subcategory) => (
                <li key={subcategory}>{subcategory}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {sidebarOpen && <div className="overlay" onClick={handleSidebarToggle}></div>}
    </>
  );
}

export default TopBar;
