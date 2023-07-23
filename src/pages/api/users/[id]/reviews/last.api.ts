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

  const rawLastReview = await prisma.rating.findFirst({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' },
    include: {
      user: true,
      book: true
    }
  })

  if (!rawLastReview) {
    return res.status(200).json({ lastReview: null })
  }

  const lastReview = {
    id: rawLastReview.id,
    rate: rawLastReview.rate,
    description: rawLastReview.description,
    createdAt: new Date(rawLastReview.created_at),
    book: {
      id: rawLastReview.book.id,
      name: rawLastReview.book.name,
      author: rawLastReview.book.author,
      coverUrl: rawLastReview.book.cover_url,
    },
    user: {
      id: rawLastReview.user.id,
      avatarUrl: rawLastReview.user.avatar_url ?? "",
      name: rawLastReview.user.name,
    }
  }

  return res.json({ lastReview })
}
