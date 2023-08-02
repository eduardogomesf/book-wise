import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../lib/prisma'

(BigInt.prototype as any).toJSON = function() {
  return Number(this)
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const userId = String(req.query.id)

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  const readingStaticsResult = await prisma.$queryRaw<any>`
    SELECT
      COUNT(r.id) AS numberOfRatings,
      SUM(b.total_pages) AS numberOfPagesRead,
      COUNT(DISTINCT b.author) AS numberOfAuthorsRead
    FROM ratings r
    JOIN books b ON r.book_id = b.id
    WHERE r.user_id = ${userId}
  `

  const mostReadCategoryResult = await prisma.$queryRaw<any>`
    SELECT
      c.name,
      COUNT(r.id) AS numberOfRatings
    FROM ratings r
    JOIN books b ON r.book_id = b.id
    JOIN CategoriesOnBooks cb ON b.id = cb.book_id
    JOIN categories c ON cb.categoryId = c.id
    WHERE r.user_id = ${userId}
    GROUP BY c.id, c.name
    ORDER BY numberOfRatings DESC
    LIMIT 1
  `
  const mostReadCategory = mostReadCategoryResult[0]?.name ?? 'N/A'
  const numberOfRatings = readingStaticsResult[0]?.numberOfRatings ?? 0
  const numberOfPagesRead = readingStaticsResult[0]?.numberOfPagesRead ?? 0
  const numberOfAuthorsRead = readingStaticsResult[0]?.numberOfAuthorsRead ?? 0

  const statistics = {
    mostReadCategory,
    numberOfRatings,
    numberOfPagesRead,
    numberOfAuthorsRead,
  }

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatar_url,
      createdAt: user.created_at,
    },
    statistics
  })
}
