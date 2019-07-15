import React from 'react';
import {Button} from '@material-ui/core';

interface IProps {
  size: any;
  color: any;
  onClick?: any;
  value: any;
}

const QuizCardActions: React.FC<IProps> = ({ size, color, onClick, value }) => {
  return (
    <Button size={size} color={color} onClick={onClick}>
      {value}
    </Button>
  );
};

export default QuizCardActions;