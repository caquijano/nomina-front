import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as settingsService from "./settingsService";
import { toast } from "react-toastify";
import { Setting } from "./Setting";

function SettingsForm() {
  const token = localStorage.getItem("loggedUser");
  const initialState = {
    smmlv: "",
    auxTransporte: "",
    smIntegral: "",
    sena: "",
    icbf: "",
    ccf: "",
    primaServicios: "",
    vacaciones: "",
    iscm: "",
    cesantias: "",
    saludEmpleado: "",
    saludEmpresa: "",
    pensionEmpleado: "",
    pensionEmpresa: "",
    hed: "",
    hen: "",
  };
  const [settings, setSettings] = useState<any>(initialState);
  const [update, setUpdate] = useState(false)
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };
  const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      settings.auxTransporte &&
      settings.ccf &&
      settings.cesantias &&
      settings.hed &&
      settings.hen &&
      settings.icbf &&
      settings.iscm &&
      settings.pensionEmpleado &&
      settings.pensionEmpresa &&
      settings.primaServicios &&
      settings.saludEmpleado &&
      settings.saludEmpresa &&
      settings.sena &&
      settings.smIntegral &&
      settings.smmlv &&
      settings.vacaciones
    ) {
    if (update) {
        updateSetting();
    }else{
        saveSetting();
    }
      
    } else {
      toast.error("Todos los campos son requeridos");
    }
  };
  const loadSettings = async () => {

    const res = await settingsService.getSettings();
    if (res.data[0]) {
        const {
            auxTransporte,
            ccf,
            cesantias,
            hed,
            hen,
            icbf,
            iscm,
            pensionEmpleado,
            pensionEmpresa,
            primaServicios,
            saludEmpleado,
            saludEmpresa,
            sena,
            smIntegral,
            smmlv,
            vacaciones,
          } = res.data[0];
          setSettings({
            auxTransporte,
            ccf,
            cesantias,
            hed,
            hen,
            icbf,
            iscm,
            pensionEmpleado,
            pensionEmpresa,
            primaServicios,
            saludEmpleado,
            saludEmpresa,
            sena,
            smIntegral,
            smmlv,
            vacaciones,
          });
          setUpdate(true)
    }else{
        setUpdate(false)
    }
    
  };

  const saveSetting = async () => {
    await settingsService
      .createSetting(settings, `${token}`)
      .then(() => {
        toast.success("Información guardada satisfactoriamente");
        window.location.href = "/";
      })
      .catch((e) => {
        toast.error(e);
      });
  };
  const updateSetting = async () => {
    /*await settingsService
      .updateSetting(,settings, `${token}`)
      .then(() => {
        toast.success("Información guardada satisfactoriamente");
        window.location.href = "/";
      })
      .catch((e) => {
        toast.error(e);
      });*/
  };
  useEffect(() => {
    loadSettings();
  }, []);
  return (
    <div style={{ padding: "5%" }}>
      <div style={{ textAlign: "center" }}>
        <h3>Estos son los datos vigentes para el año 2021</h3>
      </div>

      <form onSubmit={handlSubmit} className=" row g-3">
        <div className="col-md-4">
          <label className="form-label">SMMLV:</label>
          <input
            type="number"
            className="form-control"
            name="smmlv"
            step="0.01"
            value={settings.smmlv}
            onChange={handlerInputChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Auxilio de transporte:</label>
          <input
            type="number"
            className="form-control"
            name="auxTransporte"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.auxTransporte}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputPassword4" className="form-label">
            Salario mínimo integral:
          </label>
          <input
            type="number"
            className="form-control"
            name="smIntegral"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.smIntegral}
          />
        </div>
        <h4>Porcentajes de nomina</h4>
        <h5>Aportes parafiscales</h5>
        <div className="col-md-3">
          <label className="form-label">SENA(%):</label>
          <input
            type="number"
            className="form-control"
            name="sena"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.sena}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">ICBF(%):</label>
          <input
            type="number"
            className="form-control"
            name="icbf"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.icbf}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Caja de compensación familiar(%):</label>
          <input
            type="text"
            className="form-control"
            name="ccf"
            onChange={handlerInputChange}
            value={settings.ccf}
          />
        </div>
        <h5>Cargas prestacionales</h5>
        <div className="col-md-3">
          <label className="form-label">Cesantías(%):</label>
          <input
            type="number"
            className="form-control"
            name="cesantias"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.cesantias}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Prima de servicios(%):</label>
          <input
            type="number"
            className="form-control"
            name="primaServicios"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.primaServicios}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Vacaciones(%):</label>
          <input
            type="number"
            className="form-control"
            name="vacaciones"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.vacaciones}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Intereses sobre las Cesantías(%):</label>
          <input
            type="number"
            className="form-control"
            name="iscm"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.iscm}
          />
        </div>
        <h5>Seguridad social</h5>
        <div className="col-md-3">
          <label className="form-label">Salud empresa(%):</label>
          <input
            type="number"
            className="form-control"
            name="saludEmpresa"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.saludEmpresa}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Salud empleado(%):</label>
          <input
            type="number"
            className="form-control"
            name="saludEmpleado"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.saludEmpleado}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Pensión empresa(%):</label>
          <input
            type="number"
            className="form-control"
            name="pensionEmpresa"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.pensionEmpresa}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Pension empleado(%):</label>
          <input
            type="number"
            className="form-control"
            name="pensionEmpleado"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.pensionEmpleado}
          />
        </div>
        <h5>Horas extras</h5>
        <div className="col-md-3">
          <label className="form-label">Hora extra diurna(%):</label>
          <input
            type="number"
            className="form-control"
            name="hed"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.hed}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Hora extra nocturna(%):</label>
          <input
            type="number"
            className="form-control"
            name="hen"
            step="0.01"
            onChange={handlerInputChange}
            value={settings.hen}
          />
        </div>
        <div className="col-md-6"></div>
        <div
          className="col-6   d-grid gap-2  mx-auto"
          style={{ textAlign: "center" }}
        >
         {update ?
        <button
                    style={{ marginTop: 40 }}
                    type="submit"
                    className="btn btn-success"
                >
                    Actualizar
        </button>
         :
          <button
            style={{ marginTop: 40 }}
            type="submit"
            className="btn btn-primary"
          >
            Enviar
          </button>}
        </div>
      </form>
    </div>
  );
}

export default SettingsForm;
