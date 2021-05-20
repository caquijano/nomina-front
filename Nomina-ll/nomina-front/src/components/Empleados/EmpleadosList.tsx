import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Empleado } from "./Empleado";
import * as empleadoService from "./empleadoService";
import moment from "moment";

function EmpleadosList() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  const CragarEmpleado = async () => {
    const res = await empleadoService.getEmpleados();
    setEmpleados(res.data);
  };
  useEffect(() => {
    CragarEmpleado();
  }, []);
  return (
    <div style={{ padding: "5%" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h4>Nuestro equipo de trabajo</h4>
      </div>
      <div style={{ textAlign: "right" }}>
        <button
          onClick={() => (window.location.href = "/colaboradores")}
          className="btn btn-outline-success"
        >
          {" "}
          <FiPlus /> Colaborador
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Cargo</th>
            <th scope="col">Telefono</th>
            <th scope="col">Dirección</th>
            <th scope="col">Tiempo con nosotros</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((element:any, index:number) => {
            return (
              <tr key={index} >
                <th scope="row">{index + 1}</th>
                <td>{element.nombre} {element.apellidos}</td>
                <td>{element.cargo}</td>
                <td>{element.telefono}</td>
                <td>{element.direccion}</td>
                <td>{moment(element.fechaEntrada, "YYYY-MM-DD").fromNow()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmpleadosList;
