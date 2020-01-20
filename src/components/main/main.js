import React from 'react'

class Main extends React.Component{
    state ={
        goals: [],
        goalDesc: '',
        targetDate: ''
    }
    
    addGoal = () =>{
        let newGoal = {
            goalDesc: this.state.goalDesc,
            targetDate: this.state.targetDate,
            finishDate: '',
            status: 'In-Progress'
        }
        let newGoals = this.state.goals;
        newGoals.push(newGoal);
        this.setState({
            goals : newGoals
        })
        console.log(this.state.goals)
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        return(
            <div className='Main'>
                <p>Add goal</p>
                <input type='text' name='goalDesc' onChange={this.handleChange}></input>
                <input type='date' value = {this.state.date} name='targetDate' onChange={this.handleChange}></input>
                <button onClick={this.addGoal}>Add</button>
            </div>
        )
    }
}

export default Main;