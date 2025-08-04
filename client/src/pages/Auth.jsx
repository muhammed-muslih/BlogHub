import { Outlet } from "react-router";
const Auth = () => {
  return (
    <>
      <div className="h-[100vh] flex justify-center items-center bg-gray-100">
        <Outlet />
      </div>
    </>
  );
};
export default Auth;
