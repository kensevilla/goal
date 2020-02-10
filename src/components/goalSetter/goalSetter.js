import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import Cal from '../calendar/calendar'
import './goalSetter.css'

import 'antd/dist/antd.css'
import { Button, Icon, Card, Input, Row, Col, PageHeader } from 'antd';

import {hideModal} from '../../state/main/action'
import {addGoal, moveGoal} from '../../state/goal/action'
import {getCurrentDate} from '../util/util'

class GoalSetter extends React.Component{
    state = {
        goalDesc: '',
        targetDate: getCurrentDate()
    }

    handleDescChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleCalendarChange = (targetDate) =>{
        this.setState({targetDate});
    }

    addGoal = () =>{
        let newGoal = {
            description: this.state.goalDesc,
            targetDate: this.state.targetDate,
            finishDate: '',
            status: 'In-Progress'
        }
        this.props.actions.addGoal(newGoal);
        this.setState({goalDesc : ''});
    }

    moveGoal = () =>{
        this.props.actions.moveGoal(this.props.goalToBeMove.id, this.state.targetDate);
        this.props.actions.hideModal();
    }

    setInputArea = () =>{
        const { TextArea } = Input;
        return this.props.goalToBeMove ? 
            <Row>
                <Col span={20}>
                    <PageHeader
                        style={{
                        border: '1px solid rgb(235, 237, 240)',
                        width: 580
                        }}
                        subTitle={this.props.goalToBeMove.description}
                    />
                </Col>
                <Col span={4}>
                    <Button id="moveGoalButton" onClick= {this.moveGoal}><Icon type="redo" /></Button>
                </Col>
            </Row>
            :
            <Row>
                <Col span={20}>
                    <TextArea placeholder={"What do you want to do..."} autoSize={{ minRows: 4, maxRows: 4 }} name='goalDesc' onChange={this.handleDescChange} value={this.state.goalDesc} />
                </Col>
                <Col span={4}>
                    <Button id="addGoalButton"  shape="circle" onClick= {this.props.goalToBeMove ? this.moveGoal : this.addGoal}><Icon type="plus" /></Button>
                </Col>
            </Row>
    }


    render(){
        return(
            <div className='GoalSetter'>
                <Card hoverable
                      style={{ width: 700 }}
                      cover={<Cal calendarChange={this.handleCalendarChange} />}>
                        <div className="InputArea">
                           {this.setInputArea()}
                        </div>
                </Card>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({addGoal, moveGoal, hideModal}, dispatch)}
}

export default connect(
    null,
    mapDispatchToProps
  )(GoalSetter);  