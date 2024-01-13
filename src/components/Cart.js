import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from './api-services';
import { useParams, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from 'notistack';


function Cart() {
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState();
  const [addToCart, setAddToCart] = useState(false);
  const { productId } = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  useEffect(() => {
    BaseUrl.get(`/orders/order_item/`, config).then((response) => {
      setProductDetails(response?.data[0])

    }).catch((error) => {
      console.log(error);
    })
  }, [])

  const handleAddCart = (type,id,qty) => {
    if (type == 'add') {
      BaseUrl.post(`orders/order_item/`, { product: Number(id), quantity: qty + 1 }, config).then((response) => {
        BaseUrl.get(`/orders/order_item/`, config).then((response) => {
          console.log(response?.data);
          setProductDetails(response?.data[0])
    
        }).catch((error) => {
          console.log(error);
        })
      }
      ).catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.quantity, { variant: 'error', autoHideDuration: 10000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      })
    }
    else {
      BaseUrl.post(`orders/order_item/`, { product: Number(id), quantity: qty - 1 }, config).then((response) => {
        BaseUrl.get(`/orders/order_item/`, config).then((response) => {
          setProductDetails(response?.data[0])
    
        }).catch((error) => {
          console.log(error);
        })
      }
      ).catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.quantity, { variant: 'error', autoHideDuration: 10000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      })
    }
  }

  return (
    <>
      <div className="bg-blue-500 py-2">
        <div className="container text-white">
          <p><span style={{ marginLeft: '1%', cursor: 'pointer' }} onClick={() => navigate("/dashboard")}>{"< Go Back"}</span><span style={{ marginLeft: '53%' }}>Description</span></p>
        </div>
      </div>
      <div className=" mx-auto mt-1 d-flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg px-6 py-3 w-100" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span className="text-xl font-bold mb-2" style={{ width: '15rem' }}>Name</span>
            <span className="text-xl font-bold mb-2" style={{ width: '8rem' }}>Category</span>
            <span className="text-xl font-bold mb-2" style={{ width: '15rem' }}>Quantity</span>
            <span className="text-xl font-bold mb-2" style={{ width: '8rem' }}>Price</span>
            <span className="text-xl font-bold mb-2" style={{ width: '8rem' }}>Total</span>
          </div>
        </div>
      </div >
      {productDetails && productDetails['order_item']?.map((item, index) => {
        return (
          <>
            <div className=" mx-auto mt-1 d-flex justify-center items-center">
              <div className="bg-white shadow-lg rounded-lg p-6 w-100" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span className="text-gray" style={{ width: '15rem' }}>{item?.product_name}</span>
                  <span className="text-gray" style={{ width: '8rem' }}>{item?.category}</span>
                  <span className="text-gray" style={{ width: '15rem' }}>
                    <button style={{ backgroundColor: 'gray', padding: '0rem 0.5rem', color: 'white', marginRight: '0.5rem', marginLeft: '0.5rem' }} onClick={() => item?.quantity >= 0 && handleAddCart("minus",item?.product,item?.quantity)}>-</button>
                    <span style={{ width: '3rem', display: 'inline-block', textAlign: 'center' }}>{item?.quantity}</span>
                    <button style={{ backgroundColor: 'gray', padding: '0rem 0.5rem', color: 'white', marginLeft: '0.5rem' }} onClick={() => handleAddCart("add",item?.product,item?.quantity)}>+</button></span>
                  <span className="text-gray" style={{ width: '8rem' }}>₹{item?.price}</span>
                  <span className="text-gray" style={{ width: '8rem' }}>₹{item?.cost}</span>
                </div>
              </div>
            </div>
          </>)
      })
      }
      <button className="text-xl bg-blue-600 rounded text-white d-flex justify-end p-2 m-2 mt-6" style={{ position: "sticky", top: "100vh", width: "40%", borderRadius: "2rem", margin: "auto", marginBottom: '0.5rem' }}>Checkout ( ₹ {productDetails && productDetails['order_item']?.reduce((prevSum, item) => {
        return prevSum + item?.cost
      }, 0)} )</button>
    </>)
}
export default Cart;