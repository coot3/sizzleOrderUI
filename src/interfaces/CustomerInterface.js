import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import axios from 'axios'
import ProductDetail from '../components/ProductDetail';
import OrderItem from '../components/OrderItem';
import NavItem from '../components/NavItem'

import SizzleLogo from '../assets/sizzle_logo.png'
import YellowBG from '../assets/yellow.MP4'
import BrownBG from '../assets/brown.MP4'
import LightBlueBG from '../assets/light_blue.MP4'
import CloseIcon from '../assets/x-icon.png'


const CustomerInterface = ({ toggleInterface }) => {

  // retreives product data on startup
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/`)
      setProducts(res.data)
    } catch (err) {
      alert('Sorry we couldn\'t make contact with the server.  Please check your internet connection, otherwise there may be problems with our server.');
    }
  }

  useEffect(() => {
    getProducts()
  }, [])


  // random color selector for brush anim on startup
  const randomBgSelector = () => {
    let random = Math.random()
    if (random < 0.33) {
      return YellowBG
    } else if (random < .66) {
      return BrownBG
    } else {
      return LightBlueBG
    }
  }


  const [order, setOrder] = useState([])


  // updates cart qty number in button and total order price when the order changes
  const [orderQtyTotal, setOrderQtyTotal] = useState('')
  const [orderPrice, setOrderPrice] = useState(0)
  const [orderButColor, setOrderButColor] = useState({})

  useEffect(() => {
    let qtyTotal = 0
    let priceTotal = 0
    for (let i = 0; i < order.length; i++) {
      qtyTotal += order[i]['qty']
      priceTotal += order[i]['qty'] * order[i]['price']
    }
    setOrderQtyTotal(qtyTotal)
    setOrderPrice(priceTotal)
    if (orderSummaryVisible['opacity'] === 0) {
      setOrderButColor({ opacity: 0.25 })
      setTimeout(() => {
        setOrderButColor({})
      }, 250)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  // sends order to server and returns order number
  const [orderNo, setOrderNo] = useState('')
  const [orderCompleteVisible, setOrderCompleteVisible] = useState({ display: 'none' })
  const [orderSummaryVisible, setOrderSummaryVisible] = useState({})

  const confirmOrderHandler = async () => {
    let data = order

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/create_order/`, data)
      setOrder([])
      setOrderNo(res.data['order_no'])
      setOrderCompleteVisible({})
      setOrderSummaryVisible({ display: 'none' })
    } catch (err) {
      alert('Sorry we couldn\'t submit your order.  Please check your internet connection, otherwise there may be problems with our server.');
    }
  }

  const changeQtyHandler = (action, qty, setQty) => {
    if (action === 'plus' && qty < parseInt(10)) {
      setQty(qty + 1)

    } else if (action === 'minus' && qty > 1) {
      setQty(qty - 1)
    }
  }


  //  -------------------------------------------------------   Animation Logic

  const [productsVisible, setProductsVisible] = useState({})
  const [productDetailsVisible, setProductDetailsVisible] = useState({ opacity: 0 })
  const [selectedProduct, setSelectedProduct] = useState({ opacity: 0 })
  const [displayLocation, setDisplayLocation] = useState({})
  const [orderPopupVisible, setOrderPopupVisible] = useState({ visibility: 'hidden', opacity: 0 })
  const [containerStyles, setContainerStyles] = useState({})

  const [videoBgHidden, setVideoBgHidden] = useState({})

  const openProductDetails = (item) => {
    setSelectedProduct(item)
    setVideoBgHidden({ display: 'none' })
    setProductsVisible({ opacity: 0 })
    setDisplayLocation({ transform: 'translateX(-100vw)' })
    setProductDetailsVisible({ opacity: 1 })
    setTimeout(()=>{    
      executeScroll()
      setTimeout(() => {    
        setDisplayLocation({ transform: 'translateX(-100vw)', height: '100vh', overflowY:'hidden' })
      }, 800)
    }, 400)
  }

  const closeProductDetails = () => {
    setProductsVisible({ opacity: 1 })
    setDisplayLocation({ transform: 'translateX(0)' })
    setProductDetailsVisible({ opacity: 0 })
    setTimeout(() => {
      setVideoBgHidden({})
    }, 1000)
  }


  // Logic to change product category - timeouts to remove stroke bg animation before animations to reduce lag
  const [productFilter, setProductFilter] = useState('Burger')

  const changeCategory = (category) => {
    setImageLoaded(0)
    setVideoBgHidden({ display: 'none' })
    setProductsVisible({ opacity: 0 })
    if (productDetailsVisible['opacity'] === 1) {
      setProductFilter(category)
      if(productFilter === category) {
        closeProductDetails()
      }
    } else {
      setTimeout(() => {
        setProductFilter(category)
      }, 500)
    }
  }

  // toggles visibility of order summary
  const toggleOrderSummary = () => {
    if (orderNo !== '') {
      setOrderNo('')
      setOrderSummaryVisible({})
      setOrderCompleteVisible({ display: 'none' })
    }
    if (orderPopupVisible['visibility'] === 'hidden') {
      setOrderPopupVisible({ visibility: 'visible', opacity: 1 })
      setContainerStyles({ height: '100vh', overflow: 'hidden' })
    } else {
      setOrderPopupVisible({ visibility: 'hidden', opacity: 0 })
      setContainerStyles({})
    }
  }

  //

  const [imageLoaded, setImageLoaded] = useState(0)

  const addLoaded = () => {
    setImageLoaded(imageLoaded + 1)
  }

  useEffect(() => {
    if (imageLoaded === products.filter((item) => item['category'] === productFilter).length) {
      if (productDetailsVisible['opacity'] === 1) {
        closeProductDetails()
      } else {
        setTimeout(() => {
          setProductsVisible({})
          setTimeout(() => {
            setVideoBgHidden({})
          }, 500)
        }, 500)
      }
    }
    // eslint-disable-next-line
  }, [imageLoaded])

  const scrollRef = useRef()
  const scrollToRef = () => scrollRef.current.scrollIntoView({behavior: 'smooth'})
  const executeScroll = () => scrollToRef()


  return (
    <div className="container" style={containerStyles}>

      {/* ----------------------------------------------------------   Header */}
      <div className="header">
        <div className="title-bg">
          <div className="title">
            <img src={SizzleLogo} alt="Sizzle Logo" />
          </div>
          <div className="slogan">
            Juicy beef sizzled to perfection every time.
          </div>
        </div>
        <div className="banner"></div>

        {/* --------------------------------------------------------   Navigation */}
        <nav className="navbar">
          <NavItem category="Burger" changeCategory={changeCategory} productFilter={productFilter} />
          <NavItem category="Side" changeCategory={changeCategory} productFilter={productFilter} />
          <NavItem category="Beverage" changeCategory={changeCategory} productFilter={productFilter} />
        </nav>
        <div className="banner"  ref={scrollRef}></div>

        {/* ----------------------------------------------------------   Product Display */}
        <div className="display" style={displayLocation}>
          <div className="products-container" style={productsVisible}>

            {/* Product Line Item */}

            {products.filter((item) => item['category'] === productFilter).map((item) => {
              return (
                <div className="product-container">
                  <div className="product-border" onClick={() => openProductDetails(item)}>
                    <video
                      onMouseOver={event => event.target.play()}
                      onMouseOut={event => { event.target.pause(); event.target.currentTime = 0; }}
                      src={randomBgSelector()}
                      style={videoBgHidden}
                      muted="muted"
                    />
                    <div className="product">
                      <img className='product-thumbnail' src={`${process.env.REACT_APP_API_URL}${item.img}`} alt={item.name} onLoad={addLoaded} />
                      <div className="product-summary">
                        <h4>{item.name}</h4>
                        <label>${item.price}</label>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <ProductDetail
            productDetailsVisible={productDetailsVisible}
            item={selectedProduct}
            closeProductDetails={closeProductDetails}
            setOrder={setOrder}
            order={order}
            changeQtyHandler={changeQtyHandler}
            ref={scrollRef}
          />

        </div>
      </div>

      {/* ----------------------------------------------------   Order Cart Button */}
      <div className="order-but" onClick={toggleOrderSummary} style={orderButColor}>
        Your Order
        <div className="order-but-qty">
          {orderQtyTotal}
        </div>
      </div>

      {/* ----------------------------------------------------   Order Summary Popup */}

      <div className="order-wrapper" style={orderPopupVisible}>
        <div className="order-container">
          <div className="order-summary" style={orderSummaryVisible}>
            <div className="order-header">
              <div className="order-header-wrapper">
                <img src={SizzleLogo} alt="Sizzle Logo" />
                <img onClick={toggleOrderSummary} src={CloseIcon} alt="Close" />
              </div>
              <h2>Your Order:</h2>
              <div className="banner"></div>
            </div>
            {order.length > 0 ? (
              <div className="order-item-container">
                {order.map((item) => {
                  return (
                    <OrderItem item={item} order={order} setOrder={setOrder} changeQtyHandler={changeQtyHandler} />
                  )
                })}
                <div className="order-total">
                  <h2>Order Total:</h2>
                  <h2>${orderPrice.toFixed(2)}</h2>

                </div>
                <div className="confirm-order" onClick={confirmOrderHandler}>
                  Confirm Order
              </div>
              </div>
            ) : (
                <h2>There are currently no items in your order.  Add some food or drinks.</h2>
              )}
          </div>
          {/* ----------------------------------------------------   Order Complete Popup */}
          <div className="order-complete" style={orderCompleteVisible}>
            <div className="order-header-wrapper">
              <img src={SizzleLogo} alt="Sizzle Logo" />
              <img onClick={toggleOrderSummary} src={CloseIcon} alt="Close" />
            </div>
            <div className="banner"></div>
            <h2>Thanks for Ordering. Your order number is {orderNo}</h2>
            <p>Please pay at the counter.</p>
          </div>
        </div>
      </div>
      {/* ----------------------------------------------------   Toggle Interface Button */}
      <div className="toggle-interface" onClick={toggleInterface}>
        <label>Toggle Interface</label>
        <span>Customer</span>
      </div>
    </div>
  )
}

export default CustomerInterface;
