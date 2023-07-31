import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../../lib/prisma'

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

  const rawReviews = await prisma.rating.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' },
    include: {
      book: true
    }
  })

  if (!rawReviews || rawReviews.length === 0) {
    return res.status(200).json({ reviews: [] })
  }

  const reviews = rawReviews.map(review => {
    return {
      id: review.id,
      rate: review.rate,
      description: review.description,
      createdAt: new Date(review.created_at),
      book: {
        id: review.book.id,
        name: review.book.name,
        author: review.book.author,
        coverUrl: review.book.cover_url,
      }
    }
  })

  return res.json({ reviews })
}
