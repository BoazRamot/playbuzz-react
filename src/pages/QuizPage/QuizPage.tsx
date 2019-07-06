import React, {useEffect} from 'react';
import QuizCard from '../../components/QuizCard/QuizCard';
import {IRootState} from '../../store/configureStore';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {Quiz} from "../../models/Quiz";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Summary from "../Summary/Summary";
import {Dispatch} from "redux";
import {IQuestions} from "../../models/IQuestions";

interface IProps {
  index: number;
  lastIndex: boolean;
  shuffled: boolean;
  score: number;
  getQuiz: Function;
  reset: Function;
  isShuffled: Function;
  setShuffled: Function;
}

const QuizPage: React.FC<IProps & RouteComponentProps> = ({index, lastIndex, shuffled, score, getQuiz, reset, isShuffled, setShuffled, match}) => {

  useEffect(() => {
    window.addEventListener("popstate", () => {
      console.log('QuizPage useEffect')
      isShuffled(false);
      reset();
    });
  }, [reset, isShuffled]);

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
    isShuffled(true);
  };

  if (quiz && !shuffled) {
    console.log('shuffleQuestions if if if');
    shuffle(quiz.questions);
    setShuffled(quiz);
    isShuffled(true);
  }

  if (lastIndex) {
    return <Summary id={id} score={score} quiz={quiz}/>;
  }

  return (!quiz) ? null :(
    <div>
      <ProgressBar
        index={index}
        length={quiz.questions.length}
      />
      <QuizCard
        id={id}
        name={quiz.title}
        imgSrc={`${process.env.PUBLIC_URL}/img/${quiz.questions[index].imgSrc}`}
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
    dispatch({type: 'RESET_QUESTION_INDEX'});
    dispatch({type: 'RESET_SCORE'});
  },
  isShuffled: (value: boolean) => {
    dispatch({type: 'SET_QUESTION_SHUFFLE', payload: value})
  },
  setShuffled: (value: Quiz) => {
    dispatch({type: 'SET_SHUFFLED_QUESTIONS', payload: value})
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage);