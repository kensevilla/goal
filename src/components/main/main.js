import React from 'react'

class Main extends React.Component{
    state ={
        goalDesc: '',
        targetDate: ''
    }
    
    addGoal = () =>{
        console.log(this.state.goalDesc)
        console.log(this.state.targetDate)
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