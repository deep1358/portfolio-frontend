import axios from "axios";
import BaseApi from "./BaseApi";

class PortfolioApi extends BaseApi{
  constructor(accessToken) {
    super(accessToken,'/portfolios')
    // this.apiUrl = process.env.PORTFOLIO_API_URL + "/portfolios";
  }
  // getAll() {
  //   return axios.get(this.apiUrl);
  // }
  // getById(id) {
  //   const res = axios.get(`${this.apiUrl}/${id}`);
  //   return res;
  // }
  // create(data) {
  //   const res1 = axios.post(`${this.apiUrl}`, data, this.config);
  //   return res1;
  // }
  // update(id, data) {
  //   const res1 = axios.patch(`${this.apiUrl}/${id}`, data, this.config);
  //   return res1;
  // }
  delete(id) {
    const res1 = axios.delete(`${this.apiUrl}/${id}`, this.config);

    return res1;
  }
}

export default PortfolioApi;
