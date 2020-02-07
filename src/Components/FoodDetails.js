import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions'


class FoodDetails extends Component {
    state = {
        showPopup: false,
        selectedOption: 'full',
        id: "",
        quantity: 1,
        max: 10,
        min: 1,
        productDetail: {},
        productPrice: 0,
        buttonCartStatus: true,
        fullData: {},
        addcart: 'Add To Cart'
    }

    handleClick = (keyx) => {
        if (this.state.addcart === 'Add To Cart') {
            this.setState({
                addcart: 'Go To Cart'
            })
            this.props.addToCart(keyx);

            if (this.state.buttonCartStatus === false) {
                var pprice = this.getProductPrice();
                this.setState({
                    quantity: 1,
                    productPrice: pprice
                })
            }
        }
        else {
            this.props.history.push('/cart')
        }
    }

    handleBuyNow = () => {
        console.log('Handle Buy Now');
    }

    handleOptionChange = (event) => {
        var id = event.target.id;
        var product = this.state.productDetail;
        var price = 0
        if (id === "full") {
            price = Number(product.foodMenuProductPrice);
            this.setState({
                quantity: 1
            })
        } else {
            price = Number(product.foodMenuProductHalfPrice);
            this.setState({
                quantity: 1
            })
        }

        this.setState({
            selectedOption: event.target.value,
            id: id,
            productPrice: price
        })
    }

    getProductPrice = () => {
        var product = this.state.productDetail;
        var price = 0;
        if (this.state.selectedOption === "full") {
            price = Number(product.foodMenuProductPrice);
        } else {
            price = Number(product.foodMenuProductHalfPrice);
        }

        return price;
    }

    handleNumbersOnly = (e) => {
        this.setState({ quantity: e.target.value });
    }

    handlePopStatus = (value) => {
        this.props.popupStaus(false);
    }




    async componentDidMount() {
        this.setState({
            productDetail: this.props.data,
            productPrice: Number(this.props.data.foodMenuProductPrice)
        })
        // console.log(this.props)
    }


    IncrementItem = () => {
        var price = this.getProductPrice();
        this.setState(prevState => {
            if (prevState.quantity < 9) {
                return {
                    quantity: prevState.quantity + 1,
                    productPrice: Number(price * (prevState.quantity + 1))
                }
            } else {
                return null;
            }
        });
    }

    DecreaseItem = () => {
        var price = this.getProductPrice();
        this.setState(prevState => {
            if (prevState.quantity > 1) {
                return {
                    quantity: prevState.quantity - 1,
                    productPrice: Number(price * (prevState.quantity - 1))
                }
            } else {
                return null;
            }
        });
    }

    render() {
        return (
            <div>
                {this.props.showPopup ?
                    <div className="foodDetails--popUp" key={this.props.keyx} id={this.props.keyx}>
                        <div className="foodDetails--Main">

                            <div className="foodcart--Image">
                                <img src={require('../Images/food.png')} alt=" " className="popupImage" />

                            </div>
                            <div className="foodcart--productDetails">
                                <p className="foodMenu--productInfo color-2e2e2e open_sansregular font-14">{this.state.productDetail.foodMenutitle}</p>
                                <p className="foodMenu--subproductInfo color-2e2e2e open_sansregular font-14">{this.state.productDetail.foodMenuProductInfo}</p>

                                <div>
                                    <div>
                                        {
                                            this.state.id === 'half' ?
                                                <p className="addedAmount">
                                                    <sup><i className="fa fa-inr" aria-hidden="true"></i></sup>
                                                    <span style={{ paddingLeft: '3px' }}>{this.state.productPrice}</span>/-
                                            </p>
                                                :
                                                <p className="addedAmount">
                                                    <sup><i className="fa fa-inr" aria-hidden="true"></i></sup>
                                                    <span style={{ paddingLeft: '3px' }}>{this.state.productPrice}</span>/-
                                            </p>
                                        }
                                    </div>

                                    <div className="foodDetails--cartButton">
                                        <button className="foodDetails--addTocart" onClick={() => { this.handleClick(this.props.keyx) }}
                                        >
                                            <span className="paddling-right-10">
                                                <i className="fa fa-shopping-cart"></i>
                                            </span>
                                            {this.state.addcart}
                                        </button>
                                        <button className="foodDetails--buyNow" onClick={this.handleBuyNow}>
                                            <span className="paddling-right-10">
                                                <i className="fa fa-angle-double-right"></i>
                                            </span>
                                            Order Now
                                    </button>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="foodDetails--popUpParent" onClick={this.handlePopStatus} ></div>

                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Lunchitems: state.Lunchitems,
        Baritems: state.Baritems,
        StateData: state.Lunchitems,
        adData: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (keyx) => { dispatch(addToCart(keyx)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails)