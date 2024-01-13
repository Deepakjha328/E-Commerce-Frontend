import React from 'react';
import { Link } from 'react-router-dom';
import { BaseUrl } from './api-services';

const Card = ({ name, id, category, desc, price, qty, setProducts }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  const handleAddCart = (type) => {
    if (type == 'add') {
      BaseUrl.post(`orders/order_item/`, { product: Number(id), quantity: qty + 1 }, config).then((response) => {
        BaseUrl.get('customer/products/', config).then((response) => {
          setProducts(response?.data)
        })
          .catch((error) => {
            console.log(error);
          })
      }
      ).catch((error) => {
        console.log(error);
      })
    }
    else {
      BaseUrl.post(`orders/order_item/`, { product: Number(id), quantity: qty - 1 }, config).then((response) => {
        BaseUrl.get('customer/products/', config).then((response) => {
          setProducts(response?.data)
        })
          .catch((error) => {
            console.log(error);
          })
      }
      ).catch((error) => {
        console.log(error);
      })
    }
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h7 className="text-xl font-bold mb-2">{name}</h7>
      <span style={{ float: 'right' }}>
        <button style={{ backgroundColor: 'gray', padding: '0rem 0.5rem', color: 'white', marginRight: '0.5rem' }} onClick={() => qty >= 0 && handleAddCart("minus")}>-</button>
        {qty}
        <button style={{ backgroundColor: 'gray', padding: '0rem 0.5rem', color: 'white', marginLeft: '0.5rem' }} onClick={() => handleAddCart("add")}>+</button>
      </span>
      <p className="text-blue-700 mb-4">{desc}</p>
      <div className="flex justify-between mb-4">
        <p className="text-gray-600">Category: {category}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sky-400">Price: ₹{price}</p>
      </div>
    </div>
  );
};

export default Card;
