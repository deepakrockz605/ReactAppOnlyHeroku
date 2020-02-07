import React, { Component } from 'react'
import { register } from './UserFunctions'
import { connect } from 'react-redux';
import { onSendRegisterUser , onSendLoginUser } from '../actions/cartActions'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      isRegister: false
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();
    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }

    register(user).then(res => {
      if(res.data.error){
        alert(res.data.error)
      }
      else{
        this.props.onSendRegisterUser(user);
        alert(res.data.status)
      }
    })
  }


   handlelogin = e => {
    this.setState({ isRegister: false })
    this.props.onSendLoginUser(this.state.isRegister);
  }

  render() {
    return (
      <div className="userLogin--section">
        <div className="loginMainData cartMainData">
          <div className="container h-100">
            <div className="loginPage">
              <div className="">
                <p className="loginImg"><img src={require('../Images/deleiciousIcon.png')} alt="" /></p>
                <p className="welcomeSignIn">Welcome</p>
                <div className="RegisterBXT">
                  <p className="welcomeSignInInfo">Please Sign In to Restaurant</p>
                  <div className="signInBox">
                    <p className="open_sanssemibold enterDetails">Enter Details</p>
                    <div className="signIn_InnerBx">
                      <form noValidate onSubmit={this.onSubmit}>

                        <div className="form-group">
                          <input type="text" className="form-control" name="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.onChange} required />
                        </div>

                        <div className="form-group">
                          <input type="text" className="form-control" name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.onChange} required />
                        </div>

                        <div className="form-group">
                          <input type="email" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.onChange} required />
                        </div>

                        <div className="form-group">
                          <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange} required />
                        </div>

                        <div className="form-group form-groupSubmit">
                          <input type="submit" className="btn btn-primary" value="Register" />
                        </div>

                      </form>

                      <div>
                        <p className="accountCreation">
                          <span>Already have an account? </span><span className="accountCreationSpan" onClick={this.handlelogin}>Log In</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="socialBtns">
                  <button className="btn btnSocial faceBookBtn"><i className="fa fa-facebook"></i></button>
                  <button className="btn btnSocial googleBtn"><i className="fa fa-google-plus"></i></button>
                  <button className="btn btnSocial linedinBtn"><i className="fa fa-linkedin"></i></button>
                </div>
              </div></div></div></div></div>



    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSendRegisterUser: (user) => { dispatch(onSendRegisterUser(user))},
    onSendLoginUser: (lang) => { dispatch(onSendLoginUser(lang))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)