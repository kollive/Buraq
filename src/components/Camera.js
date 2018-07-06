import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import logo from "logo.svg";
import { List, InputItem, Toast, WingBlank, WhiteSpace, Button, Flex, NavBar, TabBar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import buraqlogo from "images/BuraqLogo.png";
import bgImg from "images/truckbg.jpg";
import "App.css";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import * as _ from "lodash";
import { bindActionCreators } from "redux";
import { types as authTypes } from "reducers/authreducer";
import { actions as authActions } from "reducers/authreducer";
import passwordRules from "password-rules";
import { Tooltip } from "reactstrap";
import { Container } from "reactstrap";
import { Upload, Button as AntBtn, Icon } from 'antd';
import 'antd/dist/antd.css';
import $ from 'jquery';
//import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import PropTypes from 'prop-types'

//import { actions as messageActions } from 'ducks/message'

const styles = {
    margin: 12,
    refresh: {
        display: "inline-block",
        position: "relative"
    },

    container: {
        overflow: "hidden",
        margin: "1px",
        width: "100%",
        height: "100vh",
        padding: "1px",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "100%",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat-none",
        backgroundColor: "#295878",
        backgroundAttachment: "fixed"
    },
};

const paperStyle = {
    height: "280px",
    width: "500px",
    margin: 20,
    textAlign: "center",
    display: "flex",
    justifyContent: "center"
};

const font11 = {
    color: "#0b4981",
    fontFamily: "Roboto,sans-serif",
    fontSize: "14px"
};

const fileList = [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}, {
    uid: -2,
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}];

//action: 'http://localhost:3003/apiupload',
const props = {
    action: 'http://hvs.selfip.net:3003/apiupload',
    listType: 'picture',
    defaultFileList: [...fileList],
};

const props2 = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    defaultFileList: [...fileList],
    className: 'upload-list-inline',
};


class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isLoading: false,
            error: null,
            items: [],
            message: "",
            value: "",
            tooltipOpen: false,
            txtUser: "",
            txtPwd: "",
            hasError: false,
            value: '',
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
            width:  400,
            height: 460
        };

        this.handleChange = this.handleChange.bind(this);
        this.tooltipToggle = this.tooltipToggle.bind(this);
        this.onChange = this.onChange.bind(this)
    }


     /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
        let update_width  = window.innerWidth - 20;
        let update_height = window.innerHeight - 50//Math.round(update_width/4.4);
        this.setState({ width: update_width, height: update_height });
    /*
    if(window.innerWidth < 500) {
      this.setState({ width: 450, height: 460 });
    } else {
      let update_width  = window.innerWidth;//-100;
      let update_height = window.innerHeight//Math.round(update_width/4.4);
      this.setState({ width: update_width, height: update_height });
    }
    */
  }


    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }

    onChange = (value, ctrl) => {

        if (_.trim(value) == "") {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }

        if (ctrl == "user") {
            this.setState({
                txtUser: value
            });
        } else {
            this.setState({
                txtPwd: value
            });
        }
    }

    tooltipToggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    handleChange = (event, index, value) => {
        this.setState({ value });
    };

    fetchData(url) {
        this.setState({ isLoading: true });
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                this.setState({ isLoading: false });
                return response;
            })
            .then(response => response.json())
            .then(items => this.setState({ items }))
            .catch(() => this.setState({ hasErrored: true }));
    }

    componentDidUpdate(prevProps, prevState) {
        //componentWillReceiveProps(nextProps) {
        //debugger;
        if (this.props.authState.message.msg == "ok") {
            debugger;
            this.setState({ isLoading: false, name: this.props.authState.name });
            this.props.resetMessage({
                type: authTypes.MESSAGE,
                message: ""
            });
            this.props.history.push("/tabs", ...this.state);
            //this.props.history.push('/test', ...this.state);
        } else {

            if (
                _.trim(this.props.authState.message.msg) != "" &&
                this.props.authState.message.msg != "ok"
            ) {
                //alert("msg")
                this.setState({ isLoading: false });
                alert(this.props.authState.message.msg);

                this.props.resetMessage({
                    type: authTypes.MESSAGE,
                    message: { val: 0, msg: "" }
                });

                this.setState({
                    txtUser: "",
                    txtPwd: ""
                });
                this.txtUser.focus();
                //alert(this.props.authState.message.val)
                if (this.props.authState.message.val == -2) {
                    this.props.history.push("/changepwd");
                }

                //Reset the message
            }
        }
    }

    changePWD = () => {
        this.props.history.push("/changepwd", ...this.state);
    };

    forgotPWD = () => {
        this.props.history.push("/forgotpwd", ...this.state);
    };

    reorient = (e) => {
        var portrait = (window.orientation % 180 == 0);
        $("body > div").css("-webkit-transform", !portrait ? "rotate(-90deg)" : "");
    }

    componentDidMount() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.onorientationchange = this.reorient;
            window.setTimeout(this.reorient, 0);
        }        

        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
        //this.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
    }

    /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
    
   

    handleKeyPress = event => {
        debugger;
        if (event.target.charCode == 13) {
            alert("Enter clicked!!!");
        }
    };

    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> upload
              </Button>
                </Upload>
                <br />
                <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            hidden: !this.state.hidden,
                        });
                    }}
                >
                    Click to show/hide tab-bar
            </a>
                <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            fullScreen: !this.state.fullScreen,
                        });
                    }}
                >
                    Click to switch fullscreen
            </a>
            </div>
        );
    }


    render() {
        if (this.state.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        return (
        
            <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: this.state.height }}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >Buraq</NavBar>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="Life"
                        key="Life"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selected={this.state.selectedTab === 'blueTab'}
                        badge={1}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent('Life')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="Koubei"
                        key="Koubei"
                        badge={'new'}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                        data-seed="logId1"
                    >
                        {this.renderContent('Koubei')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="Friend"
                        key="Friend"
                        dot
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}
                    >
                        {this.renderContent('Friend')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                        title="My"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                        }}
                    >
                        {this.renderContent('My')}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

Camera.defaultProps = {};


const mapStateToProps = state => {
    return {
        authState: state.authState
    };
};

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            ...authActions
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
//export default App;
