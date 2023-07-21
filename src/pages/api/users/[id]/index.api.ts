import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

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

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatar_url,
  })
}
