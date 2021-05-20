import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es";
import * as empleadoService from "../Empleados/empleadoService";
import * as settingsService from "../Settings/settingsService";
import * as hextraService from "../HExtras/hextraService";

function Nomina() {
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
  const [hextras, setHExtras] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(initialStateSettings);
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [nomina, setNomina] = useState<Nominas[]>([]);
  const CargarEmpleado = async () => {
    const res = await empleadoService.getEmpleados();
    setEmpleados(res.data);
  };
  const CargarHorasExtras = async () => {
    const res = await hextraService.getHExtras();
    setHExtras(res.data);
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
  const CargarNomina = async () => {
    let Nnomina: any = [];
    empleados.forEach(async (element, index: number) => {
      const axt: any = await auxtrans(element.salario);
      const tdevengado = (element.salario * 30) / 30 + axt + 0;
      const sal = (element.salario * settings.saludEmpleado) / 100;
      const pen = (element.salario * settings.pensionEmpleado) / 100;
      const fonsolpen = await fondosp(element.salario);
      const tdeducido = sal + pen + fonsolpen;
      const array = {
        nombre: element.nombre + element.apellidos,
        cargo: element.cargo,
        salariobase: element.salario,
        diasTrabajados: 30,
        basicototal: (element.salario * 30) / 30,
        auxtransporte: axt,
        horasextras: 0,
        totaldevengado: tdevengado,
        salud: sal,
        pension: pen,
        fsp: fonsolpen,
        totaldeducido: tdeducido,
        netopagar: tdevengado - tdeducido,
      };
      Nnomina[index] = array;
    });

    setNomina(Nnomina);
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
      return (props * 1) / 100;
    } else {
      return 0;
    }
  }
  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const fecha = new Date();
  useEffect(() => {
    loadSettings();
    CargarHorasExtras();
    CargarEmpleado();
  }, []);
  useEffect(() => {
    CargarNomina();
  }, [empleados]);
  return (
    <div style={{ padding: "5%" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h4>
          Liquidar Nomina {moment(fecha).format("MMMM")} {fecha.getFullYear()}{" "}
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
              <th className="table-danger" scope="col">
                Neto pagar
              </th>
            </tr>
          </thead>
          <tbody>
            {nomina.map((element: any, index: number) => {
              return (
                <tr key={index}>
                  <th key={index} scope="row">
                    {index + 1}
                  </th>
                  <td>{element.nombre}</td>
                  <td>{element.cargo}</td>
                  <td>{formatterPeso.format(element.salariobase)}</td>
                  <td>{element.diasTrabajados}</td>
                  <td>{formatterPeso.format(element.basicototal)}</td>
                  <td>{formatterPeso.format(element.auxtransporte)}</td>
                  <td>{formatterPeso.format(element.horasextras)}</td>
                  <td>{formatterPeso.format(element.totaldevengado)}</td>
                  <td>{formatterPeso.format(element.salud)}</td>
                  <td>{formatterPeso.format(element.pension)}</td>
                  <td>{formatterPeso.format(element.fsp)}</td>
                  <td>{formatterPeso.format(element.totaldeducido)}</td>
                  <td>{formatterPeso.format(element.netopagar)}</td>
                </tr>
              );
            })}
          </tbody>
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
  );
}

export default Nomina;
