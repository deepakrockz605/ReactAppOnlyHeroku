import React, { Component } from 'react'

import FixedContent from './FixedContent'


export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    handleNavbar = async (open) => {
        await this.setState({
            isOpen: open
        })
    }



    componentDidMount() { }

    render() {
        return (
            <div className={this.state.isOpen ? 'mainWrapper' : ''}>
                <FixedContent NavbarstatusPass={this.handleNavbar} />
                <div className="corporate-wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
