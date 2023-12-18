import { NextApiRequest, NextApiResponse } from 'next';
import Twitter from 'twitter-lite';

const twitterClient =  new Twitter({
    subdomain: "api", // "api" for tweet posting
    consumer_key: '6vHU83FmWr7lPumzWObgkd7I1',
    consumer_secret: '0Au9wsJ1lFeaZw9lwIHmu7IQu60l5fyC7EEbIw3ANr6J1s3IoO',
    access_token_key: '1678327012904292352-s8NlBmpgmiuZjSnY7mMJkcmaMAL0zD',
    access_token_secret: 'j4zMCW0MsGBbFoutu62qJMCyicLrmZdH0X7zB3FunJiq4',
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const tweetText = req.body.text;

    try {
        console.log('Tweeting:', tweetText);
        const tweet = await twitterClient.post('statuses/update', {
            status: tweetText,
        });
        console.log('Tweet posted:', tweet.text);
        res.json({ success: true, tweet: tweet });
      } catch (error) {
        console.error('Error posting tweet:', error);
        res.status(500).json({ success: false, error: error });
      }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
