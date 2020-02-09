import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import GoalSetter from '../goalSetter/goalSetter'
import GoalProgress from '../goalProgress/goalProgress'

import {fetchGoals} from '../../state/goal/action'

import 'antd/dist/antd.css'
import { Row, Col } from 'antd'

import './main.css'

class Main extends React.Component{
    componentDidMount(){
        this.props.actions.fetchGoals();
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        return(
            <div className='Main'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={10}>
                        <GoalProgress />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={10}>
                        <GoalSetter />
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({fetchGoals}, dispatch)}
}

export default connect(
    null,
    mapDispatchToProps
  )(Main);  