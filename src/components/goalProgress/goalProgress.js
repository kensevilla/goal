import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import Goal from '../goal/goal'
import {fetchGoals} from '../../state/goal/action'

import 'antd/dist/antd.css'
import { Timeline, Icon, Card } from 'antd'

import {convertMonth, generateUUID} from '../util/util'
import './goalProgress.css'

class GoalProgress extends React.Component{
    componentDidMount(){
        this.props.actions.fetchGoals();
    }

    sortGoals = () => {
        return this.props.goals.sort((a, b) => {
            let date1 = (a.status === 'Completed') ? a.finishDate : a.targetDate;
            let date2 = (b.status === 'Completed') ? b.finishDate : b.targetDate;
            return (date1 < date2) ? 1 : -1;
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
                    <Icon type="calendar" style={{ fontSize: '30px' }} /> <span id="year">{currentYear}</span>
                    <hr></hr>
                    <Timeline id="timeline">
                        {goalsPerYear}
                    </Timeline>
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
                 <Timeline.Item id="date" dot={<Icon type="pushpin" style={{ fontSize: '25px' }} key={date} />}>{dateToShow}</Timeline.Item>
                {goalsPerDate}
            </div>
        })
    }

    getGoalsPerDate = (sortedGoals, date) =>{
        return sortedGoals.map(goal => {
            let color = goal.status==='Completed' ? 'green' : goal.status === 'In-Progress' ? 'gray' : 'red';
            let dateToCheck = this.getDateToCheck(goal);
            if(date === dateToCheck){
                return <Timeline.Item color={color} key={generateUUID()}><Goal goal={goal} key={generateUUID()} /></Timeline.Item>
            }
        })
    }

    getDateToCheck = (goal) => {
        return (goal.status === 'Completed') ? goal.finishDate : goal.targetDate;
    }

    render(){
        let goals = this.prepareGoals();
        return(
            <div className="GoalProgress">
                <Card id="card" style={{ width: 800, height: 800}}>
                    {goals}
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        goals : state.goal.goals
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({fetchGoals}, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(GoalProgress);  