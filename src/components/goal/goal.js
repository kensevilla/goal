import React from 'react';

class Goal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='Goal'>
                <p>{this.props.goal.goalDesc}</p>
                <p>{this.props.goal.targetDate}</p>
            </div>
        )
    }
}

export default Goal;