import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';

import { withORM } from '@/api/utils/database/withORM';

import { SessionUserInterface } from '@/domain/user/auth';
import { UserRole } from '@/domain/user/user';

import makeDraftHandler from '@/api/useCases/contentItem/makeDraft/handler';
import makeDraftCommand from '@/api/useCases/contentItem/makeDraft/command';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getSession({ req });
  if (!session?.user) {
    return res.status(401).end('Unauthenticated');
  }

  const user = session.user as SessionUserInterface;
  if (user.role !== UserRole.Admin) {
    return res.status(403).end('Access denied');
  }

  const id: string = req.body.id ?? '';

  try {
    await makeDraftHandler(new makeDraftCommand(id));

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

export default withORM(handler);