import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side */}
      <div className="md:w-1/2 p-8"style={{ backgroundColor: 'white', width: '100%', marginTop: '2rem', borderRadius: '1rem', opacity: '0.7', marginLeft: '2rem',marginRight:'2rem', height: '50%', padding:'2rem' }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 p-4">
          Most Trusted & Reliable E-Commerce of India
        </h1>
        <p className="text-lg mb-4 p-2">
        Welcome to MobX, where seamless shopping meets unparalleled convenience. Elevate your online retail experience with us.
        </p>
        <div className="flex space-x-4 p-2">
          <Link to="/aboutUs" className="bg-blue-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
            Learn More
          </Link>
          <Link to="/login" className="bg-blue-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
            Get Started
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center" style={{width:'100%',height:'94vh'}}>
        <div className="w-70 h-70 bg-gray-800" style={{width:'100%'}}>
            <img src={require('../images/homePageImage.jpg')} alt="img" style={{height:'94vh',width:'100%'}}/>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
