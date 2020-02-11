import React from 'react'

import 'antd/dist/antd.css'
import { Statistic, Card, Row, Col, Icon  } from 'antd';

import './goalSummary.css'

class GoalSummary extends React.Component{
    render(){
        return(
            <div className='GoalSummary'>
                <Row>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Completed"
                                value={11}
                                valueStyle={{ color: 'rgb(0, 201, 0)' }}
                                prefix={<Icon type="smile" theme='twoTone' twoToneColor="rgb(0, 201, 0)" />}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="In-Progress"
                                value={11}
                                valueStyle={{ color: '#808080' }}
                                prefix={<Icon type="meh" />}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Given-up"
                                value={11}
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

export default GoalSummary;