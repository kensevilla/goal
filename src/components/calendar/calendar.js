import React from 'react';

import 'antd/dist/antd.css';

import { Calendar, Alert } from 'antd';
import moment from 'moment';
import {getCurrentDate} from '../util/util'

import './calendar.css'

class Cal extends React.Component{
    state = {
        targetDate: moment(getCurrentDate())
      };

      handleChange = (value) =>{
        this.setState({
            targetDate : value
        })
        this.props.calendarChange(value.format('YYYY-MM-DD'));
    }

    render(){
        const { targetDate } = this.state;
        let calendarClass = this.props.action + 'Calendar';
        return(
            <div className={calendarClass}>
                <Alert message={`You selected date: ${targetDate && targetDate.format('YYYY-MM-DD')}`} />
                <Calendar value={targetDate} onChange={this.handleChange} fullscreen={false} />
            </div>
        )
    }
}

export default Cal;