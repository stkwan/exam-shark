// create a new exam
export const createNewExam = async (title: string) => {
  console.log({title});
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY}/api/exam`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title }),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    } else {
      if (json.error.code === 'P2002') {
        throw Error('An exam with that title already exists');
      }
    }
  } catch(error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
  
}