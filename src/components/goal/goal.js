import React from 'react';

class Goal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='Goal'>
                <span>{this.props.goal.goalDesc}</span>
                <button>Complete</button>
                <button>Move</button>
            </div>
        )
    }
}

export default Goal;