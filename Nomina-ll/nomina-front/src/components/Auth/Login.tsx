import { useState, FormEvent, ChangeEvent } from "react";
import { User } from "./User";
import { toast } from "react-toastify";
import * as userService from "./userService";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Principal from "./Principal";
import Logo from '../../images/logo.png'

function Login(props: any) {
  const { setLg } = props;
  const initialState = {
    name: "",
    roles: "admin",
    email: "",
    password: "",
    repeatPassword: "",
    fechanto: new Date(),
    country: "",
    state: "",
    city: "",
  };

  const [user, setUser] = useState<User>(initialState);
  const [btn, setBtn] = useState(true);
  const changeForm = async () => {
    setLg(false);
  };
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const changeIcon = async () => {
    setBtn(!btn);
  };
  const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.email && user.password) {
      const sessionData = await userService.loginUser(
        user.email,
        user.password
      );
      if (sessionData.status === 204) {
        toast.error("Credenciales invalidas, verifique usuario o contraseña");
      } else {
        if (sessionData.status === 200) {
          const token: any = sessionData.data;
          window.localStorage.setItem("loggedUser", JSON.stringify(token));
          window.location.href = "/";
          toast.success("Bienvenido");
        } else {
          toast.error("Credenciales invalidas, verifique usuario o contraseña");
        }
      }
    } else {
      toast.error("Todos los campos son requeridos :(");
    }
  };

  return (
    <div className="mb-3">
      <div  style={{textAlign:"center"}}>
        <img src={Logo} style={{width:"10%"}}/>
        <h3>Inicio de sesión</h3>
      </div>
      <form style={{paddingInline:"5%"}} onSubmit={handlSubmit}>
        <div  className="mb-3">
          <label>Email </label>
          <div className="form-group row col-lg-12">
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Ingresa el email"
              onChange={handlerInputChange}
            />
            <div id="emailHelp" className="form-text">
              Nunca compartiremos su correo electrónico con nadie más.
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <div className="form-group row col-lg-12">
            <input
              name="password"
              type={btn ? "password" : "text"}
              className="form-control col-lg-11"
              placeholder="Digita tu contraseña"
              onChange={handlerInputChange}
            />
            {/*btn ? (
                <IoEye  
                  type="button"
                  onClick={changeIcon}
                  className="form-control col-lg-1"
                />
              ) : (
                <IoEyeOff
                  type="button"
                  onClick={changeIcon}
                  className="form-control col-lg-1"
                />
              )*/}
          </div>
        </div>
        <div className="form-group">
          <div className="custom-control custom-checkbox"></div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Iniciar sesión
        </button>
        <p className="forgot-password text-right">
          Olvidaste tu <a href="/RememberPassword">contraseña?</a>
        </p>
      </form>

      <button className="btn btn-link" onClick={changeForm}>
        Registrarse
      </button>
    </div>
  );
}

export default Login;
