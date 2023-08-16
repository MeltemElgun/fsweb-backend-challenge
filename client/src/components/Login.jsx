import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios
        .post("http://localhost:9000/api/auth/login", {
          username: data.username,
          password: data.password,
        })
        .then((res) => localStorage.setItem("user", JSON.stringify(res.data)));
      navigate("/dashboard");
      closeModal();
      toast.success("Giriş yapıldı");
    } catch (error) {
      console.error(error);
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
    navigate("/"); // çıkış yapınca ana sayfaya yönlendir
    toast.info("Çıkış yapıldı");
  };

  const [localToken, setLocalToken] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const localTokenCheck = async () => {
    await axios
      .get("localhost:9000/api/auth/register", {
        headers: {
          Authorization: `${localToken?.token}`,
        },
      })
      .then((res) => {
        res.data && setLocalToken(JSON.parse(localStorage.getItem("user")));
        setIsLoggedIn(true);
      });
  };

  useEffect(() => {
    localToken && localTokenCheck();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <img src="/icons/twitter.png" alt="" />

      <h1>Log In</h1>

      <input
        type="text"
        placeholder="username"
        {...register("username", { required: true })}
      />
      {errors.username && <p>This field is required</p>}

      <input
        type="password"
        placeholder="password"
        {...register("password", { required: true })}
      />
      {errors.password && <p>This field is required</p>}

      <button type="submit">Log In</button>

      <div className={styles.router}>
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")}>Sign up</span>
      </div>
    </form>
  );
}
