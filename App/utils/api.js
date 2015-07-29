var AppConstants = require('../constants/app-constants.js');

var api = {

  getUserInfo(token) {
    var url = `https://graph.facebook.com/me?access_token=${token}`;
    return fetch(url).then((res) => res.json());
  },

  getAllPhotos() {
    var url = `${AppConstants.API_URL}/api/photos`;
    return fetch(url).then((res) => res.json());
  },

  getInfoForPhoto(photoId) {
    var url = `${AppConstants.API_URL}/api/comments/photo/${photoId}`;
    return fetch(url).then((res) => res.json());
  },

  getAllRequests() {
    var url = `${AppConstants.API_URL}/api/requests`;
    return fetch(url).then((res) => res.json());
  },

  getSearch(text) {
    text = text || '*';
    var url = `${AppConstants.API_URL}/api/search/${text}`;
    return fetch(url).then((res) => res.json());
  },

  getRequest(id) {
    id = id || '*';
    var url = `${AppConstants.API_URL}/api/requests/${id}`;
    return fetch(url).then((res) => res.json());
  },

  getUser(id) {
    id = id || '*';
    var url = `${AppConstants.API_URL}/api/users/${id}`;
    return fetch(url).then((res) => res.json());
  },

  addRequest(text, username, tags) {
    var url = `${AppConstants.API_URL}/api/requests`;
    var data = {
      text: text,
      username: username,
      tags: tags
    };
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(data)
    }).then((res) => res.json());
  },

  addPhoto(photo, username, request_id, tags, description, size) {
    var data = new FormData();
    data.append('username', username);
    data.append('request_id', request_id);
    data.append('tags', JSON.stringify(tags));
    data.append('description', description);
    data.append('size', size);
    data.append('photo', photo);
    console.log(data);
    var url = `${AppConstants.API_URL}/api/photos`;

  // TODO: account for size on the back-end

    // return fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multiform/form-data'
    //    },
    //   body: JSON.stringify(data)
    // }).then((res) => res.json());
  
  },

  findOrCreateUser(FacebookId, username, token) {
    var url = `${AppConstants.API_URL}/api/users`;
    var data = {
      FacebookId: FacebookId,
      username: username,
      access_token: token
    };
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(data)
    }).then((res) => res.json());
  }
  
};

module.exports = api;