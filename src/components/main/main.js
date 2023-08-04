import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import GoalSetter from '../goalSetter/goalSetter'
import GoalProgress from '../goalProgress/goalProgress'

import {hideModal} from '../../state/main/action'
import {_logoutUser} from '../../state/user/action'

import 'antd/dist/antd.css'
import { Layout, Row, Col, Modal } from 'antd'

import './main.css'
import GoalSummary from '../goalSummary/goalSummary'
import Login from '../login/login'

class Main extends React.Component{

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleLogout = () => {
        this.props.actions._logoutUser();
    }

    render(){
        const { Header, Content } = Layout;
        return(
            <>
            {
                !this.props.userId ? <Login /> :
                <div className='Main'>
                    <Layout>
                        <Header>
                        <button onClick={this.handleLogout} className='logout-button'>X</button>
                        </Header>
                        <Content>
                        <Row>
                            <Col id='wow' span={12}>
                                <GoalProgress />
                            </Col>
                            <Col span={12}>
                                <GoalSummary />
                                <GoalSetter />
                            </Col>
                        </Row>

                        <Modal title="Try Again"
                            visible={this.props.modalVisible}
                            footer={null}
                            onCancel={this.props.actions.hideModal}
                            width={765}>
                                <GoalSetter isModal = {true} goalToBeMove = {this.props.goalToBeMove} />
                        </Modal>
                        </Content>
                    </Layout>
                </div>
            }
            </>
        )
    }
}

function mapStateToProps(state){
    return {
        modalVisible : state.main.modalVisible,
        goalToBeMove : state.main.goalToBeMove,
        userId: state.user.userId
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({hideModal, _logoutUser}, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main);  