import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import 'antd/dist/antd.css'
import { Row, Col, Button, Icon, Alert } from 'antd';

import {completeGoal, failGoal, moveGoal} from '../../state/goal/action'
import {showModal} from '../../state/main/action'
import {getCurrentDate} from '../util/util'

import './goal.css'

class Goal extends React.Component{

    moveGoal = () => {
        let goalToBeMove = {
            id: this.props.goal.id,
            description: this.props.goal.description,
            targetDate: this.props.goal.targetDate,
        }
        this.props.actions.showModal(goalToBeMove)
    }

    prepareGoalBasedOnStatus = () =>{
        let status  = this.props.goal.status;
        let description = this.props.goal.description;
        return(
            status === 'Completed' ?
                <Row>
                    <Col span={12}>
                        <Alert type="success" showIcon={false} message={description} banner />
                    </Col>
                    <Col span={7}>
                        <Icon id='completedIcon' type="check" />
                    </Col>
                    <Col span={5}>
                        <span>Original Date: {this.props.goal.targetDate}</span>
                    </Col>
                </Row>
            : status === 'In-Progress' ?
                <Row>
                    <Col span={12}>
                        <span id='goalDescription'>{description}</span>
                        {this.props.goal.targetDate < getCurrentDate() && <Alert message="Failed to finish before target date. Either try again or give-up." banner />}
                    </Col>
                    <Col span={7}>
                        {this.setActionsBasedOnDate()}
                    </Col>
                </Row>
            :
                <Row>
                    <Col span={12}>
                        <Alert type="error" showIcon={false} message={description} banner />
                    </Col>
                    <Col span={7}>
                        <Icon id='failIcon' type="close" />
                    </Col>
                </Row>
        )
    }
    
    setActionsBasedOnDate = () =>{
        let id = this.props.goal.id;
        return this.props.goal.targetDate >= getCurrentDate() ? 
            <div className='Action'>
                <Button id="completeButton"  shape="circle" onClick={this.props.actions.completeGoal.bind(this, id)}><Icon type="check" /></Button>
            </div>
            :
            <div className='Action'>
                <Button id="failButton"  shape="circle" onClick={this.props.actions.failGoal.bind(this, id)}><Icon type="close" /></Button>
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