import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function requestHandler(req: NextApiRequest, res: NextApiResponse) {
  const { examId, questionId } = req.query;
  const { prompt } = req.body;

  switch (req.method) {
    case 'GET':
      try {
        const question = await prisma.question.findUnique({
          where: {
            examId: Number(examId),
            id: Number(questionId),
          }
        });
        res.status(200).json( {question} );
      } catch(error) {
        res.status(404).json( {error} );
      }
      break;

    case 'PATCH':
      try {
        if (prompt) {
          const updatedQuestion = await prisma.question.update({
            where: {
              examId: Number(examId),
              id: Number(questionId),
            },
            data: {
              prompt,
            }
            });
            res.status(200).json( {updatedQuestion} );
        } else {
          throw new Error('No prompt property given');
        }
      } catch (error) {
        if (error instanceof Error) {
          res.status(404).json( {error} );
        }
      }
      break;
    
    case 'DELETE':
      try{
        const deleteQuestion = await prisma.question.delete({
          where: {
            examId: Number(examId),
            id: Number(questionId)
          }
        });
        res.status(200).json( {deleteQuestion} )
      } catch(error) {
        res.status(400).json( {error} ) 
      }

  };
}


