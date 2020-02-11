import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import GoalSetter from '../goalSetter/goalSetter'
import GoalProgress from '../goalProgress/goalProgress'

import {hideModal} from '../../state/main/action'

import 'antd/dist/antd.css'
import { Layout, Row, Col, Modal } from 'antd'

import './main.css'

class Main extends React.Component{

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        const { Header, Content } = Layout;
        return(
            <div className='Main'>
                <Layout>
                    <Header></Header>
                    <Content>
                    <Row>
                        <Col id='wow' span={12}>
                            <GoalProgress />
                        </Col>
                        <Col span={12}>
                            <GoalSetter />
                        </Col>
                    </Row>

                    <Modal title="Try Again"
                        visible={this.props.modalVisible}
                        footer={null}
                        onCancel={this.props.actions.hideModal}
                        width={765}>
                            <GoalSetter modal = {true} goalToBeMove = {this.props.goalToBeMove} />
                    </Modal>
                    </Content>
                </Layout>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        modalVisible : state.main.modalVisible,
        goalToBeMove : state.main.goalToBeMove
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({hideModal}, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main);  