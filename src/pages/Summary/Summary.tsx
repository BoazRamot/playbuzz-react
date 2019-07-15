import React from 'react';
import QuizCard from '../../components/QuizCard/QuizCard';
import {Quiz} from "../../models/Quiz";
import QuizCardContent from "../../components/QuizCardContent/QuizCardContent";

interface IProps {
  id: string;
  score: number;
  quiz: Quiz;
}

const Summary: React.FC<IProps> = ({id, score, quiz}) => {
  const resultItem: any = quiz ? quiz.result.find(i => score <= i.score) : '';

  const summaryContent = () => {
    return(
      <div>
        <QuizCardContent variant="h5" component="h2" content={resultItem.title}/>
        <QuizCardContent variant="body1" color="textSecondary" component="p" content={resultItem.text}/>
      </div>
    )
  };

  return (!quiz) ? null :(
    <QuizCard
      id={id}
      imgSrc={`/img/${resultItem.imgSrc}`}
      name={quiz.title}
      title={resultItem.title}
      text={resultItem.text}
      quizCardContent={summaryContent()}
    />
  )
};

export default Summary;