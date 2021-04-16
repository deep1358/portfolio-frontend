// import axios from "axios";
import BaseApi from "./BaseApi"

class BlogApi extends BaseApi{
  constructor(accessToken) {
    super(accessToken,'/blogs')
    // this.apiUrl = process.env.PORTFOLIO_API_URL + "/blogs";
  }
  
  // create(data) {
  //   const res1 = axios.post(`${this.apiUrl}`, data, this.config);
  //   return res1;
  // }
  // getById(id) {
  //   const res = axios.get(`${this.apiUrl}/${id}`);
  //   return res;
  // }
  // update(id, data) {
  //   const res = axios.patch(`${this.apiUrl}/${id}`, data, this.config);
  //   return res;
  // }
}

export default BlogApi;
