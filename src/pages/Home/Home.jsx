
import { Helmet } from 'react-helmet';
import Banner from './Banner/Banner';
import Product from './Product/Product';
import Testimonials from './Testimonials/Testimonials';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductCart from './Product/ProductCart';



const Home = () => {
   const [tabIndex,setTabIndex]=useState(0)
   // const [product]=useProduct();
   // console.log('==========',product)
      // const Bag= product.filter(item=>item.category ==="name")
      // console.log('hhhhhhhhh',Bag)
  
   
   const [product,setProduct]=useState([])
   const sneaker=product.filter(items=>items.category==="Men's Sneaker")
   const Bottles=product.filter(items=>items.category==="Bottle")
   const Boots=product.filter(items=>items.category==="Men's Boot")
   const Cap=product.filter(items=>items.category==="Cap")
   const Earphones=product.filter(items=>items.category==="Earphones")
   const Pants=product.filter(items=>items.category==="Men's Pants")
   const Bags=product.filter(items=>items.category==="Bag")
   
  
  

   useEffect(()=>{
     fetch('https://diu-project-server.vercel.app/product1')
     .then(res=>res.json())
     .then(data=>setProduct(data.data))
   },[])
 

 

  
    return (
       <>
       <Helmet>
        <title>Eshop-Home</title>
       </Helmet>
        <div>
           <div className='py-24'>
           <Banner></Banner>
           </div>
           <h1 className='text-2xl font-semibold my-4'>Product Categorys:</h1>
           <div className=''>
           
           <div className='font-semibold'>
           <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
  <TabList>
    <Tab>All</Tab>
    <Tab>Bottle</Tab>
    <Tab>Men Boot</Tab>
    <Tab>Cap</Tab>
    <Tab>Earphones</Tab>
    <Tab>Men Pants</Tab>
    <Tab>Bag</Tab>
    <Tab>Men Sneaker</Tab>
  </TabList>

  <TabPanel>
  <div className='py-10'>
  <Product></Product>
  </div>
  </TabPanel>
  <TabPanel>
  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
   {
      Bottles.map(item=><ProductCart key={item._id} item={item}></ProductCart>)
   }
   </div>
  </TabPanel>
  <TabPanel>
  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
   {
      Boots.map(item=><ProductCart key={item._id} item={item}></ProductCart>)
   }
   </div>

  </TabPanel>
  <TabPanel>
   <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
  {
      Cap.map(item=><ProductCart key={item._id} item={item}></ProductCart>)
   }
   </div>
  </TabPanel>
  <TabPanel>
  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
  {
      Earphones.map(item=><ProductCart key={item._id} item={item}></ProductCart>)
   }
   </div>
  </TabPanel>

  <TabPanel>
  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
  {
      Pants.map(item=><ProductCart key={item._id} item={item}></ProductCart>)
   }
   </div>
  </TabPanel>
  <TabPanel>
  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
  {
      Bags.map(item=><ProductCart key={item._id} item={item}></ProductCart>)
   }
   </div>
  </TabPanel>
  <TabPanel>
   <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
   {
      sneaker.map(item=><ProductCart key={item._id} item={item}></ProductCart>)
   }
   </div>
   </TabPanel>
</Tabs>
           </div>
           </div>
           
           
           <Testimonials></Testimonials>
        </div>
       
       </>
    );
};

export default Home;