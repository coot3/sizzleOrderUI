import React, { useState, useEffect } from 'react'
import CloseIcon from '../assets/x-icon_red.png'

const OrderItem = ({ item, order, setOrder, changeQtyHandler }) => {
    const [qty, setQty] = useState(item.qty)

    useEffect(() => {
        let existingOrder = [...order]
        for (let i = 0; i < existingOrder.length; i++) {
            if (existingOrder[i]['id'] === item.id) {
                existingOrder[i]['qty'] = parseInt(qty)
            }
        }
        setOrder(existingOrder)
        // eslint-disable-next-line
    }, [qty])

    useEffect(() => {
        setQty(item.qty)
    }, [order, item])

    const removeItem = (itemID) => {
        let existingOrder = [...order]
        let newOrder = existingOrder.filter((item) => item.id !== itemID)
        setOrder(newOrder)
    }

    return (
        <div className="order-item">
            <img className='product-order-thumbnail' src={`${process.env.REACT_APP_API_URL}${item.img}`} alt={item.name} />
            <div className="flex-col">
                <h4>{item.name}</h4>
                <div className='remove-item' onClick={() => removeItem(item.id)}>
                    <img src={CloseIcon} alt="Close" />
                    <span>remove</span>
                </div>
            </div>


            <div className="minus" onClick={() => changeQtyHandler('minus', qty, setQty)}></div>
            <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} name="qty" id="qty" defaultValue={qty} />
            <div className="plus" onClick={() => changeQtyHandler('plus', qty, setQty)}></div>
            <label>${(item.price * qty).toFixed(2)}</label>
        </div>
    )
}

export default OrderItem
