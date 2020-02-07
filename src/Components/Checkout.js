import React, { Component } from 'react'
import { connect } from 'react-redux';



class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (

      <div className="shopping--cartList primary-box-shadow padding-20 margin-top-20">
        <p className="shoppingCart--Header color-2e2e2e open_sanssemibold font-16">Total Payment</p>
        <div className="product--Details">
          <table>
            <tbody>
              <tr>
                <td><span className="open_sanssemibold color-4d4d4f font-14 subTotal"> Subtotal : </span></td>
                <td><span className="open_sanssemibold color-4d4d4f font-16 subTotal subTotalValue"><i className="fa fa-inr" aria-hidden="true"></i><span className="subTotalValue">  </span></span></td>
              </tr>

              <tr>
                <td><span className="open_sanssemibold color-4d4d4f font-14 subTotal"> Shipping Charges : </span></td>
                <td><span className="open_sanssemibold color-4d4d4f font-16 subTotal subTotalValue"><i className="fa fa-inr" aria-hidden="true"></i><span className="subTotalValue">{this.props.adData.shippingCharge}</span></span></td>
              </tr>

              <tr>
                <td><span className="open_sanssemibold color-4d4d4f font-14 subTotal"> Total : </span></td>
                <td><span className="open_sanssemibold color-4d4d4f font-16 subTotal subTotalValue"><i className="fa fa-inr" aria-hidden="true"></i><span className="subTotalValue">{Number(this.props.adData.subTotal) + Number(this.props.adData.shippingCharge)}</span></span></td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    adData: state
  }
}


export default connect(mapStateToProps)(Checkout)