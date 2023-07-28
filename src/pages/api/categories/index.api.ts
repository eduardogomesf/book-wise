import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { Category } from "../../../types/category";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const rawCategories = await prisma.category.findMany()

  const categories: Category[] = rawCategories.map((category) => ({
    id: category.id,
    name: category.name,
  }))

  return res.json({ categories })
}
