var api = {
  getUserInfo(token) {
    var url = `https://graph.facebook.com/me?access_token=${token}`;
    return fetch(url).then((res) => res.json());
  },

  getAllPhotos() {
    var url = `http://localhost:8888/api/photos`;
    return fetch(url).then((res) => res.json());
  },

  getAllRequests() {
    var url = `http://localhost:8888/api/requests`;
    return fetch(url).then((res) => res.json());
  },

  getSearch(text) {
    text = text || '*';
    var url = `http://localhost:8888/api/search/${text}`;
    return fetch(url).then((res) => res.json());
  },

  getRequest(id) {
    id = id || '*';
    var url = `http://localhost:8888/api/requests/${id}`;
    return fetch(url).then((res) => res.json());
  },

  getUser(id) {
    id = id || '*';
    var url = `http://localhost:8888/api/users/${id}`;
    return fetch(url).then((res) => res.json());
  },

  // TODO: size
  addPhoto(photo, username, request_id, tags, description, size) {
    var data = new FormData();
    data.append('username', username);
    data.append('request_id', request_id);
    data.append('tags', JSON.stringify(tags));
    data.append('description', description);
    data.append('size', size);
    data.append('photo', photo);
    var url = `http://localhost:8888/api/photos`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(data)
    }).then((res) => res.json());
  },
  
};

module.exports = api;