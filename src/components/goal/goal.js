import React from 'react';
import './goal.css';

class Goal extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let status  = this.props.goal.status;
        let id = this.props.goal.id;
        return(
            status == 'Completed' ? 
            <div className={status} id={id}>
                <span>Completed </span>
                <span>{this.props.goal.goalDesc}</span>
                <span id='originalDate'> Original Target Date: {this.props.goal.targetDate}</span>
            </div>
            :
            <div className={status} id={id}>
                <span>{this.props.goal.goalDesc}</span>
                <button onClick={() => this.props.handleCompleteGoal(id)}>Complete</button>
            </div>
        )
    }
}

export default Goal;