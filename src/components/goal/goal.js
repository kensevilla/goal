import React from 'react';

class Goal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={this.props.goal.status} id={this.props.goal.id}>
                <span>{this.props.goal.goalDesc}</span>
                <button>Complete</button>
                <button>Move</button>
            </div>
        )
    }
}

export default Goal;