import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EscalaSalarial } from "./EscalaSalarial";
import * as escalaSalarialService from "./escalaSalarialService";

function EscSalarialForm() {
  const token = localStorage.getItem("loggedUser");
  const initialState = {
    cargo: "",
    nivel: "",
    salario: 0,
  };
  const [escala, setEscala] = useState<EscalaSalarial>(initialState);
  const [escalas, setEscalas] = useState<EscalaSalarial[]>([]);
  const [updateScala, setUpdateScala] = useState(true);
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setEscala({ ...escala, [e.target.name]: e.target.value });
  };
  const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (escala.cargo && escala.nivel && escala.salario) {
      saveEscala();
    } else {
      toast.error("Todos los campos son requeridos");
    }
  };

  const saveEscala = async () => {
    await escalaSalarialService
      .createEscalaSalarial(escala, `${token}`)
      .then(() => {
        toast.success("Información guardada satisfactoriamente");
        setUpdateScala(!updateScala);
        setEscala(initialState)
      })
      .catch((e) => {
        toast.error(e);
      });
  };
  const CargarEscala = async () => {
    const res = await escalaSalarialService.getEscalaSalariales();
    setEscalas(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    CargarEscala();
  }, [updateScala]);

  return (
    <div style={{ padding: "5%" }}>
      <div style={{ textAlign: "center" }}>
        <h4>Escala Salarial 2021</h4>
      </div>

      <form className="row g-3" onSubmit={handlSubmit}>
        <div className="col-md-7">
          <label className="form-label">Cargo:</label>
          <input
            type="text"
            className="form-control"
            name="cargo"
            placeholder="Cargo..."
            onChange={handlerInputChange}
          />
        </div>
        <div className="col-md-5">
          <label className="form-label">Nivel:</label>
          <input
            type="text"
            className="form-control"
            name="nivel"
            placeholder="nivel (senior- semi senio - junior"
            onChange={handlerInputChange}
          />
        </div>
        <div className="col-5">
          <label htmlFor="inputAddress" className="form-label">
            Salario:{" "}
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="$Salario base "
            name="salario"
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
      <div style={{ marginTop: 25 }}>
        <ol className="list-group list-group">
          {escalas.map((item:any, index:number) => {
            return (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{item.cargo}</div>
                  {item.nivel}
                </div>
                <span className="badge bg-primary rounded-pill">{item.salario}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default EscSalarialForm;
