import type { NextApiRequest, NextApiResponse } from 'next';

import activateHandler from '@/api/useCases/contentItem/activate/handler';
import activateCommand from '@/api/useCases/contentItem/activate/command';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const id: string = req.body.id ?? '';

  try {
    await activateHandler(new activateCommand(id));

    return res.status(204).end();
  } catch (e) {
    if ((e as Error).name === 'CustomError') {
      return res.status(400).json({
        message: (e as Error).message
      });
    }

    return res.status(500).json({
      message: 'Unknown error'
    });
  }
}