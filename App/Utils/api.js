var api = {
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
  }

}

module.exports = api;