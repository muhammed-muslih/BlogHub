import { IoPersonSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { loginUser } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/features/authSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    userNameOrEmail: yup
      .string()
      .required("Please enter your username or email")
      .test("username-or-email", "Enter a valid username or email", (value) => {
        if (!value) return false;

        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          value
        );
        const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(value);

        return isEmail || isUsername;
      }),
    password: yup
      .string()
      .required("Please enter your password")
      .test(
        "no-whitespace",
        "Password should not contain whitespace",
        (value) => !/\s/.test(value)
      )
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must be 15 characters or less"),
  });

  const initialValues = { userNameOrEmail: "", password: "" };

  const onSubmit = async (values, actions) => {
    try {
      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        values.userNameOrEmail
      );

      const payload = {
        password: values.password,
        ...(isEmail
          ? { email: values.userNameOrEmail }
          : { userName: values.userNameOrEmail }),
      };

      const res = await loginUser(payload);
      if (res.data?.status === "success") {
        dispatch(setLoggedIn(true));
      }
      navigate("/");
      actions.resetForm();
    } catch (error) {
      console.error("Login failed:", error);
      actions.setSubmitting(false);
      actions.setStatus(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="flex justify-center items-center h-full ">
      <div className="lg:w-[450px] bg-blue-950  py-10 pt-4 px-10 rounded-lg">
        <h1 className="text-4xl text-white font-bold mb-4 text-center">
          Blog Hub
        </h1>
        <hr className="text-gray-500" />
        <h1 className="text-2xl text-gray-300 font-bold my-6">Login</h1>
        <div className="w-full">
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="bg-gray-200 flex items-center gap-5 my-4 p-4 rounded border-b-2 border-transparent focus-within:border-blue-500">
              <IoPersonSharp className="text-blue-950 text-xl cursor-pointer" />
              <input
                type="text"
                name="userNameOrEmail"
                value={formik.values.userNameOrEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-transparent border-none outline-none w-full text-blue-950"
                placeholder="Enter User Name or Email"
              />
            </div>
            {formik.touched.userNameOrEmail &&
              formik.errors.userNameOrEmail && (
                <p className="text-red-500 text-sm">
                  {formik.errors.userNameOrEmail}
                </p>
              )}
            <div className="bg-gray-200 flex items-center gap-5 my-4 p-4 rounded border-b-2 border-transparent focus-within:border-blue-500">
              <RiLockPasswordFill
                className="text-blue-950 text-xl cursor-pointer"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              />
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-transparent border-none outline-none w-full text-blue-950"
                placeholder="Enter Password"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
            <button
              type="submit"
              className="w-full mb-4 mt-6 rounded-full text-xl bg-gray-200 text-blue-950 hover:bg-white py-2 
            transition-colors duration-300 ease-linear font-semibold cursor-pointer"
            >
              Login
            </button>
            {formik.status && (
              <p className="text-red-500 text-sm text-center mt-0">
                {formik.status}
              </p>
            )}
            <div>
              <span className="m-4 text-white text-sm">
                New Here?{" "}
                <Link
                  to="/auth/register"
                  className="text-gray-500 hover:text-white transition-colors duration-300 delay-150 ease-linear"
                >
                  Create an Account
                </Link>{" "}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
