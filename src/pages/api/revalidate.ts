// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { privateEnv } from '~/consts';

type Data = {
  message: string;
};

const validatePathParam = z.string();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== privateEnv.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const path = validatePathParam.parse(req.query.path);
    // this should be the actual path not a rewritten path
    await res.revalidate(path);
    return res.json({ message: `${path} has been revalidated!` });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).json({ message: 'An error occurred' });
  }
}
