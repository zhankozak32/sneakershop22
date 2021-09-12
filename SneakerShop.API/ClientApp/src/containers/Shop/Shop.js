import React, {useEffect} from "react"
import './Shop.css'
import {useDispatch, useSelector} from "react-redux";
import {getPagedProducts} from "../../actions/productActions";
import Product from "../../components/Product/Product";
import {createPages} from "../../utils/pageCreator";
import {setCurrentPage} from "../../redux/reducers/productReducer";

const Shop = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.product.products)
    const currentPage = useSelector(state => state.product.currentPage)
    const pagesCount = useSelector(state => state.product.pagesCount)
    const pages = []
    createPages(pages, pagesCount, currentPage)

    useEffect(() => {
        dispatch(getPagedProducts(currentPage))
    }, [currentPage])

    const handleSortChange = value => {
        console.log(value)
    }

    const generateKey = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    return(
        <div className="shop">
            <div className="all-wrapper">
                <div className="filters-wrapper">

                </div>
                <div className="products-wrapper">
                    {
                        products.map((product) => (
                            <Product key={generateKey} product={product}/>
                        ))
                    }
                </div>
                <div className="pages">
                    {pages.map((page, index) => <span
                        key={index}
                        className={currentPage === page ? "page current-page" : "page"}
                        onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
                </div>
            </div>
        </div>
    )
}

export default Shop