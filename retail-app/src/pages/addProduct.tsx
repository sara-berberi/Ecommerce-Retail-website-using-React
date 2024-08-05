import React, { useState } from 'react';
import axios from 'axios';
import '../styles/addProductForm.css'; // Import CSS file

interface FormData {
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  images: File[];
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
      setFormData(prevState => ({
        ...prevState,
        images: [...prevState.images, ...Array.from(files)]
      }));
    }
  };

  const handleImageUrlAdd = () => {
    const imageUrl = prompt('Please enter the image URL:');
    if (imageUrl) {
      // For simplicity, you can handle URLs separately if needed
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
  
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price.toString());
    formDataToSend.append('category', formData.category);
    formDataToSend.append('brand', formData.brand);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('genderCategory', formData.genderCategory);
  
    formData.images.forEach((image) => {
      formDataToSend.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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
                <option value="BLUZA">Bluza</option>
                <option value="PANTALLONA">Pantallona</option>
                <option value="FUNDE">Funde</option>
                <option value="FUSTANE">Fustane</option>
                <option value="XHAKETA">Xhaketa</option>
                <option value="INTIMO">Intimo</option>
                <option value="SPORTIVE">Sportive</option>
                <option value="KEPUCE">Kepuce</option>
                <option value="AKSESORE">Aksesore</option>
              </>
            )}
            {formData.genderCategory === 'male' && (
              <>
                <option value="BLUZA">Bluza</option>
                <option value="PANTALLONA">Pantallona</option>
                <option value="XHAKETA">Xhaketa</option>
                <option value="INTIMO">Intimo</option>
                <option value="SPORTIVE">Sportive</option>
                <option value="KEPUCE">Kepuce</option>
                <option value="AKSESORE">Aksesore</option>
              </>
            )}
            {formData.genderCategory === 'kids' && (
              <>
                <option value="BLUZA">Bluza</option>
                <option value="PANTALLONA">Pantallona</option>
                <option value="FUNDE">Funde</option>
                <option value="FUSTANE">Fustane</option>
                <option value="XHAKETA">Xhaketa</option>
                <option value="INTIMO">Intimo</option>
                <option value="SPORTIVE">Sportive</option>
                <option value="KEPUCE">Kepuce</option>
                <option value="AKSESORE">Aksesore</option>
              </>
            )}
          </select>
        </div>
        <div className="form-group">
          <label className="label">Brand:</label>
          <select name="brand" value={formData.brand} onChange={handleChange} className="input-field" required>
            <option value="">Select Brand</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">PUMA</option>
            <option value="Under Armour">Under Armour</option>
            <option value="Loavies">Loavies</option>
            <option value="Simmi London">Simmi London</option>
            <option value="Nike">Nike</option>
            <option value="H&M">H&M</option>
            <option value="Mango">Mango</option>
            <option value="Zara">Zara</option>
            <option value="NA-KD">NA-KD</option>
            <option value="Tally Weijl">Tally Weijl</option>
            <option value="LeGer">LeGer</option>
          </select>
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
      {formData.images.length > 0 && (
        <div className="images-preview">
          {formData.images.map((image, index) => (
            <div key={index} className="image-container">
              <img src={URL.createObjectURL(image)} alt={`Product Image ${index + 1}`} className="image-preview" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 

export default AddProductForm;
