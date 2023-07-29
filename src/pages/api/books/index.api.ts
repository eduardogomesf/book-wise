import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { BookWithUserRating } from "../../../types/book";

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

  const userId = req.query.userId ? String(req.query.userId) : ''
  const search = req.query.search ? String(req.query.search) : ''
  const categoriesIds = req.query.category ? req.query.category : null

  const rawBooks = await prisma.$queryRaw<any[]>`
    SELECT
      b.cover_url,
      b.id,
      b.author,
      b.name,
      AVG(r.rate) AS rate,
      CASE WHEN u.user_id IS NOT NULL THEN 1 ELSE 0 END AS alreadyRead
    FROM books b
    JOIN ratings r ON r.book_id = b.id
    LEFT JOIN (SELECT DISTINCT book_id, user_id FROM ratings WHERE user_id = ${userId}) u ON b.id = u.book_id
    LEFT JOIN CategoriesOnBooks cb ON b.id = cb.book_id
    LEFT JOIN categories c ON cb.categoryId = c.id
    WHERE
    (${categoriesIds} IS NULL OR FIND_IN_SET(cb.categoryId, ${categoriesIds}))
    AND (b.author LIKE ${`%${search}%`} OR b.name LIKE ${`%${search}%`})
    GROUP BY b.id, b.cover_url, b.author, b.name, u.user_id
  `

  const books: BookWithUserRating[] = rawBooks.map((book) => {
    return {
      id: book.id,
      name: book.name,
      author: book.author,
      coverUrl: book.cover_url,
      numberOfRatings: book.number_of_ratings,
      rate: book.rate,
      alreadyRead: book.alreadyRead === 1
    }
  })

  return res.json({ books })
}
