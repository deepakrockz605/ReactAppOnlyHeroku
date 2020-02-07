import React, { Component } from 'react'
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
// import { Link } from 'react-router-dom';
import Login from './Login'
import Register from './Register'

import { addQuantity, subtractQuantity, removeItem } from '../actions/cartActions'
import MainScreen from './screens/MainScreen/MainScreen';


class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartDetail: {},
      addTocart: {},
      index: 0,
      deliveryFlag: false,
      paymentFlag: false,
      ZIPvalue: '',
      Mobilevalue: '',
      ShipFullName: '',
      shipState: '',
      shipCity: '',
      shipaddress: '',
      shipEmail: '',
      shipLandmark: '',
      emailErrorFlag: false,
      errorLogZip: false,
      errorLogMobile: false,
      isLogggedin: false,
      isRegister: false
    }
  }


  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  handleAddQuantity = (foodMenuID) => {
    this.props.addQuantity(foodMenuID);
    // console.log(this.props)
  }

  handleSubtractQuantity = (foodMenuID) => {
    this.props.subtractQuantity(foodMenuID);
  }

  handleRemove = (foodMenuID) => {
    this.props.removeItem(foodMenuID);
  }

  async componentDidMount() {
    var x = this.props.history.location.state
    
    this.setState({
      cartDetail: this.props.initialcartDetail,
      addToCart: x
    })
    window.scrollTo(0, 0)
    
  }

  handleNumbersOnly = (e) => {
    this.setState({ quantity: e.target.value });
  }

  handleAddressSubmit = (e) => {
    e.preventDefault();
    if (this.state.errorLogZip === true) {
      this.setState({ index: 0, deliveryFlag: false })
      console.log("Incorrect ZIP Code")
    }
    if (this.state.errorLogMobile === true) {
      this.setState({ index: 0, deliveryFlag: false })
      console.log("Incorrect Mobile Number")
    }
    if (this.state.emailErrorFlag === true) {
      this.setState({ index: 0, deliveryFlag: false })
      console.log("Incorrect Email")
    }
    if ((this.state.emailErrorFlag === false) && (this.state.errorLogMobile === false) && (this.state.errorLogZip === false)) {
      this.setState({ index: 1, deliveryFlag: true })
      // console.log('Success')
    }
  }

  handlePreviousCheck = (e) => {
    this.setState({ index: 0 })
  }

  handlePaymentCheck = (e) => {
    if (this.state.deliveryFlag === true) {
      this.setState({ index: 1 })
    }
    else {
      alert("Please Fill The Delivery Address First To Continue")
      this.setState({ index: 0 })
    }
  }



  handleDeliveryReset = (e) => {
    this.setState({
      deliveryFlag: false
    })
  }

  handleDeliveryValidation = async e => {

    if (e.target.id === 'fullName') {
      const re = /^[a-zA-Z ]*$/;
      if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({ ShipFullName: e.target.value })
      }
      else { alert('Only Text Values Accepted') }
    }

    if (e.target.id === 'shipState') {
      const re = /^[a-zA-Z ]*$/;
      if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({ shipState: e.target.value })
      }
      else { alert('Only Text Values Accepted') }
    }

    if (e.target.id === 'shipCity') {
      const re = /^[a-zA-Z ]*$/;
      if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({ shipCity: e.target.value })
      }
      else { alert('Only Text Values Accepted') }
    }

    if (e.target.id === 'shipZIP') {
      const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({ ZIPvalue: e.target.value })
        if (this.state.ZIPvalue.length <= 4) {
          this.setState({ errorLogZip: true })
        }
        else { this.setState({ errorLogZip: false }) }
      }
      else { alert('Only Numbers are Allowed') }
    }

    if (e.target.id === 'shipMobile') {
      const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({ Mobilevalue: e.target.value })
        if (this.state.Mobilevalue.length <= 7) {
          this.setState({ errorLogMobile: true })
        }
        else { this.setState({ errorLogMobile: false }) }
      }
      else { alert('Only Numbers are Allowed') }
    }

    if (e.target.id === 'shipaddress') {
      const re = /^[#.0-9a-zA-Z\s,-]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({ shipaddress: e.target.value })
      }
      else { alert('Special Characters Not Allowed') }
    }

    if (e.target.id === 'shipLandmark') {
      const re = /^[#.0-9a-zA-Z\s,-]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({ shipLandmark: e.target.value })
      }
      else { alert('Special Characters Not Allowed') }
    }

    if (e.target.id === 'shipEmail') {
      var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      this.setState({ shipEmail: e.target.value })
      var email = this.state.shipEmail
      if (re.test(email)) { this.setState({ shipEmail: e.target.value, emailErrorFlag: false }) }
      else { this.setState({ emailErrorFlag: true }) }
    }
  }

  handleShopNow = e => {
    this.props.history.push('/')
  }

  handleLoggedIn = langValue => {
     this.setState({ isLogggedin: langValue });
  }

  handleRegister = registerValue => {
   this.setState({ isRegister: registerValue });
    console.log(this.props)
  }

  render() {
    
    var data = this.props.state;

    const { index } = this.state;
    return (
      <div className="mycart--section">
        <div className="cartMainData">
          <div className="">
            {
              this.props.items.length === 0 ?
                <div className="container">
                  <div className="text-center">

                    <p className="cartEmptyText">Your Cart is Empty.</p>
                    <p className="cartAddText">Please add items to it now</p>
                    <div>
                      <button className="food--cardAdd food--cardAddShopNow" onClick={this.handleShopNow}>Shop Now</button>
                    </div>
                  </div>
                </div>
                :

                <div className="InnerWrapper">
                  <div className="cartInfo">
                    <div className="container">
                      <div className="cartInfoCret" style={{ fontWeight: '900' }}>
                        Price are Inclusive of all taxes
                          </div>
                    </div>
                  </div>
                  <div className="container Cartcontainer">
                    <div className="row cartFlex" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                      <div className="col-md-8 vertivleBar">
                        {
                          data.isLoggedIn ?
                            <div>
                              <Tabs value={index} onChange={this.handleChange}>
                                <Tab label="Delivery Address" onClick={this.handlePreviousCheck} />
                                <Tab label="Payment" onClick={this.handlePaymentCheck} />
                              </Tabs>
                              <SwipeableViews disabled={true} index={index} onChangeIndex={this.handleChangeIndex}>
                                <div className="BillingData billDetails-Section">
                                  <form onSubmit={this.handleAddressSubmit}>
                                    <div className="fieldSets styled-input">
                                      <input id="fullName" type="text" ref="fullName" className="shipInputBox" required autoComplete="OFF" value={this.state.ShipFullName} onChange={this.handleDeliveryValidation} />
                                      <label className="inputLable" htmlFor="fullName">Full Name</label>
                                      <span></span>
                                    </div>

                                    <div className="fieldSets styled-input">
                                      <input id="shipaddress" type="text" ref="shipaddress" className="shipInputBox" required autoComplete="off" value={this.state.shipaddress} onChange={this.handleDeliveryValidation} />
                                      <label className="inputLable" htmlFor="shipaddress">Address</label>
                                      <span></span>
                                    </div>

                                    <div className="minFileds">
                                      <div className="fieldSets styled-input">
                                        <input id="shipLandmark" type="text" ref="shipLandmark" className="shipInputBox" required autoComplete="off" value={this.state.shipLandmark} onChange={this.handleDeliveryValidation} />
                                        <label className="inputLable" htmlFor="shipLandmark">Landmark</label>
                                        <span></span>
                                      </div>
                                      <div className="fieldSets styled-input">
                                        <input id="shipZIP" type="text" ref="shipZIP" className="shipInputBox" required autoComplete="off" maxLength={6} value={this.state.ZIPvalue} onChange={this.handleDeliveryValidation} />
                                        <label className="inputLable" htmlFor="shipZIP">ZIP Code</label>
                                        <span></span>
                                      </div>
                                    </div>

                                    <div className="minFileds">
                                      <div className="fieldSets styled-input">
                                        <input id="shipCity" type="text" ref="shipCity" className="shipInputBox" required autoComplete="off" value={this.state.shipCity} onChange={this.handleDeliveryValidation} />
                                        <label className="inputLable" htmlFor="shipCity">City</label>
                                        <span></span>
                                      </div>

                                      <div className="fieldSets styled-input">
                                        <input id="shipState" type="text" ref="shipState" className="shipInputBox" required autoComplete="off" value={this.state.shipState} onChange={this.handleDeliveryValidation} />
                                        <label className="inputLable" htmlFor="shipState">State</label>
                                        <span></span>
                                      </div>
                                    </div>

                                    <div className="minFileds">
                                      <div className="fieldSets styled-input">
                                        <input id="shipMobile" type="text" ref="shipMobile" className="shipInputBox" required autoComplete="off" maxLength={10} value={this.state.Mobilevalue} onChange={this.handleDeliveryValidation} />
                                        <label className="inputLable" htmlFor="shipMobile">Mobile Number</label>
                                        <span></span>
                                      </div>

                                      <div className="fieldSets styled-input">
                                        <input id="shipEmail" type="text" ref="shipEmail" className="shipInputBox" required autoComplete="off" value={this.state.shipEmail} onChange={this.handleDeliveryValidation} />
                                        <label className="inputLable" htmlFor="shipEmail">Email Address</label>
                                        <span></span>
                                      </div>
                                    </div>

                                    <div className="animatedBtn">
                                      <button className="btn fourth" type="reset" style={{ marginRight: '15px' }} onClick={this.handleDeliveryReset}>Reset</button>
                                      <button className="btn fourth" type="submit">Continue</button>
                                    </div>
                                  </form>
                                </div>
                                <div className="billDetails-Section">
                                  <MainScreen />
                                </div>
                              </SwipeableViews>
                            </div>
                            :

                            <div>
                              {
                                data.isRegister ?
                                <Register onSendRegisterUser={this.handleRegister} />
                                  :
                                  <Login onLoggedIn={this.handleLoggedIn} onSendLoginUser={this.handleRegister} />
                              }

                            </div>
                        }

                      </div>

                      <div className="col-md-4">
                        <div>
                          <div className="foodCartProductLISTS">
                            {
                              this.props.items.map(item =>
                                <div className="row" key={item.foodMenuID}>
                                  <div className="col-md-12">
                                    <div className="container-Home-CartproDetails">
                                      <div className="cartProduct_Name">
                                        <ul style={{ display: 'flex' }}>
                                          <li><span><img src={item.foodMenuProductPreferenceIcon} className="foodPreference" alt="" /></span> </li>
                                          <li><p>{item.foodMenutitle}</p></li>
                                        </ul>
                                      </div>
                                      <div className="foodDetailsCartRight">
                                        <div className="foodDetails--popUp foodDetails--Cart">
                                          <form className="plus-minus">
                                            <div className="value-button value-buttonDecrease" id="decreaseCart" value="Decrease Value"
                                              onClick={() => this.handleSubtractQuantity(item.foodMenuID)}>
                                            </div>
                                            <div className="plusmin"><input type="number" className="valueButtonCart" id={"numberCart_ " + item.foodMenuID} value={item.quantity} onChange={this.handleNumbersOnly} /></div>
                                            <div className="value-button value-buttonIncrease" id="increaseCart" value="Increase Value"
                                              onClick={() => this.handleAddQuantity(item.foodMenuID)}>
                                            </div>
                                          </form>
                                          <div className="thrashIcon" onClick={() => this.handleRemove(item.foodMenuID)}><i className="fa fa-trash"></i></div>
                                        </div>
                                        <div className="divCartportal">
                                          <p className="cartProTotal"><span><i className="fa fa-rupee"></i></span>{item.foodProductTotal}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="billDetails-Section">
                                <p className="biilldetailsHeader">Bill Details</p>
                                <p className="billItemsMain"><span className="billItemsT">Item Total</span><span className="billItemsMainP"><i className="fa fa-rupee"></i>{this.props.adData.subTotal}</span></p>
                                <p className="billItemsMain billItemsMainBorder"><span className="billItemsT">Restaurent Charges</span><span className="billItemsMainP"><i className="fa fa-rupee"></i>{this.props.adData.restaurentCharges}</span></p>
                                <p className="billItemsMain billItemsMainBorderTop"><span className="billItemsT">Delivery Charges</span><span className="billItemsMainP"><i className="fa fa-rupee"></i>{this.props.adData.deliveryCharges}</span></p>
                                <p className="billItemsMain billTotalMain"><span className="billItemsT">Total Payment</span><span className="billItemsMainP"><i className="fa fa-rupee"></i>
                                  {Number(this.props.adData.subTotal) + Number(this.props.adData.shippingCharge) + Number(this.props.adData.deliveryCharges)}
                                </span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            }
          </div>

        </div>
      </div>

    )
  }
}


const mapStateToProps = (state) => {
  return {
    state,
    items: state.addedItems,
    adData: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addQuantity: (foodMenuID) => { dispatch(addQuantity(foodMenuID)) },
    subtractQuantity: (foodMenuID) => { dispatch(subtractQuantity(foodMenuID)) },
    removeItem: (foodMenuID) => { dispatch(removeItem(foodMenuID)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCart)