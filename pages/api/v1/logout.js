import auth0 from "../../../utils/auth0";

export default async function logout(req, res) {
  // console.log();
  // console.log("Hello");
  // console.log(auth0);
  try {
    await auth0.handleLogout(req, res);
  } catch (e) {
    // console.log(e);
    res.status(e.status || 400).end(e.message);
  }
}
