import auth0 from "../../../utils/auth0";

export default async function me(req, res) {
  // console.log("Hello");
  // console.log(auth0);
  try {
    await auth0.handleProfile(req, res);
  } catch (e) {
    res.status(e.status || 400).end(e.message);
  }
}
