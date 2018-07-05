import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import logo from "logo.svg";
import { List, InputItem, Toast, WingBlank, WhiteSpace, Button, Flex} from 'antd-mobile';
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
        backgroundAttachment:"fixed"
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
  
  const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
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

        return (            
            <div>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> upload
              </Button>
            </Upload>
            <br />        
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
