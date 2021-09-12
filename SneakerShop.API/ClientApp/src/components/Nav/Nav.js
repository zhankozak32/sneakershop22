import './Nav.css'
import logo from './../../../src/assets/sneaker.png'
import React, {useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom";
import Modal from "antd/es/modal/Modal";
import {Button, Input, Select, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getUserOrders, login, logout, register} from "../../actions/authActions";
import {ShoppingCartOutlined} from "@ant-design/icons";

const Nav = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isModalVisible2, setIsModalVisible2] = useState(false)
    const [ordersVisible, setOrdersVisible] = useState(false)
    const [loginUser, setLoginUser] = useState({})
    const [registerUser, setRegisterUser] = useState({})
    const [selectedGender, setSelectedGender] = useState('')
    const isAuth = useSelector(state => state.auth.isAuth)
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const dispatch = useDispatch()
    const userOrders = useSelector(state => state.auth.orders)
    const history = useHistory()

    const columns = [
        {
            title: 'Order id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Product name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Order status',
            dataIndex: 'status',
            key: 'status'
        }
    ];

    useEffect(() => {
        dispatch(getUserOrders())
        console.log('ready')
    }, [])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showModal2 = () => {
        setIsModalVisible2(true);
    };

    const handleOk = () => {
        setRegisterUser({
            ...registerUser,
            gender: selectedGender
        })

        dispatch(register(registerUser))
        setIsModalVisible(false);
    };

    const handleOk2 = () => {
        dispatch(login(loginUser))
        setIsModalVisible2(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const handleSelectChange = (value) => {
        setSelectedGender(value)
    }

    const logoff = () => {
        dispatch(logout())
    }

    return(
        <div className="nav">
            <div onClick={() => {
                history.push('/')
            }} className="logo-wrapper">
                <img className="logo-img" alt="" src={logo}/>
                <div className="logo-text">Sneaker Shop</div>
            </div>
            <span className="spacer"/>
            <Link to="/shop" className="auth-link">Shop</Link>

            {
                !isAuth ? <div className="auth-link" onClick={showModal2}>Login</div>
                : <div className="auth-link" >
                    {
                        isAdmin ? <Link to="/admin" className="auth-link">Admin</Link> :
                            <ShoppingCartOutlined onClick={() => {setOrdersVisible(true)}} style={{fontSize: '18px', alignSelf: 'center'}}/>
                    }
                </div>
            }

            { !isAuth ? <div className="auth-link" onClick={showModal}>Register</div> : <div onClick={logoff} className="auth-link">Logout</div> }
            <Modal footer={[
                <Button key="8734125" onClick={handleOk}>Register</Button>,
                <Button key="892496763454" onClick={handleCancel}>Cancel</Button>
            ]} title="Register" onCancel={handleCancel} visible={isModalVisible}>
                <div className="input-wrapper">
                    <Input onChange={(e) => setRegisterUser({
                        ...registerUser,
                        email: e.target.value
                    })} placeholder="Email"/>
                    <Select defaultValue="Male" style={{ width: 120 }} onChange={handleSelectChange}>
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                    </Select>
                    <Input.Password onChange={(e) => setRegisterUser({
                        ...registerUser,
                        password: e.target.value
                    })} placeholder="Password"/>
                    <Input onChange={(e) => setRegisterUser({
                        ...registerUser,
                        address: e.target.value
                    })} placeholder="Address"/>
                    <Input onChange={(e) => setRegisterUser({
                        ...registerUser,
                        country: e.target.value
                    })} placeholder="Country"/>
                    <Input onChange={(e) => setRegisterUser({
                        ...registerUser,
                        city: e.target.value
                    })} placeholder="City"/>
                </div>
            </Modal>

            <Modal footer={[
                <Button key="1234214" onClick={handleOk2}>Login</Button>,
                <Button key="462436" onClick={handleCancel2}>Cancel</Button>
            ]} title="Login" onCancel={handleCancel2} visible={isModalVisible2}>
                <div key="adsasd" className="input-wrapper">
                    <Input onChange={(e) => {
                        setLoginUser({
                            ...loginUser,
                            email: e.target.value
                        })
                    }} placeholder="Email"/>
                    <Input.Password onChange={(e) => {
                        setLoginUser({
                            ...loginUser,
                            password: e.target.value
                        })
                    }} placeholder="Password" />
                </div>
            </Modal>
            <Modal visible={ordersVisible} onOk={() => {setOrdersVisible(false)}} onCancel={() => {setOrdersVisible(false)}}>
                <Table rowKey="3t33g2q" pagination={false} dataSource={userOrders} columns={columns} />
            </Modal>
        </div>
    )
}

export default Nav