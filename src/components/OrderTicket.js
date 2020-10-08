import axios from 'axios'
import React, { useState, useEffect } from 'react'
import OrderTicketLineItem from './OrderTicketLineItem'

const OrderTicket = ({ item, orders, setOrders }) => {

    const [numOfCompletedOrderItems, setNumOfCompletedOrderItems] = useState(0)
    const [customerServedBut, setCustomerServedBut] = useState({ visibility: 'hidden' })
    const [ticketCompleteHeadingStyle, setTicketCompleteHeadingStyle] = useState({})
    const [ticketDeleteAnim, setTicketDeleteAnim] = useState({})

    useEffect(() => {
        if (numOfCompletedOrderItems === item.order_items.length) {
            setCustomerServedBut({})
            setTicketCompleteHeadingStyle({ color: '#5b6d4d' })
        } else {
            setCustomerServedBut({ visibility: 'hidden' })
            setTicketCompleteHeadingStyle({})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numOfCompletedOrderItems])

    const orderCompleteHandler = async (item) => {

        let data = {
            id: item.id
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/current_orders/`, data)
            setTicketDeleteAnim({ opacity: 0 })
            setTimeout(() => {
                setTicketDeleteAnim({})
                setOrders(res.data)
                setNumOfCompletedOrderItems(0)
            }, 500)
        } catch (err) {
            alert('Could not connect to server.')
        }
    }

    return (
        <div className="order-ticket" style={ticketDeleteAnim}>
                <h1 style={ticketCompleteHeadingStyle}>Order: {item.order_no}</h1>
                <div className="order-ticket-items">
                    {item.order_items.map((item) => {
                        return (
                            <OrderTicketLineItem key={item.id} item={item} numOfCompletedOrderItems={numOfCompletedOrderItems} setNumOfCompletedOrderItems={setNumOfCompletedOrderItems} />
                        )
                    })}
                </div>
                <div className="order-ticket-but" style={customerServedBut} onClick={() => orderCompleteHandler(item)}>
                    Customer served?
            </div>
        </div>
    )
}

export default OrderTicket
