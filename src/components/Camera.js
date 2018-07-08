import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import logo from "logo.svg";
import { List, InputItem, Toast, WingBlank, WhiteSpace, Flex, NavBar, TabBar } from 'antd-mobile';
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
import {
    Button, Icon, Row, Col, Form, Select, InputNumber, Switch, Radio, Table,
    Slider, Upload, Rate, Menu, Dropdown, message, Popconfirm, DatePicker, Input
} from 'antd';
import 'antd/dist/antd.css';
import $ from 'jquery';
import moment from 'moment';
//import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import PropTypes from 'prop-types'

//import { actions as messageActions } from 'ducks/message'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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

const fileList = [];
/*{
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
}*/
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
            width: 400,
            height: 460,
            filteredInfo: null,
            sortedInfo: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.tooltipToggle = this.tooltipToggle.bind(this);
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    /**
  * Calculate & Update state of new dimensions
  */
    updateDimensions() {
        let update_width = window.innerWidth - 20;
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
    /*
        handleChange = (event, index, value) => {
            this.setState({ value });
        };
        */

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

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

    handleSubmit = (e) => {
        debugger;
        e.preventDefault();
        /*
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        */

        //console.log(this.props.form.getFieldsError());
        //console.log(this.props.form.getFieldsValue());

        this.props.form.validateFields((err, fieldsValue) => {
            debugger;
            if (err) {
                return;
            }

            if (new Date(fieldsValue['taskStartDate']) > new Date(fieldsValue['taskEndDate'])) {
                alert("Please select Start date less than end date");
                return false;
            }

            // Should format date value before submit.
            //const rangeValue = fieldsValue['range-picker'];
            //const rangeTimeValue = fieldsValue['range-time-picker'];
            const values = {
                ...fieldsValue,
                'changeOrder': fieldsValue['changeOrder'],
                'taskName': fieldsValue['taskName'],
                'taskDesc': fieldsValue['taskDesc'],
                'taskStartDate': fieldsValue['taskStartDate'].format('YYYY-MM-DD'),
                'taskEndDate': fieldsValue['taskEndDate'].format('YYYY-MM-DD'),
                'taskStatus': fieldsValue['taskStatus'],
            };
            console.log('Received values of form: ', values);

            this.saveTask(values);
        });
    }


    handleKeyPress = event => {
        debugger;
        if (event.target.charCode == 13) {
            alert("Enter clicked!!!");
        }
    };

    renderContent(pageText) {

        if (pageText == "DashBoard") {

            let { sortedInfo, filteredInfo } = this.state;
            sortedInfo = sortedInfo || {};
            filteredInfo = filteredInfo || {};
    
            const columns = [{
                title: 'Name',
                dataIndex: 'name',
                width: 100,
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            }, {
                title: 'Rate',
                dataIndex: 'rate',
                width: 50,
                sorter: (a, b) => a.rate - b.rate,
                sortOrder: sortedInfo.columnKey === 'rate' && sortedInfo.order,
            }, {
                title: 'PO Number',
                dataIndex: 'po',
                sorter: (a, b) => a.po.length - b.po.length,
                sortOrder: sortedInfo.columnKey === 'po' && sortedInfo.order,
            }];
    
            const data = [];
            for (let i = 0; i < 100; i++) {
                data.push({
                    key: i,
                    name: `Edward King ${i}`,
                    rate: 200 + i,
                    po: `PO no. ${i}`,
                });
            }

            return (
                <div style={{ height: "100vh" }} >
                    <Table bordered columns={columns} dataSource={data} pagination={{ pageSize: 8 }} size={"small"} onChange={this.handleChange}/>
                </div>
            )
        } else {
            const { getFieldDecorator } = this.props.form;

            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 8 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 },
                },
            };

            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                },
            };

            return (
                <div className="container">
                    <Form layout="horizontal" onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="Load Number"
                            hasFeedback
                            colon
                        >
                            {getFieldDecorator('changeOrder', {
                                initialValue: this.state.changeOrderID,
                                rules: [
                                    { required: true, message: 'Please select a Change Order!' },
                                ],
                            })(
                                <Select placeholder="Please select change order">
                                    {(this.state.changeOrders || []).map((order, index) => (
                                        <Option key={order.change_order_id} value={order.change_order_id}>{order.change_order_desc}</Option>
                                    ))}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Shipper Name">
                            {getFieldDecorator('taskName', {
                                initialValue: this.state.taskName,
                                rules: [{
                                    required: true,
                                    message: 'Please input task name',
                                }],
                            })(
                                <Input placeholder="Please input task name" size="small" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Load Pickup Date"
                            colon
                        >
                            {getFieldDecorator('taskStartDate', {
                                initialValue: this.state.startDate,
                                //getValueFromEvent: this.handleStartEvent,                                     
                                rules: [{
                                    required: true,
                                    message: 'Please select task start date',
                                }],
                            })(
                                <DatePicker format={"YYYY-MM-DD"}
                                />

                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Load Delivery Date"
                            colon
                        >
                            {getFieldDecorator('taskEndDate', {
                                initialValue: this.state.endDate,
                                //getValueFromEvent: this.handleEndEvent,
                                rules: [{
                                    required: true,
                                    message: 'Please select task end date',
                                }],
                            })(
                                <DatePicker format={"YYYY-MM-DD"}
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Rate">
                            {getFieldDecorator('taskName', {
                                initialValue: this.state.taskName,
                                rules: [{
                                    required: true,
                                    message: 'Please input task name',
                                }],
                            })(
                                <Input placeholder="Please input task name" size="small" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Upload"
                        >
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> Upload
                            </Button>
                            </Upload>

                        </FormItem>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit">Save</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                    Cancel
                            </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                /*
                <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </FormItem>
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
                    */
            );
        }
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
                        title="Current"
                        key="Current"
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
                        {this.renderContent('Current')}
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
                        title="Pending"
                        key="Pending"
                        badge={'new'}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                        data-seed="logId1"
                    >
                        {this.renderContent('Pending')}
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
                        title="Completed"
                        key="Completed"
                        dot
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}
                    >
                        {this.renderContent('Completed')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                        title="DashBoard"
                        key="DashBoard"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                        }}
                    >
                        {this.renderContent('DashBoard')}
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

const WrappedCamera = Form.create()(Camera)
export default connect(mapStateToProps, mapDispatchToProps)(WrappedCamera);
