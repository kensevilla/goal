import React from 'react';
import './goal.css';
import {getCurrentDate} from '../util/util'

class Goal extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            newTargetDate: getCurrentDate()
        }
    }

    setActionsBasedOnDate = () =>{
        let id = this.props.goal.id;
        return this.props.goal.targetDate >= getCurrentDate() ? 
            <div className='Action'>
                <button onClick={() => this.props.handleActions.completeGoal(id)}>Complete</button>
            </div>
            :
            <div className='Action'>
                <button onClick={() => this.props.handleActions.failGoal(id)}>Give-up</button>
                <button onClick={() => this.props.handleActions.moveGoal(id, this.state.newTargetDate)}>Move</button>
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
        let id = this.props.goal.id;
        let description = this.props.goal.description;
        return(
            status === 'Completed' ? 
            <div className={status} id={id}>
                <span>Completed </span>
                <span>{description}</span>
                <span id='originalDate'> Original Target Date: {this.props.goal.targetDate}</span>
            </div>
            : status === 'In-Progress' ?
            <div className={status} id={id}>
                <span>{description}</span>
                {this.setActionsBasedOnDate()}
            </div>
            :
            <div className={status} id={id}>
                <span>Given up on </span>
                <span>{description}</span>
            </div>
        )
    }
}

export default Goal;