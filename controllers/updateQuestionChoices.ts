
//interface for question
interface QuestionArgument {
  prompt: string | null;
}

interface ChoiceArgument {
  id: number;
  statement: string;
  correct: boolean;
}

interface ChoiceWithoutId {
  statement: string;
  correct: boolean;
}

const updateQuestionChoices = async (
  examId: string | number,
  questionId: string | number,
  question: QuestionArgument,
  choices: ChoiceArgument[]
  ) => {

  const questionURL = `${process.env.NEXT_PUBLIC_PROXY}/api/exam/${examId}/question/${questionId}`;
  let updatedQuestion;
  let updatedChoices;

  // update the question
  if (question.prompt !== null && question.hasOwnProperty('prompt')) {
    updatedQuestion = await updateQuestion(questionURL, question);
  }

  // update the choices
  if (choices.length > 0) {
    updatedChoices = await Promise.all(choices.map(choice => updateAChoice(questionURL, choice)));
  }

  console.log({ updatedQuestion, updatedChoices });
  //return { updatedQuestion, updatedChoices };
};


const updateQuestion = async (apiEndpoint: string, question: QuestionArgument) => {
  const response = await fetch(apiEndpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(question),
  })

  const updatedQuestion = await response.json();

  if (response.ok) {
    return updatedQuestion;
  } else {
    throw Error(updatedQuestion);
  }
}


const updateAChoice = async (apiEndpoint: string, choice: ChoiceArgument) => {
  const { id } = choice;
  const choiceWithoutId: ChoiceWithoutId = {
    statement: choice.statement,
    correct: choice.correct
  };
  const choiceJSON = JSON.stringify(choiceWithoutId);

  const choiceEndpoint = `${apiEndpoint}/choice/${id}`;

  const response = await fetch(choiceEndpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: choiceJSON
  });

  const updatedChoice = await response.json();

  if (response.ok) {
    return updatedChoice;
  } else {
    throw Error(updatedChoice);
  }
}

export default updateQuestionChoices;

