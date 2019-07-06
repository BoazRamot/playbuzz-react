import React from 'react';
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";

interface IProps {
  index: number;
  length: number;
}

const ProgressBar: React.FC<IProps> = ({index, length}) => {
  let counter = index;

  return (
    <header>
      <MobileStepper
        variant="progress"
        steps={length}
        position="static"
        activeStep={index}
        nextButton={<Button>out of {length}</Button>}
        backButton={<Button>current question {counter + 1}</Button>}
      />
    </header>
  )
};

export default ProgressBar;