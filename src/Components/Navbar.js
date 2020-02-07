import React, { Component } from 'react'
import { Link , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCartQuantity , logOut } from '../actions/cartActions'
import { compose } from 'redux'


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            cartCount: 0,
            hoverUser: false,
            userLogeedin: false
        };
    }

    onSetSidebarOpen = open => {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
        this.props.Navbarstatus(open);
    }

    componentDidMount = async e => {
        this.props.updateCartQuantity(this.props.item.addedItems.foodMenuID, this.state.quantity);
        this.setState({ cartCount: this.props.item.addedItems.length })
        
    }

    // componentDidUpdate(){
    //     if(this.props.state.isLoggedIn === true){
    //         this.stateChange(this.props.state.isLoggedIn);
    //     }
    // }

    // stateChange = e =>{
    //     this.props.history.push('/')
    // }

    handleUser = e => {
        this.setState({
            hoverUser: !this.state.hoverUser
        })
    }

    logout = e => {
        this.props.logOut(this.props.state.isLoggedIn);
    }


    render() {
        var data = this.props.state;
        console.log(this.props)
        return (
            <section className="navbar--section">
                <div>
                    <div className="fixedNavbar">
                        <div className="navbarBox">
                            <div className="logoClickbtn">
                                <button className="logo-btn" onClick={() => this.onSetSidebarOpen(true)} >
                                    <div className={this.state.sidebarOpen ? 'menu-link-wrapper menu-link-wrapperone' : 'menu-link-wrapper'}>
                                        <div className="menu-link">
                                            <span className="lines"></span>
                                            <span className="lines"></span>
                                            <span className="lines"></span>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <Link to="/" className="delicious--logo">
                                <img src={require('../Images/logo.svg')} alt="logo" className="delicious--image" />
                            </Link>
                            <div className="callIcon--section">
                                <div className="callIcon--UserLog position-relative">
                                    {
                                        this.state.hoverUser ?
                                            <div className="callIcon--UserLogActive">
                                                {
                                                    this.props.state.isLoggedIn ?
                                                        <div>
                                                            <p className="ActiveUsername">{data.email}</p>
                                                            <ul className="ActiveUsernameUl">
                                                                <li className="ActiveUsernameList"><span>Profile</span></li>
                                                                <li className="ActiveUsernameList"><span>View Cart</span></li>
                                                                <li className="ActiveUsernameList"><span>View History</span></li>
                                                                <li className="ActiveUsernameList" onClick={()=>{this.logout()}}><span>Logout</span></li>
                                                            </ul>
                                                        </div>
                                                        :
                                                        <div className="loginRegister">
                                                            <Link to="/login">Login / Register</Link>
                                                        </div>
                                                }
                                            </div> : null
                                    }
                                    <p className="position-relative"><span className="HomeCart--Login" onClick={this.handleUser}></span></p>
                                </div>



                                <Link to="/cart" className="flex align-items-center mycart">
                                    <p className="position-relative">
                                        <span className="HomeCart--icon"></span>
                                        <span className="cartCount">{this.props.item.addedItems.length}</span>
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {
                        this.state.sidebarOpen ?
                            <div className="sidebar--Space">
                                <span><img src={require('../Images/logo.svg')} alt="logo" className="delicious--Sidebarimage" /></span>
                                <ul className="sidebar--list" onClick={() => this.onSetSidebarOpen(false)}  >
                                    <Link to="/food-menu"><li className="sidebar--itemlist" >We Are Food Masters</li></Link>
                                    <Link to="/food-menu"><li className="sidebar--itemlist">Delicious Menu</li></Link>
                                    <Link to="/our-story"><li className="sidebar--itemlist">Our Story</li></Link>
                                    <Link to="/get-in-touch"><li className="sidebar--itemlist">Get in touch</li></Link>
                                    <Link to="/cart"><li className="sidebar--itemlist" >My Cart</li></Link>
                                </ul>
                            </div>
                            :
                            <div className="sidebar--NoSpace"></div>
                    }

                    {this.state.sidebarOpen ? <div className="overlayWrapper" onClick={() => this.onSetSidebarOpen(false)} ></div> : null}

                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        item: state,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCartQuantity: (productId, quantity) => dispatch(updateCartQuantity(productId, quantity)),
        logOut: () => dispatch(logOut())
        // onLoggedIn: () => dispatch(onLoggedIn())
        
    }
}


// export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
  )(Navbar);