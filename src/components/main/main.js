import React from 'react'
import Goal from '../goal/goal'
import {getCurrentDate, generateUUID, convertMonth} from '../util/util'

class Main extends React.Component{
    constructor(){
        super();
        this.state ={
            goals: [],
            goalDesc: '',
            targetDate: getCurrentDate()
        }
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    addGoal = () =>{
        let newGoal = {
            id : generateUUID(),
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
    }

    sortGoals = () => {
        return this.state.goals.sort((a, b) => {
            let date1 = (a.finishDate === '') ? a.targetDate : a.finishDate;
            let date2 = (b.finishDate === '') ? b.targetDate : b.finishDate;
            return (date1 > date2) ? 1 : -1;
        })
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
                return <div className= {currentYear} key={currentYear}>
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
            let splittedDate = date.split("-");
            let dateToShow = convertMonth(splittedDate[1]) + " " + splittedDate[2];
            return <div className={date} key={date}>
                <span>{dateToShow}</span>
                {goalsPerDate}
            </div>
        })
    }

    getGoalsPerDate = (sortedGoals, date) =>{
        let actions = {
            completeGoal: this.completeGoal,
            failGoal: this.failGoal,
            moveGoal: this.moveGoal
        };
        return sortedGoals.map(goal => {
            let dateToCheck = this.getDateToCheck(goal);
            if(date === dateToCheck){
                return <Goal goal={goal} key={goal.id} handleActions={actions} />
            }
        })
    }

    getDateToCheck = (goal) => {
        return (goal.status === 'Completed') ? goal.finishDate : goal.targetDate;
    }

    completeGoal = (id) =>{
        let updatedGoals = this.state.goals.map(goal => {
            if(goal.id === id){
                goal.finishDate = getCurrentDate();
                goal.status = 'Completed';
            }
            return goal;
        });
        this.setState({
            goals : updatedGoals
        })
    }

    failGoal = (id) =>{
        let updatedGoals = this.state.goals.map(goal => {
            if(goal.id === id){
                goal.status = 'Fail';
            }
            return goal;
        });
        this.setState({
            goals : updatedGoals
        })
    }

    moveGoal = (id, newTargetDate) =>{
        let updatedGoals = this.state.goals.map(goal => {
            if(goal.id === id){
                goal.targetDate = newTargetDate;
            }
            return goal;
        });
        this.setState({
            goals : updatedGoals
        })
    }

    render(){
        let goals = this.prepareGoals();
        return(
            <div className='Main'>
                <p>Add goal</p>
                <input type='text' name='goalDesc' onChange={this.handleChange}></input>
                <input type='date' value = {this.state.targetDate} name='targetDate' onChange={this.handleChange} min={getCurrentDate()}></input>
                <button onClick={this.addGoal}>Add</button>
                {goals}
            </div>
        )
    }
}

export default Main;