import React from 'react';
import {List, ListItem, ListItemText} from "@material-ui/core";
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import {IOptions} from "../../models/IOptions";
import {Quiz} from "../../models/Quiz";
import {IRootState} from "../../store/configureStore";
import {RouteComponentProps, withRouter} from "react-router";
import {scoreSum} from "../../store/actions/action.scoreReducer";
import {lastQuestion, nextQuestion} from "../../store/actions/action.questionReducer";

interface IProps {
  id: string;
  index: number;
  quizzes: Array<Quiz>;
  onNext: Function;
}

const Question: React.FC<IProps & RouteComponentProps> = ({id, index, quizzes, onNext}) => {

  const onClick = (answerScore: number) => {
    const gotoSummery = quizzes[quizzes.findIndex(i => i.id === id)].questions.length - 1 === index;
    onNext(answerScore, gotoSummery);
  };

  const quiz = quizzes.find((i: any) => i.id === id) || quizzes[index];

  const optionalAnswers = quiz.questions[index].options.map((item: IOptions, index: number) => (
    <ListItem button key={index} onClick={onClick.bind(null, item.value)}>
      <ListItemText>{item.text}</ListItemText>
    </ListItem>
  ));

  return (
    <div className="Question">
      <h1>{quiz.questions[index].question}</h1>
      <List className="Question-options">
        {optionalAnswers}
      </List>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    index: state.questionIndex.questionIndex,
    quizzes: state.quizzes,
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (answerScore: number, gotoSummery: boolean) => {
    dispatch(scoreSum(answerScore));
    if (!gotoSummery) {
      dispatch(nextQuestion());
    } else {
      dispatch(lastQuestion());
    }
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));