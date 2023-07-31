// Get a single exam
// Edit title of exam
// Delete an exam

import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  const { examId } = req.query;
  const { title } = req.body;

  switch (req.method) {

    case 'GET':
      const getExam = await prisma.exam.findUnique({
        where: {
          id: Number(examId),
        },
      });
      if (getExam) {
        res.status(200).json(getExam);
      }
      res.status(400).json({error: 'Exam not found'})
      break;

    case 'PATCH':
      const updateExam = await prisma.exam.update({
        where: {
          id: Number(examId),
        },
        data: {
          title,
        }
      });
      res.status(200).json(updateExam);
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

    }
}