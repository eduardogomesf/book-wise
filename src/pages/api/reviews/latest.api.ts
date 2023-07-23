import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { ReviewWithBook } from '../../../types/review'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const userId = req.query.userId ? String(req.query.userId) : null

  const whereClause = {}

  if (userId) {
    Object.assign(whereClause, {
      user_id: {
        not: userId
      }
    })
  }

  const reviewWithBook = await prisma.rating.findMany({
    orderBy: {
      created_at: 'desc'
    },
    include: {
      user: true,
      book: true
    },
    where: whereClause
  })

  if (!reviewWithBook || reviewWithBook.length === 0) {
    return res.status(200).json({ reviews: [] })
  }

  const reviews: ReviewWithBook[] = reviewWithBook.map((review) => ({
    id: review.id,
    rate: review.rate,
    description: review.description,
    createdAt: new Date(review.created_at),
    book: {
      id: review.book.id,
      name: review.book.name,
      author: review.book.author,
      coverUrl: review.book.cover_url,
    },
    user: {
      id: review.user.id,
      avatarUrl: review.user.avatar_url ?? "",
      name: review.user.name,
    }
  }))

  return res.json({ reviews })
}
