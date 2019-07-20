import React, {useEffect} from 'react';
import QuizCard from "../../components/QuizCard/QuizCard";
import {connect} from "react-redux";
import {Grid} from "@material-ui/core";
import {Quiz} from "../../models/Quiz";
import {IRootState} from "../../store/configureStore";
import {Dispatch} from "redux";
import QuizCardContent from "../../components/QuizCardContent/QuizCardContent";
import QuizCardActions from "../../components/QuizCardActions/QuizCardActions";
import {Link as RouterLink} from 'react-router-dom';
import {restartQuestion} from "../../store/actions/action.questionReducer";
import {restartScore} from "../../store/actions/action.scoreReducer";

interface IProps {
  quizzes: Array<Quiz>;
  reset: Function;
}

const Home: React.FC<IProps> = ({quizzes, reset}) => {
  useEffect(() => {
    reset();
  });

  const homeActions = (id: any) => {
    return(
      <RouterLink to={`/quiz/${id}`}>
        <QuizCardActions size="small" color="primary" value="See full quiz"/>
      </RouterLink>
    )
  };

  return (
    <Grid container spacing={3}>
      {
        quizzes.map((q: Quiz) => (
          <Grid item xs={6} key={q.id}>
            <QuizCard
              imgSrc={`${process.env.PUBLIC_URL}/img/${q.imgSrc}`}
              name={q.title}
              short={true}
              quizCardContent={<QuizCardContent variant="h5" component="h2" content={q.title}/>}
              quizCardActions={homeActions(q.id)}
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
    dispatch(restartQuestion());
    dispatch(restartScore());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);