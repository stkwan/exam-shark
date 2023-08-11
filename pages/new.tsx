import styles from '@/styles/newExam.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createNewExam } from '@/controllers/exam';
import { Exam } from '@/models/Exam';

interface NewExam {
  exam: Exam
}

export default function NewExam() {
  const [newTitle, setNewTitle] = useState<string>('');
  const router = useRouter();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTitle.length === 0) {
      return;
    }
    const createdExam: NewExam = await createNewExam(newTitle);
    if (createdExam) {
      router.push(`/exam/${createdExam.exam.id}`);
    } else {
      alert('An exam with that title already exists');
    }
  };

  return (
    <>
      <form className={styles.newExam} onSubmit={handleSubmit}>
        <input 
          className={styles.titleInput}
          type="text"
          placeholder="Exam Title"
          onChange={(e) => { setNewTitle(e.target.value)}}
        />
        <button className='btn btn-primary'>Create</button>
      </form>

      <hr />
    </>
  )
}