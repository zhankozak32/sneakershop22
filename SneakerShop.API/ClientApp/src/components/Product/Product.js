import React, {useState} from "react"
import './Product.css'
import {Button, Card} from "antd"
import {useDispatch, useSelector} from "react-redux";
import {placeOrder} from "../../actions/productActions";

const { Meta } = Card

const Product = props => {

    const [product, setProduct] = useState(props.product)
    const [sizeBlur, setSizeBlur] = useState(false)
    const isAuth = useSelector(state => state.auth.isAuth)
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const dispatch = useDispatch()

    const generateKey = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const handleBuyClick = (e, product) => {
        dispatch(placeOrder(product))
        console.log(product)
    }

    const handleSizeClick = (e, size) => {
        console.log(sizeBlur)
        setSizeBlur(true)
        setProduct({
            ...product,
            selectedSize: size.value
        })
    }

    return(
        <Card
            key={product.id}
            hoverable
            cover={<img alt="" src={`https://localhost:5001/wwwroot/${product.imagePath}`} />}
        >
            <Meta title={product.name} description={product.description} />
            <h2 className="product-price">{product.price} $</h2>
            <div className="product-size-wrapper">
                { !isAdmin && isAuth &&
                    product.sizes.map((size) => (
                        <div onClick={() => { setSizeBlur(true)
                            setProduct({
                                ...product,
                                selectedSize: size.value
                            })
                        }} className={ size.value === product.selectedSize ? 'product-size selected-size' : 'product-size'} key={generateKey + size.id}>
                            { size.value }
                        </div>
                    ))
                }
            </div>

            { isAuth && !isAdmin ? <Button disabled={!sizeBlur} onClick={(e) => handleBuyClick(e, product)}>Buy</Button> : <span></span>}

        </Card>
    )
}

export default Product