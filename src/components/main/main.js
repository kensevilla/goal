import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import GoalSetter from '../goalSetter/goalSetter'
import GoalProgress from '../goalProgress/goalProgress'

import {hideModal} from '../../state/main/action'

import 'antd/dist/antd.css'
import { Row, Col, Modal } from 'antd'

import './main.css'
import Cal from '../calendar/calendar'

class Main extends React.Component{

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        return(
            <div className='Main'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={10}>
                        <GoalProgress />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={10}>
                        <GoalSetter />
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <Modal title="Try Again"
                    visible={this.props.modalVisible}
                    footer={null}
                    onCancel={this.props.actions.hideModal}
                    width={765}>
                        <GoalSetter goalToBeMove = {this.props.goalToBeMove} />
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        modalVisible : state.main.modalVisible,
        goalToBeMove : state.main.goalToBeMove
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({hideModal}, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main);  