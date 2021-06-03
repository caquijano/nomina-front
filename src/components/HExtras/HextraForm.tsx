import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import moment from "moment";
import * as momento from "moment-timezone";
import { toast } from "react-toastify";
import * as hextraService from "./hextraService";
import { Empleado } from "../Empleados/Empleado";
import * as empleadoService from "../Empleados/empleadoService";
import * as settingsService from "../Settings/settingsService";
import 'moment/locale/es';
function HextraForm() {
  const token = localStorage.getItem("loggedUser");
  const initialState = {
    idEmpleado: "",
    nombreEmpleado: "",
    hed: 0,
    hen: 0,
    valor: 0,
    fechaNovedad: new Date().toLocaleDateString("co"),
  };
  const initialStateSettings = {
    hed: "",
    hen: "",
  };

  const [hextra, setHExtra] = useState(initialState);
  const [hextras, setHExtras] = useState<any[]>([]);
  const [updateHExtra, setUpdateHExtra] = useState(true);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [name, setName] = useState(true);
  const [settings, setSettings] = useState<any>(initialStateSettings);
  const [updateScala, setUpdateScala] = useState(true);
  const loadSettings = async () => {
    const res = await settingsService.getSettings();
    const { hed, hen } = res.data[0];
    setSettings({
      hed,
      hen,
    });
  };
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setHExtra({ ...hextra, [e.target.name]: e.target.value });
  };
  const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      hextra.idEmpleado &&
      (hextra.hed || hextra.hen) &&
      hextra.fechaNovedad
    ) {
      saveHExtra();
    } else {
      toast.error("Todos los campos son requeridos");
    }
  };
  const changeNombre = async (props: any) => {
    const ss: any = empleados.find((element) => element._id == props);
    setName(!name);
    setHExtra({ ...hextra, nombreEmpleado: `${ss?.nombre} ${ss?.apellidos}` });
  };
  const changeValor = async (props: any) => {
    const ss: any = empleados.find((element) => element._id == props);
    const vl: number =
      ((+hextra.hed * +ss?.salario) / 240) * (1 + +settings.hed / 100) +
      ((+hextra.hen * +ss?.salario) / 240) * (1 + +settings.hen / 100);
    setHExtra({ ...hextra, valor: Math.round(vl) });
  };
  const CargarEmpleado = async () => {
    const res = await empleadoService.getEmpleados();
    setEmpleados(res.data);
  };
  const CargarHorasExtras = async () => {
    const res = await hextraService.getHExtras();
    setHExtras(res.data);
  };
  const saveHExtra = async () => {
    await hextraService
      .createHExtra(hextra, `${token}`)
      .then(() => {
        toast.success("Información guardada satisfactoriamente");
        setUpdateHExtra(!updateHExtra);
        setUpdateScala(!updateScala);
      })
      .catch((e) => {
        toast.error(e);
      });
  };
  useEffect(() => {
    changeValor(hextra.idEmpleado);
  }, [hextra.hed, hextra.hen, name]);
  useEffect(() => {
    changeNombre(hextra.idEmpleado);
  }, [hextra.idEmpleado]);
  useEffect(() => {
    CargarHorasExtras();
  }, [updateScala]);
  useEffect(() => {
    CargarEmpleado();
    loadSettings();
    
  }, []);
  return (
    <>
      <div style={{ padding: "5%" }}>
        <div style={{ textAlign: "center" }}>
          <h4>Horas Extras Mayo</h4>
        </div>
        <form className="row g-3" onSubmit={handlSubmit}>
          <div className="col-md-5">
            <label className="form-label">Nombre:</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              name="idEmpleado"
              onChange={handlerInputChange}
            >
              <option value="DEFAULT" disabled>
                Selecciona un colaborador
              </option>
              {empleados.map((element: any, index: number) => {
                return (
                  <option key={index} value={element._id}>
                    {element.nombre} {element.apellidos}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-7"></div>
          <div className="col-md-4">
            <label className="form-label">fecha:</label>
            <input
              type="date"
              min="2021-05-01"
              max="2021-05-31"
              className="form-control"
              name="fechaNovedad"
              onChange={handlerInputChange}
            />
          </div>
          <div className="col-4">
            <label className="form-label">Horas extras diurnas: </label>
            <input
              type="number"
              className="form-control"
              placeholder="Cantida de horas extras diurnas trabajadas "
              name="hed"
              onChange={handlerInputChange}
            />
          </div>
          <div className="col-4">
            <label className="form-label">Horas extras nocturnas: </label>
            <input
              type="number"
              className="form-control"
              placeholder="Cantida de horas extras nocturnas trabajadas  "
              name="hen"
              onChange={handlerInputChange}
            />
          </div>
          <div
            className="d-grid gap-2 col-6 mx-auto"
            style={{ textAlign: "center" }}
          >
            <button type="submit" className="btn btn-primary">
              Agregar
            </button>
          </div>
        </form>
      </div>
      <div style={{ paddingInline: "5%" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Colaborador</th>
              <th scope="col">Horas diurnas</th>
              <th scope="col">Horas nocturnas</th>
              <th scope="col">Valor ($)</th>

            </tr>
          </thead>
          <tbody>
            {hextras.map((element: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{momento.tz(element.fechaNovedad, "Africa/Dakar").format("LL")}</td>
                  <td>{element.nombreEmpleado}</td>
                  <td>{element.hed}</td>
                  <td>{element.hen}</td>
                  <td>{element.valor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HextraForm;
