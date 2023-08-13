export default async function deleteQuestion(examId: number | string, questionId: number | string) {
  const URL = `${process.env.NEXT_PUBLIC_PROXY}/api/exam/${examId}/question/${questionId}`;
  try {
    const response = await fetch(URL, {
      method: 'DELETE'
    });

    const deletedExam = response.json();

    if (!response.ok) {
      throw Error(response.statusText);
    }
  } catch(error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
  