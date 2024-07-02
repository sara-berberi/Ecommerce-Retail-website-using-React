// AddProductForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/addProductForm.css'; // Import CSS file


interface FormData {
    name: string;
    price: number;
    category: string;
    brand: string;
    description: string;
    images: (File | string)[]; // Updated images type to accept File objects or strings (URLs)
    genderCategory: string;
  }
  
  const AddProductForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
      name: '',
      price: 0,
      category: '',
      brand: '',
      description: '',
      images: [],
      genderCategory: ''
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const imagesArray = Array.from(files).map(file => URL.createObjectURL(file));
        setFormData(prevState => ({
          ...prevState,
          images: [...prevState.images, ...imagesArray]
        }));
      }
    };
  
    const handleImageUrlAdd = () => {
      const imageUrl = prompt('Please enter the image URL:');
      if (imageUrl) {
        setFormData(prevState => ({
          ...prevState,
          images: [...prevState.images, imageUrl]
        }));
      }
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/add-product', formData);
        console.log('Product added:', response.data);
        // Optionally reset form fields after successful submission
        setFormData({
          name: '',
          price: 0,
          category: '',
          brand: '',
          description: '',
          images: [],
          genderCategory: ''
        });
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };
  
    return (
      <div className="container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" required />
          </div>
          <div className="form-group">
            <label className="label">Price:</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="input-field" required />
          </div>
          <div className="form-group">
            <label className="label">Gender Category:</label>
            <select name="genderCategory" value={formData.genderCategory} onChange={handleChange} className="select-field" required>
              <option value="">Select Gender Category</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Category:</label>
            <select name="category" value={formData.category} onChange={handleChange} className="select-field" required>
              <option value="">Select Category</option>
              {formData.genderCategory === 'female' && (
                <>
                  <option value="female-category1">Female Category 1</option>
                  <option value="female-category2">Female Category 2</option>
                </>
              )}
              {formData.genderCategory === 'male' && (
                <>
                  <option value="male-category1">Male Category 1</option>
                  <option value="male-category2">Male Category 2</option>
                </>
              )}
              {formData.genderCategory === 'kids' && (
                <>
                  <option value="kids-category1">Kids Category 1</option>
                  <option value="kids-category2">Kids Category 2</option>
                </>
              )}
            </select>
          </div>
          <div className="form-group">
            <label className="label">Brand:</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="input-field" required />
          </div>
          <div className="form-group">
            <label className="label">Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="textarea-field"></textarea>
          </div>
          <div className="form-group">
            <label className="label">Images:</label>
            <div>
              <input type="file" multiple onChange={handleImageChange} className="file-input" />
              <button type="button" onClick={handleImageUrlAdd} className="add-url-button">Add Image URL</button>
            </div>
          </div>
          <button type="submit" className="btn-submit">Add Product</button>
        </form>
        {formData.images && formData.images.length > 0 && (
          <div className="images-preview">
            {formData.images.map((image, index) => (
              <div key={index} className="image-container">
                {typeof image === 'string' ? (
                  <img src={image} alt={`Product Image ${index + 1}`} className="image-preview" />
                ) : (
                  <img src={URL.createObjectURL(image)} alt={`Product Image ${index + 1}`} className="image-preview" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default AddProductForm;