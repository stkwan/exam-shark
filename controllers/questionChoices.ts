// Create a new quesiton
// Once that quesiton object is returned as json
// Then create all the choices

interface QuestionInput {
  prompt: string;
  number: number;
}

interface ChoiceInput {
  statement: string;
  correct: boolean;
}

const addQuestionChoices = async (examId: number, question: QuestionInput, choices: ChoiceInput[]) => {
  //question
  const createdQuestion = await addQuestion(examId, question);
  
  //choices
  const questionId = createdQuestion.id;
  const URL = `${process.env.NEXT_PUBLIC_PROXY}/api/exam/${examId}/question/${questionId}/choice`;
  
  const createdChoices = await Promise.all(choices.map(choice => addChoice(URL, choice)));

  console.log(createdQuestion);
  console.log(createdChoices);

}

const addChoice = async (apiEndpoint: string, choice: ChoiceInput) => {
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(choice)
  });

  const newChoice = await response.json();

  if (response.ok) {
    return newChoice.choice;
  } else {
    return newChoice.error;
  }
}

const addQuestion = async (examId: number, question: QuestionInput) => {
  const URL = `${process.env.NEXT_PUBLIC_PROXY}/api/exam/${examId}/question`;
  //question
  const questionResponse = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(question)
  });

  const newQuestion = await questionResponse.json();

  if (questionResponse.ok) {
    return newQuestion.question;
  } else {
    return newQuestion.error;
  }
}

export default addQuestionChoices;