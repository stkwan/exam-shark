// make an API endpoint to create a new exam record on Postgres database

import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method ===  'POST') {
    const { title } = req.body;
    const exam = await prisma.exam.create({
      data: {
        title,
      } 
    });
    res.status(201).json(exam);
  }

  if (req.method === 'GET') {
    const allExams = await prisma.exam.findMany();
    res.status(200).json(allExams);
  }
}




