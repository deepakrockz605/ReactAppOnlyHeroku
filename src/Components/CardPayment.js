import React, { Component } from 'react';
import ReactCardPayment from 'react-card-payment';

export default class CardPayment extends Component {
    constructor(props) {
        super(props);
        this.state ={}
    }

    handlePaymentSubmit = (e) =>{
        e.preventDefault()
      }

    render() {
        return (
            <div className="BillingData">
                <ReactCardPayment {...{
                    labelCardNumber: "Card number",
                    labelMonth: "Month",
                    labelYear: "Year",
                    labelCardHolder: "Cardholder name",
                    button: "Pay",
                
                    placeholderCardnumber: "0000 0000 0000 0000",
                    placeholderMonth: "00",
                    placeholderYear: "00",
                    placeholderCardHolder: "JOHN DOE",
                    placeholderCvv: "000"
                  }} />
              </div>
        )
    }
}
