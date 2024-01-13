import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from './api-services';
import { enqueueSnackbar } from 'notistack';

const AddProductForm = () => {

  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  const descInputRef = useRef(null);
    const categoryInputRef = useRef(null);
    const priceInputRef = useRef(null);
  const [descError, setDescError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [nameError, setNameError] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(1);


const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
}

  useEffect(() => {
    BaseUrl.get(`customer/product_category/`, config).then((response) => {
      setCategories(response?.data)
    }).catch((error) => {
      console.log(error);
    })
  }, [])


  const handleAddProduct = () => {
    const productData = {
        name: nameInputRef.current.value,
        desc: descInputRef.current.value,
        price: priceInputRef.current.value,
        category: selectedCategory,
        seller: 1,
        quantity: 1,
    };

    BaseUrl.post('customer/products/', productData, config).then((response) => {
        enqueueSnackbar('Product Added Successfully!', { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Product Not Added!', { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      })

    
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xl bg-white		h-100   rounded-md p-4 ">
        <h1 className="text-center text-5xl mb-4  p-4 text-black	  ">Create Product</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              className="w-full p-2 border border-gray-300"
            />
            {/* Add error message display for name validation if needed */}
          </div>

          <div className="mb-4">
            <label htmlFor="email">Product Description</label>
            <input
              type="text"
              id="name"
              ref={descInputRef}
              className="w-full p-2 border border-gray-300"
            />
            {/* {emailError && (
              <p className="text-red-500 text-xs">{emailError}</p>
            )} */}
          </div>

          <div className="mb-4">
            <label htmlFor="category">Category:</label>
            <select
              
              id="category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              
              className="w-full p-2 border border-gray-300"
            >
            {categories.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
            </select>
            
          </div>

          <div className="mb-4">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              ref={priceInputRef}
            //   onBlur={validateConfirmPassword}
              className="w-full p-2 border border-gray-300"
            />
            {/* {confirmPasswordError && (
              <p className="text-red-500 text-xs">{confirmPasswordError}</p>
            )} */}
          </div>

          <button
            type="button"
            onClick={handleAddProduct}
            className="w-full bg-blue-500 text-white font-bold py-2  mb-4 rounded-md hover:bg-blue-700 text-xl"
          >
            Add Product
          </button>
          <Link to="/dashboard" 
            className="w-full bg-blue-500 text-white font-bold py-2  mb-4 rounded-md hover:bg-blue-700 text-xl" style={{padding: "0.5rem 15rem"}}
          >
            Cancel
          </Link>
        </form>
        
      </div>
    </div>
  );
};

export default AddProductForm;
