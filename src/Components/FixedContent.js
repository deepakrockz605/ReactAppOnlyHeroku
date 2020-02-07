import React, { Component } from 'react'
import Navbar from './Navbar'

export default class FixedContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    OpenValue = (value) => {
        this.props.NavbarstatusPass(value);
    }

    render() {
        return (
            <div className="InnerWrapper">
                <div className="container-Home">
                    <div className="sse">
                        <Navbar Navbarstatus={this.OpenValue} />
                    </div>
                    <div>
                    </div>
                </div>

            </div>
        )
    }
}
