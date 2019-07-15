import React from 'react';
import {Typography} from '@material-ui/core';

interface IProps {
  variant: any;
  component: any;
  color?: any;
  content: any;
}

const QuizCardContent: React.FC<IProps> = ({ variant, component, color, content }) => {
  return (
    <Typography variant={variant} color={color} component={component}>
      {content}
    </Typography>
  );
};

export default QuizCardContent;