import './Nav.css'
import logo from './../../../src/assets/sneaker.png'
import React, {useState} from "react"
import {Link} from "react-router-dom";
import Modal from "antd/es/modal/Modal";
import {Button, Input, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../../actions/authActions";
import {ShoppingCartOutlined} from "@ant-design/icons";

const Nav = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false)
    const [loginUser, setLoginUser] = useState({})
    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showModal2 = () => {
        setIsModalVisible2(true);
    };

    const handleOk = () => {
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
        console.log(`selected ${value}`);
    }

    const logoff = () => {
        dispatch(logout())
    }

    return(
        <div className="nav">
            <div className="logo-wrapper">
                <img className="logo-img" alt="" src={logo}/>
                <div className="logo-text">Sneaker Shop</div>
            </div>
            <span className="spacer"/>
            <Link to="/shop" className="auth-link">Shop</Link>
            { !isAuth ? <div className="auth-link" onClick={showModal2}>Login</div>
                : <div className="auth-link"><ShoppingCartOutlined style={{fontSize: '18px', alignSelf: 'center'}}/></div> }
            { !isAuth ? <div className="auth-link" onClick={showModal}>Register</div> : <div onClick={logoff} className="auth-link">Logout</div> }
            <Modal footer={[
                <Button key="8734125" onClick={handleOk}>Register</Button>,
                <Button key="892496763454" onClick={handleCancel}>Cancel</Button>
            ]} title="Register" onCancel={handleCancel} visible={isModalVisible}>
                <div className="input-wrapper">
                    <Input placeholder="Email"/>
                    <Input.Password placeholder="Password" />
                    <Select defaultValue="Male" style={{ width: 120 }} onChange={handleSelectChange}>
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                    </Select>
                    <Input placeholder="Country"/>
                    <Input placeholder="City"/>
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
        </div>
    )
}

export default Nav