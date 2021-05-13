import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
  useRef,
} from "react";
import { User } from "./User";
import { toast } from "react-toastify";
//import * as userService from "./userService";
import config from "../../config";
import jwt from "jsonwebtoken";
import Logo from "../../Images/logo.png";
import { Modal, Button } from "react-bootstrap";
import countries from "../../utils/countries.json";
import states from "../../utils/states.json";
import cities from "../../utils/cities.json";
import { useAuth, useFirebaseApp, useFirestore } from "reactfire";
import "firebase/firestore";
import "firebase/auth";

function Register(props: any) {
  const firebase = useFirebaseApp();
  const auth = useAuth();
  const db = useFirestore();
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

  const countryjson = countries;
  const statejson = states;
  const cityjson: any = cities;
  const [validate, setValidate] = useState(true);
  const [user, setUser] = useState<User>(initialState);
  const [btn, setBtn] = useState(false);
  const [codigo, setCodigo] = useState({
    codeVerify: 0,
  });
  const [show, setShow] = useState(false);
  const [random, setRandom] = useState(0);
  const [newState, setNewState] = useState<any>([]);
  const [newCities, setNewCities] = useState<any>([]);
  let random2: number;
  const inputRef = useRef<any>();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeForm = async () => {
    setLg(true);
  };
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlerInputChange2 = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setCodigo({ ...codigo, [e.target.name]: e.target.value });
  };
  const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      user.name &&
      user.fechanto &&
      user.email &&
      user.city &&
      user.country &&
      user.state
    ) {
      saveUser();
    } else {
      toast.error("Todos los campos son requeridos");
    }
  };

  const saveUser = async () => {
    let userId: any;
    let userEmail: any;
    let token: any;

    await auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        
        token = jwt.sign(
          {
            id: userId,
            email: userEmail,
          },
          config.SECRET,
          { expiresIn: 86400 }
        );
      })
      .catch((e) => {
        return toast.error(e);
      });

    await auth.onAuthStateChanged((response: any) => {
      userId = response.uid;
      userEmail = response.email;
      console.log(userEmail);
    });

    await db
      .collection("users")
      .add({
        Email: user.email,
        Nombre: user.name,
        Foto: "",
        UserId: userId,
        FechaNto: user.fechanto,
        Country: user.country,
        Departament: user.state,
        City: user.city,
        createAt: new Date(),
      })
      .then(() => {
        window.localStorage.setItem("loggedUser", JSON.stringify(token));
        window.location.href = "/";
        toast.success("Bienvenido");
      })
      .catch(() => {
        toast.error("Upps ocurrieron problemas");
      });
  };
  //console.log(inputRef);
  const passEqual = async () => {
    if (user.password === user.repeatPassword) {
      setValidate(true);
      setBtn(true);
    } else {
      setBtn(false);
      setValidate(false);
    }
  };
  useEffect(() => {
    const pais: number = +user.country;
    let departamento: any = statejson.states.filter(
      (states) => states.id_country == pais
    );
    setNewState(departamento);
  }, [user.country]);
  useEffect(() => {
    const departamento: number = +user.state;
    let cities: any = cityjson.cities.filter(
      (cities: any) => cities.id_state == departamento
    );
    setNewCities(cities);
    console.log(cities);
  }, [user.state]);
  useEffect(() => {
    passEqual();
  }, [user.password]);
  return (
    <div className="mb-3 col-lg-11">
      <div className="form-group col-lg-12">
        <div style={{ textAlign: "center" }}>
          <img src={Logo} style={{ width: "14%" }} />
          <h3>Registro de Usuario</h3>
        </div>
        <form onSubmit={handlSubmit}>
          <div className="mb-3 form-group row">
            <div className="col-lg-6">
              <label>Nombre </label>
              <input
                name="name"
                placeholder="Nombre"
                className="form-control"
                onChange={handlerInputChange}
              />
            </div>
            <div className="col-lg-6">
              <label>Fecha de Nto </label>
              <input
                type="date"
                placeholder="Fecha"
                name="fechanto"
                className="form-control"
                onChange={handlerInputChange}
              />
            </div>
          </div>
          <div className="mb-3 form-group row">
            <div className="col-lg-6">
              <label>Email </label>
              <input
                type="email"
                placeholder="name@green.com"
                name="email"
                className="form-control"
                onChange={handlerInputChange}
              />
            </div>
            <div className="col-lg-6">
              <label>Telefono </label>
              <select
                name="country"
                className="form-select"
                aria-label="Default select example"
                onChange={handlerInputChange}
              >
                {countryjson.countries.map((val: any, key: any) => {
                  return (
                    <option key={key} value={val.id}>
                      {val.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mb-3 form-group row">
            <div className="col-lg-6">
              <label>Selecciona tu Departamento</label>
              <select
                className="form-select"
                name="state"
                aria-label="Default select example"
                onChange={handlerInputChange}
              >
                {newState ? (
                  newState.map((val: any, key: any) => {
                    return (
                      <option key={key} value={val.id_country}>
                        {val.name}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </select>
            </div>
            <div className="col-lg-6">
              <label>selecciona tu Ciudad </label>
              <select
                className="form-select"
                name="city"
                aria-label="Default select example"
                onChange={handlerInputChange}
              >
                {newCities ? (
                  newCities.map((val: any, key: any) => {
                    return (
                      <option key={key} value={val.id_country}>
                        {val.name}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </select>
            </div>
          </div>
          <div className="mb-3 form-group row">
            <div className="col-lg-6">
              <label>Contraseña </label>
              <input
                className="form-control"
                name="repeatPassword"
                placeholder="Contraseña"
                type="password"
                id="password"
                onChange={handlerInputChange}
              />
            </div>
            <div className="col-lg-6">
              <label>Repetir contraseña </label>
              <input
                className="form-control"
                name="password"
                placeholder="Repetir Contraseña"
                type="password"
                id="repeatPassword"
                onChange={handlerInputChange}
              />
            </div>
          </div>
          {user.password ? (
            <div>
              {validate ? (
                <div>
                  <p style={{ color: "green" }}>Coinciden las contraseñas</p>
                </div>
              ) : (
                <div>
                  <p style={{ color: "red" }}>No coinciden las contraseñas</p>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          {btn &&
          user.name &&
          user.fechanto &&
          user.email &&
          user.city &&
          user.country &&
          user.state &&
          user.password ? (
            <button type="submit" className="btn btn-primary btn-block">
              Registrarse
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-block"
              disabled
            >
              Registrarse
            </button>
          )}

          <div style={{ justifyContent: "flex-end" }}>
            <div>
              <button className="btn btn-link" onClick={changeForm}>
                ¿Ya tienes una cuenta? Inicia sesión
              </button>
            </div>
          </div>
        </form>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Verificación de Cuenta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Por favor digita el correo electronico que digitaste para validar
            que es tu email.
            <input
              placeholder="Codigo de verificación "
              type="number"
              name="codeVerify"
              onChange={handlerInputChange2}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" /*onClick={saveUser}*/>Confirmar</Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default Register;
