import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';

import { withORM } from '@/api/utils/database/withORM';

import CustomError from '@/api/errors/customError';

import { SessionUserInterface } from '@/domain/user/auth';
import { UserRole } from '@/domain/user/user';

import signUpHandler from '@/api/useCases/user/signUp/handler';
import signUpCommand from '@/api/useCases/user/signUp/command';

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getSession({ req });
  if (!session?.user) {
    return res.status(401).end('Unauthenticated');
  }
  if ((session.user as SessionUserInterface).role !== UserRole.Admin) {
    return res.status(403).end('Access denied');
  }

  const username: string | null = req.body.username ?? null;
  const password: string | null = req.body.password ?? null;

  if (!username || !password) {
    return res.status(400).json({
      error: 'Username and password required.'
    });
  }

  try {
    const user = await signUpHandler(new signUpCommand(
      username,
      password
    ));

    return res.status(200).json({
      user
    });
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