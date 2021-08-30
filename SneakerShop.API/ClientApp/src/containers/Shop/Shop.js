import React, {useEffect, useState} from "react"
import './Shop.css'
import {Card, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getBrands, getProductByBrandName, getProducts} from "../../actions/productActions";

const { Meta } = Card;

const Shop = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.product.products)
    const brands = useSelector(state => state.brand.brands)
    const [currentBrand, setCurrentBrand] = useState('')

    useEffect(() => {
        dispatch(getProducts())
        dispatch(getBrands())
    }, [])

    useEffect(() => {
        dispatch(getProductByBrandName(currentBrand))
        if(currentBrand == ''){
            dispatch(getProducts())
        }
    }, [currentBrand])

    const handleSelectChange = (value) => {
        setCurrentBrand(value)
    }

    const handleSortChange = (value) => {
        console.log(value)
    }

    return(
        <div className="shop">
            <div className="all-wrapper">
                <div className="filters-wrapper">
                    <div className="brand-filter">
                        <h5>Brands:</h5>
                        <Select defaultValue="" style={{ width: 120 }} onChange={handleSelectChange}>
                            <Select.Option key="xzcxzc214125sdw" value={''}>All</Select.Option>
                            {
                                brands.map((brand) => (
                                    <Select.Option key={brand.id} value={brand.name}>{brand.name}</Select.Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="sort-filter">
                        <h5>Sort by:</h5>
                        <Select defaultValue="" style={{ width: 120 }} onChange={handleSortChange}>
                            <Select.Option value="price_asc">Price ascending</Select.Option>
                            <Select.Option value="price_desc">Price descending</Select.Option>
                        </Select>
                    </div>

                </div>
                <div className="products-wrapper">
                    {
                        products.map((product) => (
                            <Card
                                key={product.id}
                                hoverable
                                cover={<img alt="" src={`https://localhost:5001/wwwroot/${product.imagePath}`} />}
                            >
                                <Meta title={product.name} description={product.description} />
                                <h2 className="product-price">{product.price} $</h2>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Shop