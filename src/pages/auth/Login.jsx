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
    setValue,
    formState: { errors },
  } = useForm();

  const from = location.state?.from || "/";

  // 🔐 Normal Login
  const handleSubmitLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: "Login successful",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Invalid credentials",
        });
      });
  };

  // ⚡ Demo Login
  const handleDemoLogin = () => {
    const demoEmail = "admin@gmial.com";
    const demoPassword = "Aadmin@gmial.com";

    setValue("email", demoEmail);
    setValue("password", demoPassword);

    signInUser(demoEmail, demoPassword)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Demo Login Successful",
          timer: 1200,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire("Error", "Demo login failed", "error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl border border-base-300">
        <div className="card-body">
          <h3 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome Back
          </h3>
          <p className="text-center text-base-content/70 mt-1">
            Login to ClubSphere
          </p>

          <form onSubmit={handleSubmit(handleSubmitLogin)} className="mt-4">
            <fieldset className="space-y-4">

              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  {...register("email", { required: "Email is required" })}
                  className={`input input-bordered w-full ${
                    errors.email && "input-error"
                  }`}
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      message:
                        "Min 6 chars, include uppercase & lowercase",
                    },
                  })}
                  className={`input input-bordered w-full ${
                    errors.password && "input-error"
                  }`}
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="text-right">
                <a className="link link-hover text-sm text-secondary">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button className="btn w-full text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110">
                Login
              </button>

              {/* Demo Login */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="btn btn-outline w-full border-primary text-primary hover:bg-primary hover:text-white"
              >
                Demo Login
              </button>
            </fieldset>
          </form>

          <p className="text-center text-base-content/70 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              state={{ from }}
              className="text-primary font-semibold underline"
            >
              Register
            </Link>
          </p>

          {/* Social Login */}
          <div className="mt-4">
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
