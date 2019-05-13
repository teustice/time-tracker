function getToken(code, callback) {
  let data = {
    'grant_type': 'authorization_code',
    'client_secret': 'c7801ca2677ed95879306887625ac46485ed84fc5e4ab6e91f69b0479fb0afda',
    'code': code,
    'client_id': '8c72f5154be8eb27e1e4ae05313afdb4990e75c94de95901dc677853b2b16a9b',
    'redirect_uri': 'https://localhost:3000/auth'
  }

  fetch('https://api.freshbooks.com/auth/oauth/token', {
    method: 'POST',
    headers: {'Api-Version': 'alpha', 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then((res) => {
    return res.json()
  }).then((json) => {
    getUser(json, callback)
  })
}

function getUser(token, callback) {
  fetch('https://api.freshbooks.com/auth/api/v1/users/me', {
    headers: {
      'Api-Version': 'alpha',
      'Authorization': `Bearer ${token.access_token}`
    }
  }).then((res) => {
    return res.json()
  }).then((json) => {
    if(callback) {
      json.response['token'] = token;
      callback(json.response);
    }
    return json;
  })
}

module.exports = {
  getToken,
  getUser
}
