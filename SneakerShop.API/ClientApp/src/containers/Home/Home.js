import React from "react"
import './Home.css'
import airforce from './../../assets/airforce.png'
import {Button} from "antd";

const Home = () => {
    return(
        <div className="home">
            <div className="welcome-wrapper">
                <div className="image-wrapper">
                    <img className="sneakers-img" alt="" src={airforce}/>
                </div>
                <div className="welcome-text">
                    <h1 className="welcome-title">Best sneaker shop in Ukraine</h1>
                    <p className="welcome-subtitle">
                        All the latest trainers and sneakers from Offspring,
                        your Sneaker Boutique. Brands includes Vans, Converse,
                        Nike Jordans and many more.
                    </p>
                    <div className="button-wrapper">
                        <Button type="primary">Browse</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home