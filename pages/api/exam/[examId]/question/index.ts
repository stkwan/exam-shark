// get all questions to a specific exam

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/db';

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  const { examId } = req.query;
  const { number, prompt } = req.body;

  switch (req.method) {
    case 'GET':
      try {
        const questions = await prisma.question.findMany({
          where: {
            examId: Number(examId),
          },
          include: {
            choices: true,
          }
        });
        res.status(200).json( {questions} );
      } catch(error) {
        res.status(404).json( {error} );
      }
      break;

    case 'POST':
      try {
        const question = await prisma.question.create({
          data: {
            examId: Number(examId),
            number: Number(number),
            prompt,
          }
        });
        res.status(201).json( {question} );
      } catch(error) {
        res.status(404).json( {error} );
      }
      break;
  }

}