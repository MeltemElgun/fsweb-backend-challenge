import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { loginStart, loginSuccess, loginFailed } from "../redux/userSlice";
const validationSchema = yup.object().shape({
  username: yup.string().required("Username boş olamaz"),
  passhash: yup.string().required("Password boş olamaz"),
});
export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      await axios
        .post("http://localhost:9000/api/auth/login", {
          username: data.username,
          passhash: data.passhash,
        })
        .then((res) => localStorage.setItem("user", JSON.stringify(res.data)));
      navigate("/");
      dispatch(loginSuccess(res.data));
      closeModal();
      toast.success("Giriş yapıldı");
    } catch (error) {
      console.error(error);
      dispatch(loginFailed());
      toast.error("Giriş yapılamadı");
      // Hata işleme
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("user"); // Kullanıcıyı localStorage'dan kaldır
    setIsLoggedIn(false); // isLoggedIn öğesini false olarak ayarlayın
    navigate("/login"); // çıkış yapınca ana sayfaya yönlendir
    toast.info("Çıkış yapıldı");
  };

  // const [localToken, setLocalToken] = useState(
  //   JSON.parse(localStorage.getItem("user"))
  // );
  // const localTokenCheck = async () => {
  //   await axios
  //     .get("http://localhost:9000/api/auth", {
  //       headers: {
  //         Authorization: `${localToken?.token}`,
  //       },
  //     })
  //     .then((res) => {
  //       res.data && setLocalToken(JSON.parse(localStorage.getItem("user")));
  //       setIsLoggedIn(true);
  //     });
  // };

  // useEffect(() => {
  //   localToken && localTokenCheck();
  // }, []);

  return (
    <div className="flex ">
      {/* Buton */}
      {/* {isLoggedIn ? (
        <div className="flex items-center">
          <button
            onClick={handleLogout} // Use handleLogout instead of openModal
            className="mt-1 flex  "
          >
            Çıkış Yap
          </button>
        </div>
      ) : (
        <button onClick={openModal} className="mt-1 flex items-center    ">
          Giriş Yap
        </button>
      )} */}
      {/* Modal Ekranı */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Username :
                    </label>

                    <input
                      id="username"
                      {...register("username", {
                        required: "Username boş olamaz",
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.username && (
                      <span className="text-sm text-red-700">
                        {errors.username.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Password :
                    </label>

                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: "Password boş olamaz",
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                      />

                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-3"
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          size="xs"
                          style={{ color: "#00000092", cursor: "pointer" }}
                        />
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-sm text-red-700">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div className="mt-4"></div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Kapat
                    </button>
                    <button
                      disabled={!isValid}
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Giriş Yap
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}
