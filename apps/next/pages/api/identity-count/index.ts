/* Core */
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { body } = req
    const { amount = 1 } = body

    // simulate IO latency
    await new Promise((r) => setTimeout(r, 1000))

    return res.status(200).json({ data: amount })
  }
}
