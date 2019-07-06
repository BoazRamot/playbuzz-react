import React, {useEffect} from 'react';
import QuizCard from "../../components/QuizCard/QuizCard";
import {connect} from "react-redux";
import {Grid} from "@material-ui/core";
import {Quiz} from "../../models/Quiz";
import {IRootState} from "../../store/configureStore";
import {Dispatch} from "redux";

interface IProps {
  quizzes: Array<Quiz>;
  reset: Function;
}

const Home: React.FC<IProps> = ({quizzes, reset}) => {
  useEffect(() => {
    reset();
  });

  return (
    <Grid container spacing={3}>
      {
        quizzes.map((q: Quiz) => (
          <Grid item xs={6} key={q.id}>
            <QuizCard
              imgSrc={`${process.env.PUBLIC_URL}/img/${q.imgSrc}`}
              id={q.id}
              name={q.title}
              short={true}
            />
          </Grid>
        ))
      }
    </Grid>
  );
};

const mapStateToProps = (state: IRootState) => ({
  quizzes: state.quizzes
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  reset: () => {
    dispatch({type: 'RESET_QUESTION_INDEX'});
    dispatch({type: 'RESET_SCORE'});
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);