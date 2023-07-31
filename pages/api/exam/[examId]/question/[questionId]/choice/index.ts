// get all choices for a given question within a given exam

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/db';

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  const { questionId } = req.query;
  const {statement, correct } = req.body;
  
  switch (req.method) {
    case 'GET':
      try {
        const choices = await prisma.choice.findMany({
          where: {
            questionId: Number(questionId),
          }
        });
        res.status(201).json( {choices} );
      } catch(error) {
        res.status(404).json( {error} );
      }
      break;
    
    case 'POST':
      try {
        const choice = await prisma.choice.create({
          data: {
            statement,
            correct,
            questionId: Number(questionId),
          }
        });
        res.status(201).json( {choice} );
      } catch(error) {
        res.status(404).json( {error} );
      }
      break;
  }
  
}