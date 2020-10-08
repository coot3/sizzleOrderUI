import React, {useState} from 'react'

const OrderTicketLineItem = ({item, numOfCompletedOrderItems, setNumOfCompletedOrderItems}) => {

    const [itemCompleteStyle, setItemCompleteStyle] = useState({})

    const itemCompleteHandler = () => {
        if (itemCompleteStyle['textDecoration'] === undefined) {
            setItemCompleteStyle({textDecoration: 'line-through', color: '#5b6d4d'});
            setNumOfCompletedOrderItems(numOfCompletedOrderItems + 1);
        } else {
            setItemCompleteStyle({})
            setNumOfCompletedOrderItems(numOfCompletedOrderItems - 1);
        }
    }
    return (
        <div className="order-ticket-item" onClick={itemCompleteHandler}>
            <span style={itemCompleteStyle}>{item.product.name}</span>
            <span style={itemCompleteStyle}>x{item.qty}</span>
        </div>
    )
}

export default OrderTicketLineItem
