import auth0 from "../../../utils/auth0";

export default async function me(req, res) {
  try {
    await auth0.handleProfile(req, res);
  } catch (e) {
    res.status(e.status || 400).end(e.message);
  }
}
