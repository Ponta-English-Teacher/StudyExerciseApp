import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    const visits = await kv.incr('study-app:visits');
    res.status(200).json({ visits });
  } catch (err) {
    console.error('Error updating visit counter:', err);
    res.status(500).json({ error: 'Failed to update counter' });
  }
}
