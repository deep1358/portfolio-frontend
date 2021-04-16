import axios from "axios";

class BaseApi {
  constructor(accessToken, url) {
    this.config = {};
    if (accessToken) {
      this.config.headers = {
        authorization: `Bearer ${accessToken}`,
      };
    }
    this.apiUrl = process.env.PORTFOLIO_API_URL + url;
  }

  create(data) {
    const res = axios.post(`${this.apiUrl}`, data, this.config);
    return res;
  }
  getByUser() {
    const res = axios.get(`${this.apiUrl}/me`, this.config);
    return res;
  }
  getById(id) {
    const res = axios.get(`${this.apiUrl}/${id}`);
    return res;
  }
  getBySlug(slug) {
    const res = axios.get(`${this.apiUrl}/s/${slug}`);
    return res;
  }
  update(id, data) {
    const res = axios.patch(`${this.apiUrl}/${id}`, data, this.config);
    return res;
  }
  getAll() {
    return axios.get(this.apiUrl);
  }
}

export default BaseApi;
