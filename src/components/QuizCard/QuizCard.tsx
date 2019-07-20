import React from 'react';
import {Card, CardActionArea, CardActions, CardContent} from '@material-ui/core';
import {connect} from "react-redux";
import {IRootState} from "../../store/configureStore";

interface IProps {
  imgSrc: string;
  name: string;
  short?: boolean
  quizCardContent: any;
  quizCardActions: any;
}

const QuizCard: React.FC<IProps> = ({ imgSrc, name, quizCardContent, quizCardActions, short = false }) => {

  return (
    <Card className="card">
      <CardActionArea className="card">
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
        {quizCardActions}
      </CardActions>
    </Card>
  )
};

const mapStateToProps = (state: IRootState) => ({
    lastIndex: state.questionIndex.lastIndex,
});

export default connect(mapStateToProps)(QuizCard);