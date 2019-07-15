import React from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, Typography} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import Question from '../../components/Question/Question';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {IRootState} from "../../store/configureStore";

interface IProps {
  imgSrc: string;
  name: string;
  text?: string;
  title?: string;
  short?: boolean
  id: string;
  lastIndex: boolean;
  reset: Function;
  finishQuizNow: Function;
  quizCardContent?: any;
}

const QuizCard: React.FC<IProps> = ({ imgSrc, id, name, text, title, lastIndex, reset, finishQuizNow, quizCardContent, short = false }) => {
  const onClick = () => {
    reset();
  };

  const finish = () => {
    finishQuizNow()
  };

  return (
    <Card>
      <CardActionArea>
        <img
          className={(short) ? 'quiz-image-small' : 'quiz-image-large'}
          src={imgSrc}
          title={name}
          alt="Quiz"
        />
        <CardContent>
          {quizCardContent}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/*for QuizPage*/}
        {(!short) && (!lastIndex) &&
        <Button size="small" color="primary" onClick={finish}>
          Go to summary now
        </Button>
        }
        {/*for Home*/}
        {short && id &&
        <RouterLink to={`/quiz/${id}`}>
          <Button size="small" color="primary">
            See full quiz
          </Button>
        </RouterLink>
        }
        {/*for Summary*/}
        {!short && lastIndex &&
        <RouterLink to={"/"}>
          <Button size="small" color="primary">
            Home
          </Button>
        </RouterLink>
        }
        {!short && lastIndex &&
        <RouterLink to={`/quiz/${id}`}>
          <Button size="small" color="primary" onClick={onClick}>
            Restart quiz
          </Button>
        </RouterLink>
        }
      </CardActions>
    </Card>
  )
};

const mapStateToProps = (state: IRootState) => ({
    lastIndex: state.questionIndex.lastIndex,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  reset: () => {
    dispatch({type: 'RESET_QUESTION_INDEX'});
    dispatch({type: 'RESET_SCORE'});
  },
  finishQuizNow: () => {
    dispatch({type: 'SET_LAST_INDEX'});
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizCard);