import React from 'react';
import '../style/newArrivals.css'; // Import the CSS file
import newArrivalsData from '../../Data/newArrivalsData'; // Your new arrivals data
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import intro from "../img/NewArrivalsintro.mp4";

const NewArrivals = () => {

  const tok = localStorage.getItem('token');

  return (
    <div className="new-arrivals-container">
      {/* Video section */}
      <div className="video-section">
        <video className="background-video" autoPlay loop muted>
          <source src={intro} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      {/* Product Cards section */}
      <div className="arrivals-content">
        {newArrivalsData.map((product, index) => (
          <div key={product.id} className={`arrival-card`}>
            {index % 2 === 0 ? (
              <>
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  {tok==null?'':
                  <button className="cart-icon-button">
                    <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                  </button>
                  }
                </div>
              </>
            ) : (
              <>
                <div className="product-details">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  {tok==null?'':
                  <button className="cart-icon-button">
                    <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                  </button>
                  }
                </div>
                <img src={product.image} alt={product.name} className="product-image" />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
