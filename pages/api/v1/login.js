import auth0 from "../../../utils/auth0";

export default async function login(req, res) {
  try {
    await auth0.handleLogin(req, res);
  } catch (e) {
    res.status(e.status || 400).end(e.message);
  }
}
