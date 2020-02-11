import React from 'react'
import {connect} from "react-redux"

import 'antd/dist/antd.css'
import { Statistic, Card, Row, Col, Icon  } from 'antd';

import './goalSummary.css'

class GoalSummary extends React.Component{

    prepareSummary = () =>{
        let summary = {
            completed : 0,
            inProgress : 0,
            givenUp : 0
        };
        this.props.goals.map(goal =>{
            if(goal.status === 'Completed'){
                summary.completed++;
            }
            else if(goal.status === 'In-Progress'){
                summary.inProgress++;
            }
            else{
                summary.givenUp++;
            }
        });
        return summary;
    }

    render(){
        let summary = this.prepareSummary();
        return(
            <div className='GoalSummary'>
                <Row>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Completed"
                                value={summary.completed}
                                valueStyle={{ color: 'rgb(0, 201, 0)' }}
                                prefix={<Icon type="smile" theme='twoTone' twoToneColor="rgb(0, 201, 0)" />}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="In-Progress"
                                value={summary.inProgress}
                                valueStyle={{ color: '#808080' }}
                                prefix={<Icon type="meh" />}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Given-up"
                                value={summary.givenUp}
                                valueStyle={{ color: '#f5222d' }}
                                prefix={<Icon type="frown" theme='twoTone' twoToneColor="#f5222d" />}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        goals : state.goal.goals
    }
}

export default connect(
    mapStateToProps,
    null
  )(GoalSummary);  