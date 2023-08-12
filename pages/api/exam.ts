// make an API endpoint to create a new exam record on Postgres database

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/db';
import { title } from "process";

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method ===  'POST') {
    try {
      const { title } = req.body;

      if (!title || title.length < 1) {
        throw Error('Title must be provided');
      }

      const exam = await prisma.exam.create({
        data: {
          title,
        } 
      });
      res.status(201).json( {exam} );
    } catch(error) {
        if (error instanceof Error) {
          const message = error.message;
          res.status(400).json( {error: message} );
        }
    }
  }

  if (req.method === 'GET') {
    try {
      const allExams = await prisma.exam.findMany();
      res.status(200).json( {allExams} );
    } catch(error) {
      res.status(404).json( {error} )
    }
  }

}




