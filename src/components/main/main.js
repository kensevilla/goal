import React from 'react'
import Goal from '../goal/goal'

class Main extends React.Component{
    constructor(){
        super();
        this.state ={
            goals: [],
            goalDesc: '',
            targetDate: this.getCurrentDate()
        }
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

    sortGoals = () => {
        return this.state.goals.sort((a, b) => {
            let date1 = (a.finishDate === '') ? a.targetDate : a.finishDate;
            let date2 = (b.finishDate === '') ? b.targetDate : b.finishDate;
            return (date1 > date2) ? 1 : -1;
        })
    }

    getCurrentDate = () =>{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    prepareGoals = () =>{
        let sortedGoals = this.sortGoals();
        let currentYear = '';
        return sortedGoals.map(goal => {
            let dateToCheck = this.getDateToCheck(goal);
            let newYear = dateToCheck.split("-")[0];
            if(currentYear !== newYear){
                currentYear = newYear;
                let goalsPerYear = this.getGoalsPerYear(sortedGoals, currentYear);
                return <div className= {currentYear}>
                    <h2>{currentYear}</h2>
                    {goalsPerYear}
                </div>;
            }
        })
    }

    getGoalsPerYear = (sortedGoals, currentYear) =>{
        let datesPerYear = sortedGoals.map(goal => {
            let dateToCheck = this.getDateToCheck(goal);
            if(currentYear === dateToCheck.split("-")[0]){
                return dateToCheck;
            }
        }).reduce((unique, item) => item == null ? unique: unique.includes(item) ? unique : [...unique, item], []);

        return datesPerYear.map(date => {
            let goalsPerDate = this.getGoalsPerDate(sortedGoals, date);
            return <div className={date}>
                <span>{date} : </span>
                {goalsPerDate}
            </div>
        })
    }

    getGoalsPerDate = (sortedGoals, date) =>{
        return sortedGoals.map(goal => {
            let dateToCheck = this.getDateToCheck(goal);
            if(date === dateToCheck){
                return <Goal goal={goal} />
            }
        })
    }

    getDateToCheck = (goal) => {
        return (goal.status === 'Completed') ? goal.finishDate : goal.targetDate;
    }

    render(){
        let goals = this.prepareGoals();
        return(
            <div className='Main'>
                <p>Add goal</p>
                <input type='text' name='goalDesc' onChange={this.handleChange}></input>
                <input type='date' value = {this.state.targetDate} name='targetDate' onChange={this.handleChange} min={this.getCurrentDate()}></input>
                <button onClick={this.addGoal}>Add</button>
                {goals}
            </div>
        )
    }
}

export default Main;