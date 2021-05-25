import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es";
import * as empleadoService from "../Empleados/empleadoService";
import * as settingsService from "../Settings/settingsService";
import * as hextraService from "../HExtras/hextraService";
import * as nominaService from "./nominaService";
import { toast } from "react-toastify";

function NominaForm() {
  interface Nominas {
    nombre: string;
    cargo: string;
    salariobase: number;
    diasTrabajados: number;
    basicototal: number;
    auxtransporte: number;
    horasextras: number;
    totaldevengado: number;
    salud: number;
    pension: number;
    parafiscales: number;
    cargas: number;
    seguridad: number;
    fsp: number;
    totaldeducido: number;
    netopagar: number;
    fechaNomina: Date;
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
  const token = localStorage.getItem("loggedUser");
  const [hextras, setHExtras] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(initialStateSettings);
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [nomina, setNomina] = useState<Nominas[]>([]);
  const [cargando, setCargando] = useState(true);
  const [vacio, setVacio] = useState(true);
  const [loading, setLoading] = useState(true);
  let valortotal = 0;
  const CargarEmpleado = async () => {
    const res = await empleadoService.getEmpleados();
    setEmpleados(res.data);
  };
  const CargarHorasExtras = async () => {
    const res = await hextraService.getHExtras();
    setHExtras(res.data);
  };
  const LoadNominas = async () => {
    const res = await nominaService.getNominas();
    if (res.data[0]) {
      setVacio(true);
    } else {
      setVacio(false);
    }
  };
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
  const Liquidar = async () => {
    nomina.forEach(async (element, index) => {
      await nominaService.createNomina(element, `${token}`);
    });
    toast.success("liquidacion completada");
    setTimeout(() => {
      window.location.href = "/home";
    }, 2500);
  };
  const CargarNomina = async () => {
    let Nnomina: any = [];
    empleados.forEach(async (element, index: number) => {
      const axt: any = await auxtrans(element.salario);
      const date =
        -Math.ceil(
          (new Date(element.fechaEntrada).getTime() -
            new Date("2021-05-31").getTime()) /
            86400000
        ) + 1;
      const dias = await workingDays(date);
      const btotal = (element.salario * dias) /
      new Date(new Date().getFullYear()).getDate();
      const auxtransp = (axt * dias) / new Date(new Date().getFullYear()).getDate();
      const horasex = await HorasExtras(element._id);
      const tdevengado = auxtransp + btotal + horasex;
      const sal = (element.salario * settings.saludEmpleado) / 100;
      const pen = (element.salario * settings.pensionEmpleado) / 100;
      const fonsolpen = await fondosp(element.salario);
      const tdeducido = sal + pen + fonsolpen;
      const parafiscales = Math.ceil(
        element.salario *
          (settings.icbf / 100 + settings.sena / 100 + settings.ccf / 100)
      );
      const seguridad = Math.ceil(
        (element.salario *
          (settings.saludEmpleado +
            settings.saludEmpresa +
            settings.pensionEmpleado +
            settings.pensionEmpresa)) /
          100
      );
      const cargas = Math.ceil(
        (element.salario *
          (settings.cesantias +
            settings.primaServicios +
            settings.vacaciones)) /
          100
      );
      
      

      const array = {
        nombre: element.nombre + " " + element.apellidos,
        cargo: element.cargo,
        salariobase: element.salario,
        diasTrabajados: dias,
        basicototal: btotal,
        auxtransporte: auxtransp,
        horasextras: horasex,
        totaldevengado: tdevengado,
        salud: sal,
        pension: pen,
        parafiscales: parafiscales,
        seguridad: seguridad,
        cargas: cargas,
        fsp: fonsolpen,
        totaldeducido: tdeducido,
        netopagar: tdevengado - tdeducido,
        fechaNomina: new Date("2021-05-31"),
      };
      Nnomina[index] = array;
    });

    setNomina(Nnomina);
    if (Nnomina) {
      setLoading(false);
    }
  };
  async function auxtrans(props: number) {
    if (props <= settings.smmlv * 2) {
      return settings.auxTransporte;
    } else {
      return 0;
    }
  }
  async function fondosp(props: number) {
    if (props >= settings.smmlv * 4) {
      return props * 0.01;
    } else {
      return 0;
    }
  }
  async function workingDays(props: number) {
    if (props >= new Date(new Date().getFullYear()).getDate()) {
      return new Date(new Date().getFullYear()).getDate();
    } else {
      return props;
    }
  }
  async function HorasExtras(props: any) {
    let valor = 0;
    hextras.forEach((element) => {
      if (props == element.idEmpleado) {
        valor = element.valor + valor;
      }
    });
    return valor;
  }
  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const fecha = new Date();
  useEffect(() => {
    loadSettings();
    LoadNominas();
    CargarHorasExtras();
    CargarEmpleado();
  }, []);
  useEffect(() => {
    CargarNomina();
  }, [empleados, hextras, settings]);
  useEffect(() => {
    setTimeout(function () {
      setCargando(false);
    }, 2500);
  }, []);
  return (
    <>
      {vacio ? (
        <div style={{ padding: "5%" }}>
          <div style={{ textAlign: "center", marginBottom: 20, height: window.innerHeight-350 }}>
            <h4>
              Liquidar Nomina 01 - 31 de {moment(fecha).format("MMMM")}{" "}
              {fecha.getFullYear()}{" "}
            </h4>
            <h4>Ya se realizo la liquidacion de la nomina</h4>
          </div>
          
        </div>
      ) : (
        <>
          <div style={{ padding: "5%" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <h4>
                Liquidar Nomina 01 - 31 de {moment(fecha).format("MMMM")}{" "}
                {fecha.getFullYear()}{" "}
              </h4>
            </div>

            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th className="table-info" scope="col">
                      #
                    </th>
                    <th className="table-info" scope="col">
                      Nombre
                    </th>
                    <th className="table-info" scope="col">
                      Cargo
                    </th>
                    <th className="table-success" scope="col">
                      Sueldo basico
                    </th>
                    <th className="table-success" scope="col">
                      Dias trabajados
                    </th>
                    <th className="table-success" scope="col">
                      Basico total
                    </th>
                    <th className="table-success" scope="col">
                      Aux transporte
                    </th>
                    <th className="table-success" scope="col">
                      Horas extras
                    </th>
                    <th className="table-success" scope="col">
                      Total devengado
                    </th>
                    <th className="table-danger" scope="col">
                      Salud
                    </th>
                    <th className="table-danger" scope="col">
                      Pensión
                    </th>
                    <th className="table-danger" scope="col">
                      FSP
                    </th>
                    <th className="table-danger" scope="col">
                      Total deducido
                    </th>
                    <th className="table-primary" scope="col">
                      Neto pagar
                    </th>
                  </tr>
                </thead>

                {!cargando ? (
                  <>
                    {nomina.map((element: any, index: number) => {
                      return (
                        <tbody key={index}>
                          <tr>
                            <th key={index} scope="row">
                              {index + 1}
                            </th>
                            <td>{element.nombre}</td>
                            <td>{element.cargo}</td>
                            <td>{formatterPeso.format(element.salariobase)}</td>
                            <td>{element.diasTrabajados}</td>
                            <td>{formatterPeso.format(element.basicototal)}</td>
                            <td>
                              {formatterPeso.format(element.auxtransporte)}
                            </td>
                            <td>{formatterPeso.format(element.horasextras)}</td>
                            <td>
                              {formatterPeso.format(element.totaldevengado)}
                            </td>
                            <td>{formatterPeso.format(element.salud)}</td>
                            <td>{formatterPeso.format(element.pension)}</td>
                            <td>{formatterPeso.format(element.fsp)}</td>
                            <td>
                              {formatterPeso.format(element.totaldeducido)}
                            </td>
                            <td>{formatterPeso.format(element.netopagar)}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </>
                ) : (
                  <tbody>
                    <tr className="text-success" role="status">
                      <td className="text-success">Liquidando Nomina...</td>
                      <td className="spinner-border text-success"></td>
                      <td className="text-success"></td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            <h6>
              <span className="badge bg-info"> </span> Información del empleado
            </h6>
            <h6>
              <span className="badge bg-success"> </span> Devengado
            </h6>
            <h6>
              <span className="badge bg-danger"> </span> Deducciones
            </h6>
          </div>
          <div className="container" style={{ paddingInline: "5%" }}>
            {nomina.forEach((element) => {
              valortotal = element.salariobase + valortotal;
            })}
            <div className="row">
              <div className="col">
                <h4>Aportes parafiscales: </h4>
                <h6>SENA: {Math.ceil((valortotal * settings.sena) / 100)}</h6>
                <h6>
                  Cajas de compensación familiar:{" "}
                  {Math.ceil((valortotal * settings.ccf) / 100)}{" "}
                </h6>
                <h6>ICBF: {Math.ceil((valortotal * settings.icbf) / 100)}</h6>
              </div>
              <div className="col">
                <h4>Cargas Prestacionales: </h4>
                <h6>
                  Cesantias:{" "}
                  {Math.ceil((valortotal * settings.cesantias) / 100)}
                </h6>
                <h6>
                  Prima de Servicios:{" "}
                  {Math.ceil((valortotal * settings.primaServicios) / 100)}{" "}
                </h6>
                <h6>
                  Vacaciones :{" "}
                  {Math.ceil((valortotal * settings.vacaciones) / 100)}
                </h6>
              </div>
              <div className="col">
                <h4>Seguridad Social: </h4>
                <h5>Salud:</h5>
                <h6>
                  Empresa:{" "}
                  {Math.ceil((valortotal * settings.saludEmpresa) / 100)}
                </h6>
                <h6>
                  Empleado:{" "}
                  {Math.ceil((valortotal * settings.saludEmpleado) / 100)}
                </h6>
                <h5>Pension:</h5>
                <h6>
                  Empresa:{" "}
                  {Math.ceil((valortotal * settings.pensionEmpresa) / 100)}
                </h6>
                <h6>
                  Empleado:{" "}
                  {Math.ceil((valortotal * settings.pensionEmpleado) / 100)}
                </h6>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto m-5">
            <button
              className="btn btn-primary"
              type="button"
              onClick={Liquidar}
            >
              Liquidar
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default NominaForm;
