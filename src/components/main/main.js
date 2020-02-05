import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import Goal from '../goal/goal'
import GoalSetter from '../goalSetter/goalSetter'

import {fetchGoals} from '../../state/goal/action'
import {getCurrentDate, convertMonth} from '../util/util'

import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

class Main extends React.Component{
    state ={
        goalDesc: '',
        targetDate: getCurrentDate()
    }
    
    componentDidMount(){
        this.props.actions.fetchGoals();
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
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
        return sortedGoals.map(goal => {
            let dateToCheck = this.getDateToCheck(goal);
            if(date === dateToCheck){
                return <Goal goal={goal} key={goal.id} />
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
                <Row>
                    <Col span={12}>
                        {goals}
                    </Col>
                    <Col span={12}>
                        <GoalSetter />
                    </Col>
                </Row>
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
  )(Main);  