import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/Shared/SocialLogin";
import Swal from "sweetalert2";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome! Your login was successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-20 mb-15">
      <div className="card-body">
        <h3 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome Back
        </h3>
        <p className="text-center text-indigo-400 font-medium mt-1">
          Login with ClubSphere
        </p>

        <form onSubmit={handleSubmit(handleSubmitLogin)}>
          <fieldset className="fieldset space-y-4">
            {/* email */}
            <label className="label text-base-content">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`input w-full ${errors.email ? "border-error" : ""}`}
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-error-content bg-error p-2 rounded-md shadow-sm mt-1">
                Email is required
              </p>
            )}

            {/* password */}
            <label className="label text-base-content ">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              })}
              className={`input w-full ${
                errors.password ? "border-error" : ""
              }`}
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-error-content bg-error p-2 rounded-md shadow-sm mt-1">
                Password is required
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-error-content bg-error p-2 rounded-md shadow-sm mt-1">
                Password must include uppercase and lowercase letters
              </p>
            )}

            <div>
              <a className="link link-hover text-secondary">Forgot password?</a>
            </div>

            <button className="btn btn-primary mt-4 w-full  text-white font-semibold text-lg shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:brightness-110 transition-all">
              Login
            </button>
          </fieldset>
        </form>

        <p className="text-center text-neutral mt-4">
          Don’t have an account?{" "}
          <Link
            className="text-primary underline"
            state={location.state}
            to={"/register"}
          >
            Register
          </Link>
        </p>
      </div>

      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
