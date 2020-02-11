import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import 'antd/dist/antd.css'
import { Row, Col, Button, Icon, Alert, Popconfirm, message } from 'antd'

import {completeGoal, failGoal, moveGoal} from '../../state/goal/action'
import {showModal} from '../../state/main/action'
import {getCurrentDate} from '../util/util'

import './goal.css'

class Goal extends React.Component{

    completeGoal = () => {
        this.props.actions.completeGoal(this.props.goal.id)
        message.success('Completed goal.');
    }

    moveGoal = () => {
        let goalToBeMove = {
            id: this.props.goal.id,
            description: this.props.goal.description,
            targetDate: this.props.goal.targetDate,
        }
        this.props.actions.showModal(goalToBeMove)
    }

    failGoal = () => {
        this.props.actions.failGoal(this.props.goal.id)
        message.error('Gave-up on goal.');
    }

    prepareGoalBasedOnStatus = () =>{
        let status  = this.props.goal.status;
        let description = this.props.goal.description;
        return(
            status === 'Completed' ?
                <Row>
                    <Col span={13}>
                        <Alert type="success" showIcon={false} message={description} banner />
                    </Col>
                    <Col span={6}>
                        <Icon id='completedIcon' type="check" />
                    </Col>
                    <Col span={5}>
                        <span>Original Date: {this.props.goal.targetDate}</span>
                    </Col>
                </Row>
            : status === 'In-Progress' ?
                <Row>
                    <Col span={13}>
                        <span id='goalDescription'>{description}</span>
                        {this.props.goal.targetDate < getCurrentDate() && <Alert message="Failed to finish before target date. Either try again or give-up." banner />}
                    </Col>
                    <Col span={6}>
                        {this.setActionsBasedOnDate()}
                    </Col>
                </Row>
            :
                <Row>
                    <Col span={13}>
                        <Alert type="error" showIcon={false} message={description} banner />
                    </Col>
                    <Col span={6}>
                        <Icon id='failIcon' type="close" />
                    </Col>
                    <Col span={5}>
                        <span>Given-up on: {this.props.goal.finishDate}</span>
                    </Col>
                </Row>
        )
    }
    
    setActionsBasedOnDate = () =>{
        return this.props.goal.targetDate >= getCurrentDate() ? 
            <div className='Action'>
                <Popconfirm placement="right" title={"Complete this goal?"} onConfirm={this.completeGoal} okText="Yes!!" cancelText="Not yet"  
                    icon={<Icon type="check-circle" style={{ color: 'green' }} />}>
                    <Button id="completeButton"  shape="circle"><Icon type="check" /></Button>
                </Popconfirm>
            </div>
            :
            <div className='Action'>
                <Popconfirm placement="bottom" title={"Are you sure you want to give up?"} onConfirm={this.failGoal} okText="Sadly, yes" cancelText="No"  
                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
                    <Button id="failButton"  shape="circle"><Icon type="close" /></Button>
                </Popconfirm>
                <Button id="moveButton"  shape="circle" onClick={this.moveGoal}><Icon type="redo" /></Button>
            </div>;
    }

    render(){
        let status  = this.props.goal.status;
        let id = this.props.id;
        return(
            <div className={status} key={id}>
                {this.prepareGoalBasedOnStatus()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        goals : state.goal.goals
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({completeGoal, failGoal, moveGoal, showModal}, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Goal);  