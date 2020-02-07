import React, { Component } from 'react'
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import Home from './Home'

var _ = require('lodash');

class OurStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storydata: [],
            show: false,
            selectID: ""
        };
    }

    handleClick = (e) => {
        var x = e.currentTarget.id;
        this.setState({
            show: !this.state.show,
            selectID: x
        });
    }

    async componentWillMount() {
        console.log(this.props.storydata)
        this.setState({
            storydata: this.props
        })
    }

    componentDidMount() {
        window.scrollTo(0, 580)
    }

    render() {
        var StoryList = _.filter(this.props.storydata);
        return (
            <div>
                <Home />
                <div className="ourStory--section paddling-top-20 paddling-bottom-30 paddling-bottom-30 our-storyChef">
                    <div className="container">
                        <div id="StoryHead---section">
                            {
                                StoryList.map((index, key) =>
                                    <section className="story--dishSection" key={key}>
                                        <div className="story--subHeader-box">
                                            <h2 className="story--subHeader text-center">{index.storyTitle}</h2>
                                            <h1 className="text-center open_sanssemibold color-2e2e2e story--Header">
                                                {index.storySubTitle}
                                            </h1>
                                            <span className="border-dotCircle"></span>
                                        </div>
                                        <div>
                                            <p className="story--paraInfo">
                                                {index.storyInfo}
                                            </p>
                                        </div>

                                        <div className="updated--storySubSection">
                                            <div className="text-center">
                                                <img src={index.storyMiddleImage} alt="middleImage" className="img-responsive storyInfoImg" title="Please Click on Plus Icons to Get More Information" />
                                            </div>

                                            <div className="storySubSection--Left">
                                                <div>
                                                    <div className={index.storysubSectionLeftDish}>
                                                        {
                                                            this.state.selectID === key + "ini1" ?
                                                                <div className={index.storySubSectionClass}>
                                                                    <Fade bottom><img src={index.animateImageClassImage1} alt="img" className={index.animateImageClass1} /> </Fade>
                                                                    <Fade left delay={index.fadeLeftDelay}><img src={index.animateImageClassImage2} alt="img" className={index.animateImageClass2} /></Fade>

                                                                    <Fade left delay={index.fadeLeftDelay}>
                                                                        <h6 className="open_sanssemibold color-2e2e2e font-16 ourStory--pathSet--header--1 text-left">{index.storyProductTitleLeft}</h6>
                                                                        <p className="ourStory--pathInfo-1 color-2e2e2e font-14 open_sansregular">{index.storyProductInfoLeft}</p>
                                                                    </Fade>
                                                                </div>
                                                                : null
                                                        }
                                                    </div>
                                                    <div className={index.selectPlusIconOne} onClick={this.handleClick} id={key + "ini1"}>
                                                        <img src={require('../Images/grpCircl.png')} alt="middleImage" className="img-responsive" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="storySubSection--Right">
                                                <div>
                                                    <div className={index.storysubSectionRightDish}>
                                                        {
                                                            this.state.selectID === key + "ini2" ?
                                                                <div className={index.storySubSectionClass}>
                                                                    <Fade top><img src={index.animateImageClassImage3} alt="img" className={index.animateImageClass3} /> </Fade>
                                                                    <Fade right delay={index.fadeRightDelay}><img src={index.animateImageClassImage4} alt="img" className={index.animateImageClass4} /></Fade>

                                                                    <Fade right delay={index.fadeRightDelay}>
                                                                        <h6 className="open_sanssemibold color-2e2e2e font-16 ourStory--pathSet--header ourStory--pathSet--header--1 text-right">{index.storyProductTitleRight}</h6>
                                                                        <p className="ourStory--pathInfo-1 color-2e2e2e font-14 open_sansregular"> {index.storyProductInfoRight}</p>
                                                                    </Fade>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                    <div className={index.selectPlusIconTwo} onClick={this.handleClick} id={key + "ini2"} >
                                                        <img src={require('../Images/grpCircl.png')} alt="middleImage" className="img-responsive" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </section>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        storydata: state.Storytems
    }
}

export default connect(mapStateToProps)(OurStory)