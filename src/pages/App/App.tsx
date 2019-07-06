import React, {useEffect} from 'react';
import './App.scss';
import {createMuiTheme} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {Route, Switch} from 'react-router';
import Header from "../../components/Header/Header";
import Home from '../Home/Home';
import QuizPage from '../QuizPage/QuizPage';
import {getQuizzes} from "../../store/quizzes.api.middleware";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {IRootState} from "../../store/configureStore";
import {Quiz} from "../../models/Quiz";

interface IProp {
  quizzes: Array<Quiz>;
  getData: Function;
}

const App: React.FC<IProp> = ({quizzes, getData}) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#104DA1'
      }
    },
  });

  useEffect(() => {
    const jsonFilesString = ['/data/q1.json', '/data/q2.json', '/data/q3.json'];
    if (quizzes.length === 0) {
      getData(jsonFilesString);
    }
  }, [getData, quizzes.length]);

  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <main className="p-3 App-main">
        <Switch>
          <Route path="/quiz/:id" component={QuizPage}/>
          <Route path="/" component={Home}/>
          <Route render={() => 'Page not found'}/>
        </Switch>
      </main>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: IRootState) => ({
  quizzes: state.quizzes
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getData: (jsonFilesString: Array<string>) => dispatch(getQuizzes(jsonFilesString)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
