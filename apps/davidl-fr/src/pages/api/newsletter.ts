export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required' });
  }

  try {
    const API_KEY = process.env.MAILERLITE_API_KEY;
    // Optional: assign new subscribers to a MailerLite group
    const GROUP_ID = process.env.MAILERLITE_GROUP_ID;

    const response = await fetch(
      'https://connect.mailerlite.com/api/subscribers',
      {
        body: JSON.stringify({
          email,
          ...(GROUP_ID ? { groups: [GROUP_ID] } : {}),
        }),
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    if (!response.ok) {
      return res.status(400).json({
        error:
          'Hm, couldn’t add you to the newsletter - ping me directly at dleuliette@gmail.com and I’ll add you to this list!',
      });
    }

    return res.status(201).json({ error: '' });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
