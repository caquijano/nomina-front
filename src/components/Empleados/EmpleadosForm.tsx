import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as empleadoService from "./empleadoService";
import * as escalaSalarialService from "../EscalaSalarial/escalaSalarialService";
import { EscalaSalarial } from "../EscalaSalarial/EscalaSalarial";
function EmpleadosForm() {
  const token = localStorage.getItem("loggedUser");
  const initialState = {
    nombre: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    idEscala: "",
    fechaNto: new Date(),
    salario: 0,
    cargo: "",
    fechaEntrada: "",
  };
  const [empleado, setEmpleado] = useState(initialState);
  const [escalas, setEscalas] = useState<EscalaSalarial[]>([]);
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };
  const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (empleado.cargo && empleado.fechaEntrada) {
      saveEmpleado();
    } else {
      toast.error("Todos los campos son requeridos");
    }
  };

  const changeSalario = async (props:any) => {
     const ss:any = escalas.find(element => element._id == props)
     setEmpleado({ ...empleado, salario: ss?.salario, cargo: (`${ss?.cargo} ${ss?.nivel}`) });
     console.log(ss)
  }

  const saveEmpleado = async () => {
    await empleadoService
      .createEmpleado(empleado, `${token}`)
      .then(() => {
        toast.success("Información guardada satisfactoriamente");
        window.location.href="colaboradoreslist"
      })
      .catch((e) => {
        toast.error(e);
      });
  };
  const CargarEscala = async () => {
    const res = await escalaSalarialService.getEscalaSalariales();
    setEscalas(res.data);
  };
  useEffect(() => {
    CargarEscala();
  }, []);
  useEffect(() => {
    changeSalario(empleado.idEscala);
  }, [empleado.idEscala]);
  return (
    <div style={{ padding: "5%" }}>
      <div style={{ textAlign: "center" }}>
        <h4>Contratación</h4>
      </div>

      <form className="row g-3" onSubmit={handlSubmit}>
      <div className="col-md-4">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            placeholder=""
            onChange={handlerInputChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Apellidos:</label>
          <input
            type="text"
            className="form-control"
            name="apellidos"
            placeholder=""
            onChange={handlerInputChange}
          />
        </div>
        <div className="col-4">
          <label className="form-label">
            Fecha de Nacimiento:{" "}
          </label>
          <input
            type="date"
            className="form-control"
            placeholder=""
            name="fechaNto"
            onChange={handlerInputChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Telefono:</label>
          <input
            type="text"
            className="form-control"
            name="telefono"
            placeholder=""
            onChange={handlerInputChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Dirección:</label>
          <input
            type="text"
            className="form-control"
            name="direccion"
            placeholder=""
            onChange={handlerInputChange}
          />
        </div>
        <div className="col-4">
          <label className="form-label">
            Fecha de inicio:{" "}
          </label>
          <input
            type="date"
            className="form-control"
            placeholder=""
            name="fechaEntrada"
            onChange={handlerInputChange}
          />
        </div>
        <div className="col-md-5">
          <label className="form-label">Cargo</label>
          <select defaultValue={'DEFAULT'} onChange={handlerInputChange}  name="idEscala" className="form-select">
            <option value="DEFAULT" disabled>Elige un cargo...</option>
            {escalas.map((element: any, index: number) => {
                return(
                    <option value={element._id} key={index}>{element.cargo} - {element.nivel}</option>
                )
            })}
            
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Salario:</label>
          <input
          disabled
            type="text"
            className="form-control"
            name="salario"
            placeholder={`${empleado.salario}`}
            value={empleado.salario}
            onChange={handlerInputChange}
          />
        </div>
        
        <div className="col-7"></div>
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
  );
}

export default EmpleadosForm;
