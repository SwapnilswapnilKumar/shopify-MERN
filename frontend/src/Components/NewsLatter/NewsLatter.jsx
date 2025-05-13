import React from 'react'
import './NewsLatter.css'


const NewsLatter = () => {
  const subscribeAlert = ()=>{
    alert("Subscribe facility will be provided soon!")
  }
  return (
    <div className='newslatter'>
      <h1>Get Exclusive Offers on Your Email</h1>
      <p>Subscribe to our newletter and stay updated</p>
      <div>
        <input type="email" name="email" placeholder='Your Email Id' />
        <button onClick={subscribeAlert} >Subscribe</button>
      </div>
      
    </div>
  )
}

export default NewsLatter
