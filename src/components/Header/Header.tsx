import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import logo from '../../logo.png';
import {NavLink} from 'react-router-dom';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {restartQuestion} from "../../store/actions/action.questionReducer";
import {restartScore} from "../../store/actions/action.scoreReducer";

interface IProps {
  reset: Function;
}

const Header: React.FC<IProps> = ({reset}) => {
  const onClick = () => {
    reset();
  };

  return (
    <header>
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <img src={logo} className="App-logo" alt="logo"/>
          <Grid container
                direction="row"
                justify="space-around"
                alignItems="center"
                spacing={5}
          >
            <NavLink exact to="/" className="nav-link" activeClassName="nav-link-active" onClick={onClick}>
              <Typography variant="h6" className="mx-3 cursor-pointer">
                Home
              </Typography>
            </NavLink>
            <NavLink exact to="/quiz/q1" className="nav-link" activeClassName="nav-link-active" onClick={onClick}>
              <Typography variant="h6" className="mx-3 cursor-pointer">
                Quiz 1
              </Typography>
            </NavLink>
            <NavLink exact to="/quiz/q2" className="nav-link" activeClassName="nav-link-active" onClick={onClick}>
              <Typography variant="h6" className="mx-3 cursor-pointer">
                Quiz 2
              </Typography>
            </NavLink>
            <NavLink exact to="/quiz/q3" className="nav-link" activeClassName="nav-link-active" onClick={onClick}>
              <Typography variant="h6" className="mx-3 cursor-pointer">
                Quiz 3
              </Typography>
            </NavLink>
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  reset: () => {
    dispatch(restartQuestion());
    dispatch(restartScore());
  }
});

export default connect(null, mapDispatchToProps)(Header);
