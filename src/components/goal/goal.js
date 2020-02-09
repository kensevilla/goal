import React from 'react';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import {completeGoal, failGoal, moveGoal} from '../../state/goal/action'
import {getCurrentDate} from '../util/util'

class Goal extends React.Component{
    state ={
        newTargetDate: getCurrentDate()
    }
    
    setActionsBasedOnDate = () =>{
        let id = this.props.goal.id;
        return this.props.goal.targetDate >= getCurrentDate() ? 
            <div className='Action'>
                <button onClick={this.props.actions.completeGoal.bind(this, id)}>Complete</button>
            </div>
            :
            <div className='Action'>
                <button onClick={this.props.actions.failGoal.bind(this, id)}>Give-up</button>
                <button onClick={this.props.actions.moveGoal.bind(this, id, this.state.newTargetDate)}>Move</button>
                <input type='date' value = {this.state.newTargetDate} name='newTargetDate' onChange={this.handleChange} min={getCurrentDate()}></input>
            </div>;
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        let status  = this.props.goal.status;
        let description = this.props.goal.description;
        let id = this.props.id;
        return(
            status === 'Completed' ?
                <div className={status} key={id}>
                    <span>Completed: {description}</span> <br />
                    <span>Original Target Date: {this.props.goal.targetDate}</span>
                </div>
            : status === 'In-Progress' ?
                <div className={status} key={id}>
                    <span>{description}</span>
                    {this.setActionsBasedOnDate()}
                </div>
            :
                <div className={status} key={id}>
                    <span>Given up on: {description}</span>
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
    return {actions: bindActionCreators({completeGoal, failGoal, moveGoal}, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Goal);  