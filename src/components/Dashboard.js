import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { BaseUrl } from './api-services';
import { enqueueSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

function Dashboard(){
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

    useEffect(()=>{

      BaseUrl.get('customer/products/', config).then((response) => {
        setProducts(response?.data)
      })
      .catch((error) => {
        console.log(error);
      })

      BaseUrl.get(`customer/product_category/`, config).then((response) => {
        setCategories(response?.data)
      }).catch((error) => {
        console.log(error);
      })
    }, [])
    
    return (
        <>
         <div className="p-4">
      <div className="container mx-auto flex justify-between text-white items-center">
        <p className="text-3xl">Products</p>
        <Link to="/addProduct" className="text-xl bg-red-600 rounded  p-2" > + Add Product</Link>
      </div>
    </div>
    <div className="container mx-auto mt-8">
      <div className="grid gap-8 md:grid-cols-3">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <Card name={item.name} desc={item.desc} quantity={item.quantity} price={item.price} category={categories.filter((ele) => ele.id == item?.category)[0]?.name} id={item.id} qty={item.qty} setProducts={setProducts}/>
          </div>
        ))}
      </div>
    </div>
        </>
        
    )
}
export default Dashboard;