import React, {useEffect} from 'react';
import QuizCard from '../../components/QuizCard/QuizCard';
import {IRootState} from '../../store/configureStore';
import {connect} from 'react-redux';
import {Route, RouteComponentProps} from 'react-router';
import {Quiz} from "../../models/Quiz";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Summary from "../Summary/Summary";
import {Dispatch} from "redux";
import {IQuestions} from "../../models/IQuestions";
import QuizCardContent from "../../components/QuizCardContent/QuizCardContent";
import Question from "../../components/Question/Question";
import QuizCardActions from "../../components/QuizCardActions/QuizCardActions";
import Home from "../Home/Home";
import {lastQuestion, restartQuestion, shuffleQuestion} from "../../store/actions/action.questionReducer";
import {quizShuffleQuestion} from "../../store/actions/action.quizzesDataReducer";
import {restartScore} from "../../store/actions/action.scoreReducer";

interface IProps {
  index: number;
  lastIndex: boolean;
  shuffled: boolean;
  score: number;
  getQuiz: Function;
  reset: Function;
  isShuffled: Function;
  setShuffled: Function;
  finishQuizNow: Function;
}

const QuizPage: React.FC<IProps & RouteComponentProps> = ({index, lastIndex, shuffled, score, getQuiz, reset, isShuffled, setShuffled, finishQuizNow, match}) => {

  useEffect(() => {
    window.addEventListener("popstate", () => {
      isShuffled(false);
      reset();
    });
  }, [reset, isShuffled]);

  const finish = () => {
    finishQuizNow()
  };

  const id = (match.params as {id: string}).id;
  const quiz:Quiz = getQuiz(id);

  const shuffle = (array: Array<IQuestions>) => {
    let currentIndex = array.length;
    let tempVal;
    let randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      tempVal = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempVal;
    }
  };

  if (quiz && !shuffled) {
    shuffle(quiz.questions);
    setShuffled(quiz);
    isShuffled(true);
  }

  if (lastIndex) {
    return <Summary id={id} score={score} quiz={quiz}/>;
  }

  if (quiz === undefined) {
    return <Route path="/" component={Home}/>
  }

  return (!quiz) ? null :(
    <div>
      <ProgressBar
        index={index}
        length={quiz.questions.length}
      />
      <QuizCard
        name={quiz.title}
        imgSrc={`${process.env.PUBLIC_URL}/img/${quiz.questions[index].imgSrc}`}
        quizCardContent={<QuizCardContent variant="body2" component="div" content={<Question id={id}/>}/>}
        quizCardActions={<QuizCardActions size="small" color="primary" onClick={finish} value="Go to summary now"/>}
      />
    </div>
  )
};

const mapStateToProps = (state: IRootState) => ({
  index: state.questionIndex.questionIndex,
  lastIndex: state.questionIndex.lastIndex,
  shuffled: state.questionIndex.shuffled,
  score: state.score.score,
  getQuiz: (id: string) => (state.quizzes.find(q => q.id === id)),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  reset: () => {
    dispatch(restartQuestion());
    dispatch(restartScore());
  },
  isShuffled: (value: boolean) => {
    dispatch(shuffleQuestion(value));
  },
  setShuffled: (value: Quiz) => {
    dispatch(quizShuffleQuestion(value));
  },
  finishQuizNow: () => {
    dispatch(lastQuestion());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage);