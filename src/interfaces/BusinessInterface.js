import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SizzleLogo from '../assets/sizzle_logo.png'
import OrderTicket from '../components/OrderTicket'

const BusinessInterface = ({ toggleInterface }) => {

    const [orders, setOrders] = useState([])
    const [refreshTimer, setRefreshTimer] = useState(0)

    const timerStart = () => {
        let refresh = (i) => {
            setRefreshTimer(i)
        }
        for (let i = 9; i >= 0; i--) {
            setTimeout(() => {
                refresh(i)
            }, 10000-1000*(i+1))
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/current_orders/`)
                setOrders(res.data)
            } catch (err) {
                alert('Couldn\'t connect to server')
            }
        }
        fetchData()
        timerStart()
        setInterval(() => {
            fetchData()
            timerStart()
        }, 10000)
    }, [])

    return (
        <div className="container">
            <div className="header">
                <div className="title-bg">
                    <div className="title">
                        <img src={SizzleLogo} alt="Sizzle Logo" />
                    </div>
                    <div className="slogan">
                        Current orders refreshing in {refreshTimer}<br />
                        (click on order items to mark as done.)
                    </div>
                </div>
                <div className="banner"></div>
            </div>
            <div className="order-list">
                {orders.map(item => {
                    return (
                        <OrderTicket key={item.id} item={item} orders={orders} setOrders={setOrders} />
                    )
                })}
                <div className="blank-ticket-for-flex"></div>
                <div className="blank-ticket-for-flex"></div>
            </div>

            <div className="toggle-interface" onClick={toggleInterface}>
                <label>Toggle Interface</label>
                <span>Business</span>
            </div>
        </div>
    )
}

export default BusinessInterface
