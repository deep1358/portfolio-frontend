import axios from "axios";
import BaseApi from "./BaseApi";

class PortfolioApi extends BaseApi {
	constructor(accessToken) {
		super(accessToken, "/portfolios");
	}
	delete(id) {
		const res1 = axios.delete(`${this.apiUrl}/${id}`, this.config);

		return res1;
	}
}

export default PortfolioApi;
