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
  
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (newTitle.length === 0) {
      return;
    }
    const createdExam: NewExam = await createNewExam(newTitle);
    if (createdExam) {
      router.push(`/exam/${createdExam.exam.id}`)
    } else {
      alert('already exists')
    }
    
  };

  return (
    <>
      <div className={styles.newExam}>
        <input 
          className={styles.titleInput}
          type="text"
          placeholder="Exam Title"
          onChange={(e) => { setNewTitle(e.target.value)}}
        />
        <button className='btn btn-primary' onClick={handleClick}>Create</button>
      </div>

      <hr />
    </>
  )
}