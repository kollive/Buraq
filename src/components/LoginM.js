import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import logo from "logo.svg";
import { List, InputItem, Toast, WingBlank, WhiteSpace, Button, Flex } from 'antd-mobile';
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

//import { actions as messageActions } from 'ducks/message'

const styles = {
    margin: 12,
    refresh: {
        display: "inline-block",
        position: "relative"
    },

    container: {
        overflow: "hidden",
        margin: "0px",
        width: "100%",
        height: "100vh",
        padding: "0px",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "100%",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat-none",
        backgroundColor: "#295878",
        backgroundAttachment: "fixed"
    }
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

class LoginM extends Component {
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
        };

        this.handleChange = this.handleChange.bind(this);
        this.tooltipToggle = this.tooltipToggle.bind(this);
        this.onChange = this.onChange.bind(this)
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

    componentDidMount() {
        //this.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
    }

    _handleTouchTap = () => {

        //ReactDOM.findDOMNode(this.refs["txtUser"]).focus()
        if (this.state.txtUser == "") {
            alert("Please Enter User ID");
            this.txtUser.focus();
            return false;
        }

        if (this.state.txtPwd == "") {
            alert("Please Enter Password");
            this.txtPwd.focus();
            return false;
        }

        let invalidPWD = passwordRules(this.state.txtPwd, {
            requireSpecial: true
        });

        if (!invalidPWD || 1 === 1) {
            //debugger;
            this.setState({ isLoading: true });

            this.props.login({
                type: authTypes.LOGIN_REQUEST,
                payload: {
                    user: this.state.txtUser,
                    password: this.state.txtPwd
                }
            });
        } else {
            let msg = "";
            console.log(invalidPWD);

            msg = invalidPWD.issues.reduce((prev, current) => {
                //debugger;
                return prev + current.message + "\n";
            }, "");
            alert(msg);
        }
        //this.context.router.history.push('/grid');
    };

    handleKeyPress = event => {
        debugger;
        if (event.target.charCode == 13) {
            alert("Enter clicked!!!");
        }
    };

    render() {
        if (this.state.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        /*
        return (      
        )

         <Tooltip
                        placement="right"
                        isOpen={this.state.tooltipOpen}
                        target="txtPassword"
                        toggle={this.tooltipToggle}
                    >
                        Password must be at least 8 letters long<br />
                        Password must contain a Capital letter<br />
                        Password must contain a number<br />
                        Password must contain a special character<br />
                    </Tooltip>
        
        <div style={{height:"21vh",backgroundImage:`url(${clientlogo})`,backgroundRepeat:"no-repeat",backgroundSize:"10%",backgroundPosition:"center"}}></div>
               <img src={clientlogo} className="img-fluid"/>
         <img src={clientlogo} className="mx-auto"  />
        {this.props.authState.message == "ok" ? (<div style={font11}> Log on Succesfull </div>) : this.props.authState.message}
<List.Item> Welcome to Buraq!! <List.Item.Brief>Login</List.Item.Brief></List.Item>
        style={paperStyle}
        */

        return (
            <div style={styles.container}>
                <Flex align="center" justify="center" alignContent="center" style={{ height: "100vh" }} >
                    <Flex.Item>
                        <WingBlank size="lg">
                            <List renderHeader={() => ''} >
                                <List.Item><div style={{ width: "100%", minWidth: '100px', height: "100px" }}><span className="d-flex justify-content-center"><img style={{ width: "100px", minWidth: '100px', height: "100px" }} src={buraqlogo} /> </span></div> </List.Item>

                                <InputItem
                                    style={font11}
                                    type="text"
                                    placeholder="Enter userID"
                                    error={this.state.hasError}
                                    onErrorClick={this.onErrorClick}
                                    onChange={(val) => this.onChange(val, "user")}
                                    value={this.state.txtUser}
                                    ref={el => this.txtUser = el}
                                >User ID:</InputItem>
                                <InputItem
                                    style={font11}
                                    type="password"
                                    id="txtPassword"
                                    placeholder="Enter Password"
                                    error={this.state.hasError}
                                    onErrorClick={this.onErrorClick}
                                    onChange={(val) => this.onChange(val, "pwd")}
                                    value={this.state.txtPwd}
                                    ref={el => this.txtPwd = el}
                                    onKeyPress={ev => {
                                        //console.log(`Pressed keyCode ${ev.key}`);
                                        if (ev.key === "Enter") {
                                            // Do code here
                                            this._handleTouchTap();
                                            ev.preventDefault();
                                        }
                                    }}
                                >Password:</InputItem>

                                <List.Item>
                                    <div
                                        style={{
                                            width: '100%', color: '#108ee9', textAlign: 'center',
                                            fontSize: "14px"
                                        }}
                                        onClick={this.handleClick}
                                    >
                                        <h6
                                            style={{ cursor: "pointer" }}
                                            onClick={this.forgotPWD}
                                        >
                                            Forgot password?
                        </h6>{" "}
                                        {""}{" "}
                                        <h6
                                            style={{ cursor: "pointer" }}
                                            onClick={this.changePWD}
                                        >
                                            Change password
                            </h6>{" "}
                                    </div>
                                </List.Item>
                                <List.Item>
                                    <Button style={font11} style={{ color: "white" }} type="primary" onClick={this._handleTouchTap}>Login</Button><WhiteSpace />
                                </List.Item>
                            </List>


                        </WingBlank>
                    </Flex.Item>
                </Flex>
            </div>

        );
    }
}

LoginM.defaultProps = {};

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginM);
//export default App;
