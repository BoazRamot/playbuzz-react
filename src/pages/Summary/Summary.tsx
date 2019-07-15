import React from 'react';
import QuizCard from '../../components/QuizCard/QuizCard';
import {Quiz} from "../../models/Quiz";
import QuizCardContent from "../../components/QuizCardContent/QuizCardContent";
import QuizCardActions from "../../components/QuizCardActions/QuizCardActions";
import {Link as RouterLink} from 'react-router-dom';
import {Dispatch} from "redux";
import {connect} from "react-redux";

interface IProps {
  id: string;
  score: number;
  quiz: Quiz;
  reset: Function;
}

const Summary: React.FC<IProps> = ({id, score, quiz, reset}) => {
  const onClick = () => {
    reset();
  };

  const resultItem: any = quiz ? quiz.result.find(i => score <= i.score) : '';

  const summaryContent = () => {
    return(
      <div>
        <QuizCardContent variant="h5" component="h2" content={resultItem.title}/>
        <QuizCardContent variant="body1" color="textSecondary" component="p" content={resultItem.text}/>
      </div>
    )
  };

  const summaryActions = () => {
    return(
      <div>
        <RouterLink to={"/"}>
          <QuizCardActions size="small" color="primary" value="Home"/>
        </RouterLink>
        <RouterLink to={`/quiz/${id}`}>
          <QuizCardActions size="small" color="primary" onClick={onClick} value="Restart quiz"/>
        </RouterLink>
      </div>
    )
  };

  return (!quiz) ? null :(
    <QuizCard
      imgSrc={`/img/${resultItem.imgSrc}`}
      name={quiz.title}
      quizCardContent={summaryContent()}
      quizCardActions={summaryActions()}
    />
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  reset: () => {
    dispatch({type: 'RESET_QUESTION_INDEX'});
    dispatch({type: 'RESET_SCORE'});
  }
});

export default connect(null, mapDispatchToProps)(Summary);