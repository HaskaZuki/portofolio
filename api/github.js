export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const username = req.query.username || 'HaskaZuki';
  const GITHUB_API_URL = `https://api.github.com/users/${username}/events/public`;
  const { GITHUB_TOKEN } = process.env;

  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(GITHUB_API_URL, { headers });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const events = await response.json();

    const formattedEvents = events.slice(0, 10).map(event => ({
      id: event.id,
      type: event.type,
      repo: {
        name: event.repo.name,
        url: `https://github.com/${event.repo.name}`,
      },
      createdAt: event.created_at,
      payload: formatPayload(event),
    }));

    return res.status(200).json({
      success: true,
      events: formattedEvents,
    });

  } catch (error) {
    console.error('GitHub API Error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to fetch GitHub activity',
      events: []
    });
  }
}

function formatPayload(event) {
  switch (event.type) {
    case 'PushEvent':
      return {
        commits: event.payload.commits?.length || 0,
        message: event.payload.commits?.[0]?.message || '',
      };
    case 'PullRequestEvent':
      return {
        action: event.payload.action,
        title: event.payload.pull_request?.title || '',
        url: event.payload.pull_request?.html_url || '',
      };
    case 'IssuesEvent':
      return {
        action: event.payload.action,
        title: event.payload.issue?.title || '',
        url: event.payload.issue?.html_url || '',
      };
    case 'WatchEvent':
      return {
        action: 'starred',
      };
    case 'ForkEvent':
      return {
        forkUrl: event.payload.forkee?.html_url || '',
      };
    case 'CreateEvent':
      return {
        refType: event.payload.ref_type,
        ref: event.payload.ref,
      };
    default:
      return {};
  }
}
