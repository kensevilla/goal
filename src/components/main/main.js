import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import Goal from '../goal/goal'
import {addGoal, completeGoal, failGoal, moveGoal} from '../../state/main/action'
import {getCurrentDate, generateUUID, convertMonth} from '../util/util'

class Main extends React.Component{
    constructor(){
        super();
        this.state ={
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
        this.props.actions.addGoal(newGoal);
    }

    sortGoals = () => {
        return this.props.goals.sort((a, b) => {
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
        this.props.actions.completeGoal(id);
    }

    failGoal = (id) =>{
        this.props.actions.failGoal(id);
    }

    moveGoal = (id, newTargetDate) =>{
        this.props.actions.moveGoal({id, newTargetDate});
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

function mapStateToProps(state){
    return {
        goals : state.mainreducer.goals,
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({addGoal, completeGoal, failGoal, moveGoal}, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main);  