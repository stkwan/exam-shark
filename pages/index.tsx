import DashBoard from "./components/dashboard"
import type { GetServerSideProps } from "next";

import { Exam, ExamResponse } from '@/models/Exam';


// This gets called on every request
export const getServerSideProps: GetServerSideProps<ExamResponse> = async () => {
  // Fetch data from external API
  const res = await fetch(`${process.env.PROXY}/api/exam`);
  const examResponse: ExamResponse = await res.json();
  //console.log(data);

  // Pass data to the page via props
  return { props: { allExams: examResponse.allExams } }
}

export default function Home( { allExams }: ExamResponse ) {

  return (
    <main>
      <DashBoard allExams={allExams}/>
    </main>
  );
}
