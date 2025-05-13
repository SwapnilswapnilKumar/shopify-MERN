import React,{ useRef} from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLatter from '../Components/NewsLatter/NewsLatter'
import Footer from '../Components/Footer/Footer'


const Shop = () => {

  const newRef = useRef(null);

  const scrollToNewCollection = ()=>{
    if(newRef.current){
      newRef.current.scrollIntoView({behaviour:'smooth'});
    }
  }

  return (
    <div>
      <Hero scrollToNewCollection={scrollToNewCollection} />
      <Popular />
      <Offers />
      <NewCollections refProp={newRef} />
      <NewsLatter />
      
    </div>
  )
}

export default Shop
