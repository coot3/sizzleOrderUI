import React from 'react'

const Product = ({ item }) => {
  
  return (
    <div className="product" style={test} >
      <div className="product-border">
        <img className='product-img' onClick={() => setTest({})} src={`${process.env.REACT_APP_API_URL}${item.img}`} alt={item.name} />
        <div className="product-summary">
          <h4>{item.name}</h4>
          <label>${item.price}</label>

        </div>
      </div>
    </div>
  )
}

export default Product
