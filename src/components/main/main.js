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
            id : this.generateUUID(),
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
        console.log(sortedGoals);
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
            let dateToShow = this.convertMonth(splittedDate[1]) + " " + splittedDate[2];
            return <div className={date} key={date}>
                <span>{dateToShow}</span>
                {goalsPerDate}
            </div>
        })
    }

    getGoalsPerDate = (sortedGoals, date) =>{
        return sortedGoals.map(goal => {
            let dateToCheck = this.getDateToCheck(goal);
            if(date === dateToCheck){
                return <Goal goal={goal} key={goal.id} handleCompleteGoal={this.completeGoal} />
            }
        })
    }

    getDateToCheck = (goal) => {
        return (goal.status === 'Completed') ? goal.finishDate : goal.targetDate;
    }

    completeGoal = (id) =>{
        let updatedGoals = this.state.goals.map(goal => {
            if(goal.id === id){
                goal.finishDate = this.getCurrentDate();
                goal.status = 'Completed';
            }
            return goal;
        });
        this.setState({
            goals : updatedGoals
        })
    }

    convertMonth = (monthNumber) => {
        switch(monthNumber){
            case "01":
                return "January"
            case "02":
                return "February"
            case "03":
                return "March"
            case "04":
                return "April"
            case "05":
                return "May"
            case "06":
                return "June"
            case "07":
                return "July"
            case "08":
                return "August"
            case "09":
                return "September"
            case "10":
                return "October"
            case "11":
                return "November"
            case "12":
                return "December"
        }
    }

    generateUUID = () =>{
        let i,
            random;
        let uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12
                ? 4
                : (i === 16
                    ? (random & 3 | 8)
                    : random)).toString(16);
        }
        return uuid;
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