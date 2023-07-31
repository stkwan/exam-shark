// update a choice
// delete a choice

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  // get the params
  const { questionId, choiceId } = req.query;
  const { statement, correct } = req.body;
  // update a choice
  switch (req.method) {
    case 'PATCH':
      try {
        const choice = await prisma.choice.update({
          where: {
            questionId: Number(questionId),
            id: Number(choiceId),
          },
          data: {
            statement,
            correct,
          }
        });
        res.status(201).json( {choice} );
      } catch(error) {
        res.status(404).json( {error} );
      }
      break;
    
    case 'DELETE':
      try {
        const choice = await prisma.choice.delete({
          where: {
            questionId: Number(questionId),
            id: Number(choiceId),
          },
        });
        res.status(200).json( {choice} );
      } catch(error) {
        res.status(404).json( {error} );
      }
      break;

  }
}