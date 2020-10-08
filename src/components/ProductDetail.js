import React, { useState } from 'react'
import CloseIcon from '../assets/x-icon.png'

const ProductDetail = ({ productDetailsVisible, item, closeProductDetails, setOrder, order, changeQtyHandler }) => {

    const [qty, setQty] = useState(1)

    const addToOrder = (item, qty) => {
        let existingOrder = [...order]
        for (let i = 0; i < existingOrder.length; i++) {
            if (existingOrder[i]['id'] === item.id) {
                existingOrder[i]['qty'] += parseInt(qty)
                setOrder(existingOrder)
                setQty(1)
                closeProductDetails()
                return
            }
        }
        setOrder([...existingOrder, { ...item, qty: parseInt(qty) }])
        setQty(1)
        closeProductDetails()
    }

    return (
        <div className="product-detail" style={productDetailsVisible}>
            <div className="product-detail-wrapper">
                <img className='product-img' src={`${process.env.REACT_APP_API_URL}${item.img}`} alt={item.name} />
                <div className="details-summary">
                    <div className="details-header">
                        <h1>{item.name}</h1>
                        <img onClick={closeProductDetails} src={CloseIcon} alt="Close" />
                    </div>
                    <label>${item.price}</label>
                    <h4>Description</h4>
                    <p>{item.description}</p>
                    <div className="qty-container">
                        <div className="qty-buttons">
                            <div className="minus" onClick={() => changeQtyHandler('minus', qty, setQty)}></div>
                            <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} name="qty" id="qty" min={1} defaultValue={1} />
                            <div className="plus" onClick={() => changeQtyHandler('plus', qty, setQty)}></div>
                        </div>
                        <button onClick={() => addToOrder(item, qty)}>Add to Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProductDetail
