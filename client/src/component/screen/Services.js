import React, { useState } from 'react';
import axios from 'axios';
import '../style/Services.css';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Utils';



const Services = () => {
  const id = localStorage.getItem('userId');
  const [formData, setFormData] = useState({
    // userId:'',
    baseScent: '',
    concentration: '',
    size: '',
    packaging: '',
    customization: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const tok = localStorage.getItem('token'); 
  // const id = localStorage.getItem('userId');

//   const Uname = localStorage.getItem('LoggedInUser');



  const baseScentOptions = [
    { value: 'Amber Oud', label: 'Amber Oud', price: 3200 },
    { value: 'Sandalwood & Vetiver', label: 'Sandalwood & Vetiver', price: 4500 },
    { value: 'Rose & Patchouli', label: 'Rose & Patchouli', price: 5150 },
    { value: 'Vanilla & Tonka Bean', label: 'Vanilla & Tonka Bean', price: 5500 },
    { value: 'Bergamot & Myrrh', label: 'Bergamot & Myrrh', price: 6000 },
    { value: 'Jasmine & Sandalwood', label: 'Jasmine & Sandalwood', price: 6370 },
    { value: 'Cedarwood & Frankincense', label: 'Cedarwood & Frankincense', price: 6825 },
    { value: 'Neroli & White Musk', label: 'Neroli & White Musk', price: 8000 },
    { value: 'Blackcurrant & Leather', label: 'Blackcurrant & Leather', price: 10000 }
  ];

  const concentrationOptions = [
    { value: 'parfum', label: 'Parfum (20-30%)', price: 5000 },
    { value: 'eauDeParfum', label: 'Eau de Parfum (15-20%)', price: 3000 },
    { value: 'eauDeToilette', label: 'Eau de Toilette (5-15%)', price: 2000 }
  ];

  const sizeOptions = [
    { value: '30ml', label: '30ml', price: 3000 },
    { value: '50ml', label: '50ml', price: 4500 },
    { value: '100ml', label: '100ml', price: 8500 }
  ];

  const packagingOptions = [
    { value: 'classic', label: 'Classic Bottle', price: 100 },
    { value: 'luxury', label: 'Luxury Crystal Bottle', price: 1250 },
    { value: 'premium', label: 'Premium Gift Box', price: 3500 }
  ];

  const customizationOptions = [
    { value: 'engraving', label: 'Personal Engraving', price: 9800 },
    { value: 'giftWrap', label: 'Luxury Gift Wrapping', price: 5100 },
    { value: 'none', label: 'None', price: 0 }
  ];

  const calculateTotal = (newData) => {
    let total = 0;
    
    const findPrice = (options, value) => {
      const option = options.find(opt => opt.value === value);
      return option ? option.price : 0;
    };

    total += findPrice(baseScentOptions, newData.baseScent);
    total += findPrice(concentrationOptions, newData.concentration);
    total += findPrice(sizeOptions, newData.size);
    total += findPrice(packagingOptions, newData.packaging);
    total += findPrice(customizationOptions, newData.customization);

    return total;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    setTotalPrice(calculateTotal(newData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.userId = id;
    try {
        if(!tok)
        {
            handleError('To Add the product do Login or Signup...!');
            return;
        }
        console.log(formData);
      await axios.post('http://localhost:8000/custom/customperfume', {
        ...formData,
        totalPrice
      },
    {
        headers:
        {
            Authorization :`Bearer ${tok}`,
        },
    });
      handleSuccess('Your custom perfume order has been submitted successfully!');
      setFormData({
        userId:'',
        baseScent: '',
        concentration: '',
        size: '',
        packaging: '',
        customization: ''
      });
      setTotalPrice(0);
    } catch (error) {
      console.error('Error submitting order:', error);
      // handleError('There was an error submitting your order. Please try again.');
    }
  };

  return (
    <div className="services-container">
      {/* <h1>Custom Luxury Perfume Creation</h1> */}
      <div className="services-content">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Base Scent</label>
              <select 
                name="baseScent" 
                value={formData.baseScent} 
                onChange={handleChange}
                required
              >
                <option value="">Select a base scent</option>
                {baseScentOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} (₹{option.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Concentration</label>
              <select 
                name="concentration" 
                value={formData.concentration} 
                onChange={handleChange}
                required
              >
                <option value="">Select concentration</option>
                {concentrationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} (₹{option.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Size</label>
              <select 
                name="size" 
                value={formData.size} 
                onChange={handleChange}
                required
              >
                <option value="">Select size</option>
                {sizeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} (₹{option.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Packaging</label>
              <select 
                name="packaging" 
                value={formData.packaging} 
                onChange={handleChange}
                required
              >
                <option value="">Select packaging</option>
                {packagingOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} (₹{option.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Customization</label>
              <select 
                name="customization" 
                value={formData.customization} 
                onChange={handleChange}
                required
              >
                <option value="">Select customization</option>
                {customizationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} (₹{option.price})
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        <div className="price-summary">
          <h2>Your Selections</h2>
          <div className="selections-summary">
            {formData.baseScent && (
              <p>Base Scent: {baseScentOptions.find(opt => opt.value === formData.baseScent)?.label}</p>
            )}
            {formData.concentration && (
              <p>Concentration: {concentrationOptions.find(opt => opt.value === formData.concentration)?.label}</p>
            )}
            {formData.size && (
              <p>Size: {sizeOptions.find(opt => opt.value === formData.size)?.label}</p>
            )}
            {formData.packaging && (
              <p>Packaging: {packagingOptions.find(opt => opt.value === formData.packaging)?.label}</p>
            )}
            {formData.customization && (
              <p>Customization: {customizationOptions.find(opt => opt.value === formData.customization)?.label}</p>
            )}
          </div>
          <div className="total-price">
            <h3>Total Price: ₹{totalPrice}</h3>
            {tok == null ? (''):(
                <button 
                className="order-button" 
                onClick={handleSubmit}
                disabled={!formData.baseScent || !formData.concentration || !formData.size || !formData.packaging || !formData.customization}
              >
                Place Order
              </button>
            )}
            
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Services;
