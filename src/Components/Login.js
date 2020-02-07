import React, { Component } from 'react'
import { login } from './UserFunctions'
import { connect } from 'react-redux';
import { onLoggedIn , onSendLoginUser } from '../actions/cartActions'
// import toastr from 'toastr'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      isLogggedin: false,
      isRegister: false,
      navUser : false
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = async e => {
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      if (!res.error) {
        alert(res.success)
        // toastr.success("Success")
        this.setState({ isLogggedin: true })
        var lang = this.state.isLogggedin;
        this.props.onLoggedIn(user , lang);
        // console.log(this.props)
        // if(this.props.state.navUser){
        //   this.props.history.push('/')
        // }
      }
      else {
        alert(res.error)
        // toastr.error("Error")
        this.setState({ isLogggedin: false })
        lang = this.state.isLogggedin;
        this.props.onLoggedIn(user , lang);
      }
    })
  }

  handleSignUpEvent = async e => {
    // debugger
    await this.setState({ isRegister: true })
    var x = this.state.isRegister;
    await this.props.onSendLoginUser(x);
  }

  handleForgotPassword = e => {
    alert("Clicked on Forgot Password")
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
                <div className="loggINBXT">
                  <p className="welcomeSignInInfo">Please Sign In to Restaurant</p>
                  <div className="signInBox">
                    <p className="open_sanssemibold enterDetails">Enter Details</p>
                    <div className="signIn_InnerBx">
                      <form noValidate onSubmit={(e)=>{this.onSubmit(e.preventDefault())}}>

                        <div className="form-group">
                          <input type="text" className="form-control input_user" name="email" placeholder="Email" value={this.state.email} onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                          <input type="text" className="form-control input_pass" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange} />
                        </div>

                        <p className="forgotpsSgn"><span style={{ cursor: 'pointer' }} onClick={this.handleForgotPassword}>Forgot Password?</span></p>

                        <div className="form-group form-groupSubmit">
                          <input type="submit" className="btn btn-primary" value="Login" />
                        </div>

                      </form>

                      <div>
                        <p className="accountCreation">
                          <span>Don't have an account? </span><span className="accountCreationSpan" onClick={()=>{this.handleSignUpEvent()}}>Sign Up</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
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
    onLoggedIn: (user ,lang) => { dispatch(onLoggedIn(user ,lang))},
    onSendLoginUser: (x) => { dispatch(onSendLoginUser(x))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)