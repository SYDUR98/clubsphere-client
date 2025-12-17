import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SocialLogin from "../../components/Shared/SocialLogin";
import Swal from "sweetalert2";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  console.log("in the register page", location);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { reginsterUser, updateUserProfile } = useAuth();

  const handleRegistrationEmailPass = (data) => {
    console.log("after register", data.photo[0]);
    const profileImg = data.photo[0];
    reginsterUser(data.email, data.password)
      .then(() => {
        //store the image and get the photo url
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          // console.log('after image upload',res.data.data.display_url)
          const photoURL = res.data.data.display_url;
          console.log(photoURL);

          // create user in the database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              //   console.log("user created in the database");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration Successful!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });

          // update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user Profile updated");
              navigate(location?.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-20 mb-15">
      <div className="card-body">
        <h3 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
          Create an Account
        </h3>
        <p className="text-center text-indigo-500/80 font-medium mt-1">
          Register with ClubSphere
        </p>

        <form onSubmit={handleSubmit(handleRegistrationEmailPass)}>
          <fieldset className="fieldset space-y-4">
            {/* file user image field */}
            <label className="label text-base-content">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className={`file-input w-full ${
                errors.photo ? "border-error" : ""
              }`}
              placeholder="Photo"
            />
            {errors.photo && (
              <p className="text-error-content bg-error p-2 rounded-md shadow-sm mt-1">
                Photo is required
              </p>
            )}

            {/* name field of user */}
            <label className="label text-base-content">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className={`input w-full ${errors.name ? "border-error" : ""}`}
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-error-content bg-error p-2 rounded-md shadow-sm mt-1">
                Name is required
              </p>
            )}

            {/* email field */}
            <label className="label text-base-content">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`input w-full ${errors.email ? "border-error" : ""}`}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-error-content bg-error p-2 rounded-md shadow-sm mt-1">
                Email is required
              </p>
            )}

            {/* password */}
            <label className="label text-base-content">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
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
            {errors.password?.type === "minLength" && (
              <p className="text-error-content bg-error p-2 rounded-md shadow-sm mt-1">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-error-content bg-error p-2 rounded-md shadow-sm mt-1">
                Password must include uppercase and lowercase letters
              </p>
            )}

            <button className="btn btn-primary mt-4 w-full text-white font-semibold text-lg shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:brightness-110 transition-all">
              Register
            </button>
          </fieldset>
        </form>

        <p className="text-center text-neutral mt-4">
          Already have an account?{" "}
          <Link
            className="text-primary underline"
            state={location.state}
            to={"/login"}
          >
            Login
          </Link>
        </p>
      </div>

      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
