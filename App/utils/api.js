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

  getPhotoLikes(user_id){
    var url = `${AppConstants.API_URL}/api/photos/check`;
    var data = {
      user_id: user_id
    };
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(data)
    }).then((res) => res.json());
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

  addComment(text, username, photo_id) {
    var url = `${AppConstants.API_URL}/api/comments`;
    var data = {
      text: text,
      username: username,
      photo_id: photo_id
    };
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
        },
      body: JSON.stringify(data)
    }).then((res) => res.json());
  },

  addPhoto(photo, username, request_id, tags, description) {

    var data = {
      username: username,
      request_id: request_id,
      tags: JSON.stringify(tags),
      description: description,
      photo: photo
    };
    var url = `${AppConstants.API_URL}/api/photos`;

    return fetch(url, {
      method: 'POST',
      mode: 'FormData',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       },
      body: JSON.stringify(data)
    }).then((res) => res.json());
  
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