import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

(BigInt.prototype as any).toJSON = function() {
  return Number(this)
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const books = await prisma.$queryRaw`
    SELECT b.cover_url, b.id, b.author, b.name, COUNT(r.id) AS number_of_ratings
    FROM books b
    JOIN ratings r ON r.book_id = b.id
    GROUP BY b.id, b.cover_url, b.author, b.name
    ORDER BY number_of_ratings DESC
    LIMIT 5;
  `

  return res.json({ books })
}
