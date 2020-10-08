import React, { useState } from 'react';
import './App.css';

// import CustomerInterface from './interfaces/CustomerInterface'
import BusinessInterface from './interfaces/BusinessInterface'
import CustomerInterface from './interfaces/CustomerInterface';

const App = () => {

  const [customerVisible, setCustomerVisible] = useState({})
  const [businessVisible, setBusinessVisible] = useState({ display: 'none' })

  const toggleInterface = () => {
    if (businessVisible['display'] === 'none') {
      setCustomerVisible({display: 'none'})
      setBusinessVisible({})
    } else {
      setCustomerVisible({})
      setBusinessVisible({display: 'none'})
    }
  }

  return (
    <div>
      <div className="customer-interface" style={customerVisible}>
        <CustomerInterface toggleInterface={toggleInterface} />
      </div>
      <div className="business-interface" style={businessVisible}>
        <BusinessInterface toggleInterface={toggleInterface} />
      </div>
    </div>
  )
}

export default App;
