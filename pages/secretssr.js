import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
// import { useGetUser } from "../actions/user";
import auth0, { withAuth } from "../utils/auth0";
// import { authorizeUser } from "../utils/auth0";

const SecretSsr = ({ user }) => {
  // const { data, loading } = useGetUser();
  return (
    <BaseLayout user={user} loading={false}>
      <BasePage>
        <h1>{user && user.name}</h1>
        {/* <h1>{title}</h1> */}
      </BasePage>
    </BaseLayout>
  );
};

// export const getServerSideProps = async ({ req, res }) => {
//   // const user = await authorizeUser(req, res);
//   const session = await auth0.getSession(req);
//   console.log(session);
//   if (!session || !session.user) {
//     res.writeHead(302, {
//       Location: "/api/v1/login",
//     });
//     res.end();
//     return { props: {} };
//   }
//   return {
//     props: { user: session.user },
//   };
// };

const getTitle = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res({ title: "Hello" });
    }, 500);
  });
};

export const getServerSideProps = withAuth(async ({ req, res }, user) => {
  const title = await getTitle();
  return title;
})();
export default SecretSsr;
