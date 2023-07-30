// get all questions to a specific exam

import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  const { examId } = req.query;
  const { number, prompt } = req.body;

  switch (req.method) {
    case 'GET':
      const questions = await prisma.question.findMany({
        where: {
        examId: Number(examId),
      },
      });

      if (questions) {
        res.status(200).json( {questions} );
      }
    
    case 'POST':
      const question = await prisma.question.create({
        data: {
          examId: Number(examId),
          number: Number(number),
          prompt,
        }
      });
      res.status(201).json( {question} );
  }

}