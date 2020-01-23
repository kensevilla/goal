import { connect } from "react-redux";
import Main from '../../components/main/main'

const mapDispatchToProps = dispatch => ({
    addGoal: goalDetails =>
      dispatch({
        type: "ADD_GOAL",
        payload: goalDetails
      }),
    completeGoal: id =>
      dispatch({
          type: "COMPLETE_GOAL",
          payload: id
      }),
    failGoal: id =>
      dispatch({
          type: "FAIL_GOAL",
          payload: id
      }),
    moveGoal: goalDetails =>
      dispatch({
          type: "MOVE_GOAL",
          payload: goalDetails
      })
});

const mapStateToProps = state => ({
    goals : state.mainreducer.goals,
 });

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main);  