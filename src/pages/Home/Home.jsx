import React from 'react'
import Layout from '../../components/Layout'
import HeroSection from '../../components/HeroSection';
import Filter from '../../components/Filter';
import ProductCard from '../../components/ProductCard';
import Track from '../../components/Track';
import { Link } from 'react-router-dom';

function Home() {

  
  return (
    <Layout>
   
    <HeroSection></HeroSection>
    <Filter></Filter>
    <ProductCard></ProductCard>
    <div className='flex justify-center -mt-10 mb-4'>
      <Link to = '/allproducts'>
      <button className='bg-gray-300 px-5 py-2 rounded-xl'>See More</button>
      </Link>
    </div>
    <Track></Track>
    
    </Layout>


  )
}

export default Home