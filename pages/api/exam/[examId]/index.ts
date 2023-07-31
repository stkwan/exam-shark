// Get a single exam
// Edit title of exam
// Delete an exam

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/db';

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  const { examId } = req.query;
  const { title } = req.body;

  switch (req.method) {

    case 'GET':
      try {
        const getExam = await prisma.exam.findUnique({
          where: {
            id: Number(examId),
          },
        });
        if (getExam) {
          res.status(200).json(getExam);
        } else {
          throw new Error('Exam not found');
        }
      } catch(error) {
        if (error instanceof Error) {
          const message = error.message;
          res.status(404).json( {error: message} );
        }
      }
      break;

    case 'PATCH':
      try {
        const updateExam = await prisma.exam.update({
          where: {
            id: Number(examId),
          },
          data: {
            title,
          }
        });
        res.status(200).json(updateExam);
      } catch (error) {
        res.status(404).json( {error} );
      }
      break;

    case 'DELETE':
      try {
        const deleteExam = await prisma.exam.delete({
          where: {
            id: Number(examId),
          }
        });
        res.status(200).json(deleteExam);
        break;
      } catch(error) {
        res.status(404).json({error});
      }
      break;

    }
}