import React ,{ useContext} from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProduct from '../Components/RelatedProducts/RelatedProduct';

const Product = () => {
 const {all_product} = useContext(ShopContext);
const {productId} = useParams();
const product = all_product.find((item) => item.id === Number(productId) );

if(!product){
  return <div>Loading or Product Not Found{productId}</div>
}

  return (
    <div >
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProduct product={product} />
    </div>
  )
}

export default Product



