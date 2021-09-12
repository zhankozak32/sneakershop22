import React, {useEffect, useState} from "react";
import './Admin.css'
import {Button, Input, Table} from "antd";
import Modal from "antd/es/modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {createPages} from "../../utils/pageCreator";
import {getPagedOrders, postProduct, processOrder} from "../../actions/productActions";
import {setCurrentPage} from "../../redux/reducers/adminReducer";

const Admin = () => {

    const columns = [
        {
            title: 'Order id',
            dataIndex: 'id',
            key: 'id123',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address123',
        },
        {
            title: 'Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice123',
        },
        {
            title: 'Order status',
            dataIndex: 'status',
            key: 'status123'
        },
        {
            title: 'Process',
            key: 'process123',
            render: (text, order) => (
                <div>
                    <Button
                        disabled={order.status === 'Completed'}
                        onClick={() => {
                            dispatch(processOrder(order.id))
                            order.status = 'Completed'
                    }} type="primary">Process</Button>
                </div>
            )
        }
    ];

    const [postProductVisible, setPostProductVisible] = useState(false)
    const [processOrderVisible, setProcessOrderVisible] = useState(false)
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()
    const currentPage = useSelector(state => state.admin.currentPage)
    const pagesCount = useSelector(state => state.admin.pagesCount)
    const orders = useSelector(state => state.admin.orders)
    const pages = []
    createPages(pages, pagesCount, currentPage)

    useEffect(() => {
        dispatch(getPagedOrders(currentPage))
    }, [currentPage])

    const handleOrderProcess = () => {

    }

    const handleProductPost = () => {
        console.log(product)
        dispatch(postProduct(product))
    }

    const handleOrderClose = () => {
        setProcessOrderVisible(false)
    }

    const handleProductClose = () => {
        setPostProductVisible(false)
    }

    const getBase64 = e => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            console.log(reader.result);
            setProduct({
                ...product,
                base64: reader.result
            })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    return(
        <div className="admin">
            <div className="admin-buttons-wrapper">
                <Button onClick={() => setPostProductVisible(true)} type="primary" className="admin-btn">Post product</Button>
                <Button onClick={() => setProcessOrderVisible(true)} type="primary" className="admin-btn">Process order</Button>
            </div>

            <Modal visible={postProductVisible} onOk={() => handleProductPost()} onCancel={() => handleProductClose()}>
                <div className="admin-input-wrapper">
                    <Input onChange={(e) => setProduct({
                        ...product,
                        name: e.target.value
                    })} placeholder="Name"/>
                    <Input onChange={(e) => setProduct({
                        ...product,
                        description: e.target.value
                    })} placeholder="Description"/>
                    <Input onChange={(e) => setProduct({
                        ...product,
                        price: e.target.value
                    })} placeholder="Price"/>
                    <input type="file" name="file" onChange={getBase64} />
                </div>
            </Modal>

            <Modal visible={processOrderVisible} onOk={() => handleOrderProcess()} onCancel={() => handleOrderClose()}>
                <Table rowKey="3t3425353g2q" pagination={false} dataSource={orders} columns={columns} />
                <div className="pages">
                    {pages.map((page, index) => <span
                        key={index}
                        className={currentPage === page ? "page current-page" : "page"}
                        onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
                </div>
            </Modal>
        </div>
    )
}

export default Admin