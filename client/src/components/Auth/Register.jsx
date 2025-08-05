import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { registerUser } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/features/authSlice";
import { useNavigate } from "react-router";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    userName: yup
      .string()
      .required("Please enter your username")
      .test(
        "no-whitespace",
        "userName should not contain whitespace",
        (value) => !/\s/.test(value)
      )
      .min(3, "User name must be at least 3 characters")
      .max(20, "Password must be 20 characters or less"),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email address"),
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

  const initialValues = { userName: "", email: "", password: "" };

  const onSubmit = async (values, actions) => {
    try {
      const payload = {
        userName: values.userName,
        email: values.email,
        password: values.password,
      };

      const res = await registerUser(payload);
      console.log("registerd succesfully:", res.data);
      if (res.data?.status === "success") {
        dispatch(setLoggedIn(true));
      }
      navigate("/");
      actions.resetForm();
    } catch (error) {
      console.error("User registration failed:", error);
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
        <h1 className="text-2xl text-gray-300 font-bold my-6">Register</h1>
        <div className="w-full">
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="bg-gray-200 flex items-center gap-5 my-4 p-4 rounded border-b-2 border-transparent focus-within:border-blue-500">
              <IoPersonSharp className="text-blue-950 text-xl cursor-pointer" />
              <input
                type="text"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-transparent border-none outline-none w-full text-blue-950"
                placeholder="Enter User Name"
              />
            </div>
            {formik.touched.userName && formik.errors.userName && (
              <p className="text-red-500 text-sm">{formik.errors.userName}</p>
            )}
            <div className="bg-gray-200 flex items-center gap-5 my-4 p-4 rounded border-b-2 border-transparent focus-within:border-blue-500">
              <MdEmail className="text-blue-950 text-xl cursor-pointer" />
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-transparent border-none outline-none w-full text-blue-950"
                placeholder="Enter Email"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
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
              Register
            </button>
            {formik.status && (
              <p className="text-red-500 text-sm text-center mt-0">
                {formik.status}
              </p>
            )}
            <div>
              <span className="m-4 text-white text-sm">
                Already Have Account?{" "}
                <Link
                  to="/auth/login"
                  className="text-gray-500 hover:text-white transition-colors duration-300 delay-150 ease-linear"
                >
                  Login
                </Link>{" "}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
