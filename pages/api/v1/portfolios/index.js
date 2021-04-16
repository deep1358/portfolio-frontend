import PortfolioApi from "../../../../lib/api/portfolios";
import auth0 from "../../../../utils/auth0"

export default async function createPortfolio(req, res) {
  try {
    const data = req.body
    // console.log("1",data);
    const { accessToken } = await auth0.getSession(req)
    // console.log("2");
    const json = await new PortfolioApi(accessToken).create(data)
    // console.log("is",portfolio.data);
    return res.json(json.data)
  } catch (e) {
    // console.log("E",e);
    return res.status(e.status || 422).json(e.response.data)
  }
}