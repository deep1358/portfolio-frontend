import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
// import { useGetUser } from "../actions/user";
import auth0, { withAuth } from "../utils/auth0";
// import { authorizeUser } from "../utils/auth0";

const AdminSsr = ({ user }) => {
  // const { data, loading } = useGetUser();
  return (
    <BaseLayout user={user} loading={false}>
      <BasePage>
        <h1>{user && user.name}</h1>
      </BasePage>
    </BaseLayout>
  );
};

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
})("admin");
export default AdminSsr;
