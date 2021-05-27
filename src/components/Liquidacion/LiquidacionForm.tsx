import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import * as empleadoService from "../Empleados/empleadoService";
import EmpleadosForm from "../Empleados/EmpleadosForm";
import * as settingsService from "../Settings/settingsService";

function LiquidacionForm() {
  const initialstate = {
    sueldo: 0,
    auxilio:0,
    workDays: 0,
    cesantias: 0,
    interCesantias: 0,
    prima:0,
    vacaciones: 0,
    total:0
  }
  const initialStateSettings = {
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
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [empleado, setEmpleado] = useState<any>({});
  const [liquidacion, setLiquidacion] = useState<any>({ idEmpleado: 0 });
  const [liqui, setLiqui] = useState(initialstate)
  const [settings, setSettings] = useState(initialStateSettings)
  const loadSettings = async () => {
    const res = await settingsService.getSettings();
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
  };
  const CargarEmpleados = async () => {
    const res = await empleadoService.getEmpleados();
    setEmpleados(res.data);
  };
  const CargarEmpleado = async () => {
    const res = await empleadoService.getEmpleado(liquidacion.idEmpleado);
    setEmpleado(res.data);
  };
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setLiquidacion({ ...liquidacion, [e.target.name]: e.target.value });
  };
  const CargarLiquidacion = async () => {
    
    let workDays = Math.ceil(moment(new Date()).diff(new Date(empleado.fechaEntrada))/86400000);
    let sueldo = empleado?.salario
    let auxilio = 0;
    if(empleado?.salario <= (+settings.smmlv)*2) {
      auxilio = +settings.auxTransporte;
    }else{
      auxilio = 0;
      console.log(settings)
    }
    let cesantias= Math.ceil(((empleado.salario + auxilio) * workDays)/360);
    let interCesantias= Math.ceil((cesantias * workDays * 0.12)/360);
    let prima = Math.ceil(((empleado.salario + auxilio) * workDays)/360);
    let vacaciones = Math.ceil(((empleado.salario) * workDays)/720);
    let total= cesantias + interCesantias + prima + vacaciones;
    setLiqui({...liqui, sueldo, workDays, auxilio, cesantias, interCesantias, prima, vacaciones, total})
  };
  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  useEffect(() => {
    CargarEmpleados();
    loadSettings();
  }, []);
  useEffect(() => {
    CargarEmpleado();
  }, [liquidacion]);
  useEffect(() => {
    CargarLiquidacion();
  }, [empleado, settings])
  return (
    <div style={{ padding: "5%" }}>
      <div style={{ textAlign: "center" }}>
        <h4>Calcular Liquidación</h4>
      </div>
      <form className="row g-3">
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
        <div
          className="d-grid gap-2 col-6 mx-auto"
          style={{ textAlign: "center" }}
        >
          <button type="button" className="btn btn-primary">
            Calcular
          </button>
        </div>
      </form>
      <div style={{ width: "100%", paddingInline:"13%"}}>
        <table className="table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col" colSpan={4}>
                DATOS LIQUIDACIÓN
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"></th>
              <td>Periodo (DD-MM-AAAA)</td>
              <td>{moment(empleado.fechaEntrada).format("ll")} - {moment(new Date()).format("ll")}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td>Dias laborados</td>
              <td>{liqui.workDays }</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td>Salario</td>
              <td>{formatterPeso.format(liqui.sueldo)}</td>
              <td></td>
            </tr>

            <tr>
              <th scope="row"></th>
              <td>Auxilio de Transporte</td>
              <td>{formatterPeso.format(liqui.auxilio)}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row" colSpan={4}>
                PRESTACIONES SOCIALES EN LA LIQUIDACIÓN DEL CONTRATO DE TRABAJO
                Liquidación definitiva de contrato de Trabajo. Son los pagos
                adicionales al salario (cesantías, intereses a las cesantías,
                prima de servicios y vacaciones) que constituyen beneficios para
                el empleado cuya finalidad es atender necesidades o cubrir
                riesgos. Estos valores son los que efectivamente serán recibidos
                en la liquidación definitiva del contrato de trabajo por un
                periodo de tiempo determinado.
              </th>
            </tr>
            <tr>
              <th scope="row"></th>
              <td>Cesantias</td>
              <td>{formatterPeso.format(liqui.cesantias)}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td>Intereses Sobre cesantias</td>
              <td>{formatterPeso.format(liqui.interCesantias)}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td>Prima de servicios</td>
              <td>{formatterPeso.format(liqui.prima)}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td>Vacaciones</td>
              <td>{formatterPeso.format(liqui.vacaciones)}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td>TOTAL</td>
              <td>{formatterPeso.format(liqui.total)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LiquidacionForm;
