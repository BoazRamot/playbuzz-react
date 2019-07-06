import React from 'react';
import QuizCard from '../../components/QuizCard/QuizCard';
import {Quiz} from "../../models/Quiz";

interface IProps {
  id: string;
  score: number;
  quiz: Quiz;
}

const Summary: React.FC<IProps> = ({id, score, quiz}) => {
  const resultItem: any = quiz ? quiz.result.find(i => score <= i.score) : '';

  return (!quiz) ? null :(
    <QuizCard
      id={id}
      imgSrc={`/img/${resultItem.imgSrc}`}
      name={quiz.title}
      title={resultItem.title}
      text={resultItem.text}
    />
  )
};

export default Summary;