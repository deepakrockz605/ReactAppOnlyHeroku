import React, { Component } from 'react'
import { connect } from 'react-redux';
import FoodDetails from './FoodDetails'
import Home from './Home'

var _ = require('lodash');

class DeliciousFoodMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LunchMenu: [],
            foodmenuHover : false,
            addText : false,
            addValue : '',
            Products: [],
            showPopup: false,
            id:"",
            cartValue:'View'
        };
    }

    async componentWillMount(){
         this.setState({
            LunchMenu: this.props,
            Products: this.props.initialStateMenuLunch
         })
     }

     componentDidMount() {
        window.scrollTo(0, 580)
      }
     
     hoverHandler = (e) => {
         var z = parseInt(e.target.id);
         this.setState({
            foodmenuHover : !this.state.foodmenuHover,
            key : z
         })
     }

     hoverLeaveHandler = () =>{
         this.setState({
             foodmenuHover : false
         })
     }

     handleAddClick = (e,id) =>{
         var add = (e.target.id);
         this.setState({
             addText : !this.state.addText,
             key : add 
         })
     }

     togglePopup = (e) =>{
         var id= parseInt(e.target.id);
        this.setState({
            showPopup : !this.state.showPopup,
            id:id,
        })
        // console.log(id)
     }

     handleClosepopUp = () =>{
        this.setState({
            showPopup : false
        })
     }
     
     handlePopStatus = (value) =>{
        this.setState({
            showPopup: value
        })
     }

     handleAddCartStatus = (status) =>{
        console.log('cart status')
     }

    render() {

        var LunchList = _.filter(this.props.Lunchitems);
        var BarList = _.filter(this.props.Baritems);
        
        return (
            <div>
                <Home />
                <div className="ourStory--section paddling-top-20 paddling-bottom-30" id="Delicious---section" style={{"height": "400px"}}>
                 <div className="container">
                    <section className="story--dishSectionMenu">
                        <div className="story--subHeader-box">
                            <h2 className="story--subHeader text-center">LUNCH / DINNER</h2>
                            <h1 className="text-center open_sanssemibold color-2e2e2e story--Header">Delicious Food Menu</h1>
                            <span className="border-dotCircle"></span>
                        </div>
                        <div>
                            <p className="story--paraInfo">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book.
                            </p>
                        </div>

                        <div className="food--menuMainSection">
                            <div className="food--cardList">

                    {
                        LunchList.map((index,key)=>
                        <div className="food--card" key={index.foodMenuID} id={index.foodMenuID}>
                               
    <div>
                                        <img id={index.foodMenuID} src={index.foodMenuProductImage} alt="" className="food--cardIcon" onClick={this.togglePopup} />
                                        {
                                            this.state.showPopup && index.foodMenuID === this.state.id ?
                                            <FoodDetails showPopup={this.state.showPopup} data={index} keyx={index.foodMenuID} popupStaus= {this.handlePopStatus} history={this.props.history} />
                                            :
                                            null
                                        }
                                    </div>
                               
                                    <div>
                                        <ul className="foodPreferenceList">
                                            <li><span><img src= {index.foodMenuProductPreferenceIcon} className="foodPreference" alt=""/></span></li>
                                            <li><p className="food--cardHeader">{index.foodMenutitle}</p></li>
                                        </ul>
                                        
                                        <p className="food--cardStarter font-14 open_sansregular color-ccc">{index.foodMenuProductType}</p>
                                    </div>
                                    <div className="food--cardCartDetails">
                                        <div>
                                            <span className="food--cardAmount open_sansbold"><span><i className="fa fa-rupee"></i></span>{index.foodMenuProductPrice}</span>
                                            <span className="food--cardAmountStrike open_sansregular"><span><i className="fa fa-rupee"></i></span>{index.foodMenuProductStrikePrice}</span>
                                            </div>
                                        <span>
                                            <button disabled={index.foodMenuProductInCart ? true : false} 
                                                    className="btn food--cardAdd open_sansbold" 
                                                    // onClick = {this.handleAddCartStatus}
                                                    onClick={this.togglePopup} 
                                                    id ={index.foodMenuID}  >
                                                    {this.state.cartValue}
                                            </button>
                                        </span>
                                    </div>
                            </div>
                        )} 
                            </div>
                        </div>

                        
                    </section>

                    <section className="story--dishSectionMenu">
                        <div className="story--subHeader-box">
                            <h2 className="story--subHeader text-center">FROM THE BAR</h2>
                            <h1 className="text-center open_sanssemibold color-2e2e2e story--Header">Delicious Bar Menu</h1>
                            <span className="border-dotCircle"></span>
                        </div>
                        <div>
                            <p className="story--paraInfo">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book.
                            </p>
                        </div>

                        <div className="foodMenu--section">
                            <div className="foodmenu--stack">
                                 {
                                    BarList.map((index,key)=> 
                                    <div className="foodMenu BarMenu" key={key}>
                                        <div className="foodMenuInfo">
                                            <h3 className="foodMenu--title open_sanssemibold color-2e2e2e font-20">{index.barMenutitle}</h3>
                                            <p className="foodMenu--productInfo color-2e2e2e open_sansregular font-14">{index.barMenuProductInfo}</p>
                                        </div>
                                        <div className="foodMenuPrice">
                                            <h3 className="foodMenu--productPrice open_sanssemibold color-2e2e2e font-20">${index.barMenuProductPrice}</h3>
                                        </div>
                                    </div>
                                    )
                                } 
                            </div>
                        </div>
                    </section>
                </div> 
                </div>
            </div>
        )
    }
}


// DeliciousFoodMenu.props = {
//     MenuLunchAction: PropTypes.func.isRequired,
//     MenuBarAction: PropTypes.func.isRequired,
// }

// export default connect(state => state.menulunchdata, { MenuLunchAction, MenuBarAction }) (DeliciousFoodMenu);
// export default DeliciousFoodMenu


const mapStateToProps = (state)=>{
    return {
        Lunchitems: state.Lunchitems,
        Baritems: state.Baritems,
    }
  }

export default connect(mapStateToProps)(DeliciousFoodMenu)