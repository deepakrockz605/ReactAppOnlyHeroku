import React, { Component } from 'react'
// import Home from './Home';
import OurStory from './OurStory'
import DeliciousFoodMenu from './DeliciousFoodMenu'
import GetIntouch from './GetIntouch'
import FoodDetails from './FoodDetails'
import { Route, Switch } from 'react-router';
import MyCart from './Mycart'
import ThankYou from './ThankYou'
import Login from './Login'
import { Redirect } from 'react-router-dom';
import Register from './Register'
 
export default class RestrictedContainer extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={DeliciousFoodMenu  } />
                <Route exact path="/our-story" component={OurStory} />
                <Route exact path="/food-menu" component={DeliciousFoodMenu} />
                <Route exact path="/get-in-touch" component={GetIntouch} />
                <Route exact path="/cart" component={MyCart} />
                <Route exact path="/product-Details" component={FoodDetails} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Redirect from='/cart' to="/" />
                <Route exact path="/thank-you" component={ThankYou} />
                
            </Switch>
        )
    }
}
