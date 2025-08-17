

async function youtubeAPIRequest(url, method = 'GET', accessToken, body = null) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (response.status === 401) throw new Error('AccessTokenExpired');

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'YouTube API error');
  }
     if (response.status === 204) {
      return null; 
    }


  return await response.json();
}

exports.youtubeAPIRequest = youtubeAPIRequest;