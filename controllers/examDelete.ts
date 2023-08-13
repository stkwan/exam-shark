export default async function deleteExam(id: number | string) {
  const URL = `${process.env.NEXT_PUBLIC_PROXY}/api/exam/${id}`;
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
  
  