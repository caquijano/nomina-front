import React, { useEffect, useState } from "react";
import { Nomina } from "../Nomina/Nomina";
import * as nominaService from "../Nomina/nominaService";

function CuentasList() {
  const initialState = {
    nombre: "",
    cargo: "",
    salariobase: 0,
    diasTrabajados: 0,
    basicototal: 0,
    auxtransporte: 0,
    salario: 0,
    horasextras: 0,
    totaldevengado: 0,
    salud: 0,
    pension: 0,
    parafiscales: 0,
    sena: 0,
    icbf: 0,
    ccf: 0,
    cesantias: 0,
    vacaciones: 0,
    prima: 0,
    saludtotal: 0,
    pensiontotal: 0,
    fsp: 0,
    totaldeducido: 0,
    netopagar: 0,
    credito: 0,
    fechaNomina: new Date(),
  };
  const [nomina, setNomina] = useState<Nomina[]>([]);
  const [cuentas, setCuentas] = useState(initialState);
  const LoadNominas = async () => {
    const res: any = await nominaService.getNominas();
    setNomina(res.data);
  };
  const LoadDatos = async () => {
    let salarios = 0;
    let parafiscales = 0;
    let sueldos = 0;
    let Hextras = 0;
    let auxTrans = 0;
    let cesantias = 0;
    let prima = 0;
    let vacaciones = 0;
    let eps = 0;
    let pension = 0;
    let sena = 0;
    let icbf = 0;
    let ccf = 0;
    let total = 0;
    let credito=0
    nomina.forEach((element) => {
      salarios = Math.ceil(element.totaldevengado + salarios);
      parafiscales = Math.ceil(element.parafiscales + parafiscales);
      sueldos = Math.ceil(element.basicototal + sueldos);
      Hextras = Math.ceil(element.horasextras + Hextras);
      auxTrans = Math.ceil(element.auxtransporte + auxTrans);
      cesantias = Math.ceil((element.cargas * 8.33) / 20.83 + cesantias);
      prima = Math.ceil((element.cargas * 8.33) / 20.83 + prima);
      vacaciones = Math.ceil((element.cargas * 4.17) / 20.83 + vacaciones);
      eps = Math.ceil((element.seguridad * 12.5) / 28.5 + eps);
      pension = Math.ceil((element.seguridad * 16) / 28.5 + pension);
      sena = Math.ceil((element.parafiscales * 2) / 9 + sena);
      icbf = Math.ceil((element.parafiscales * 3) / 9 + icbf);
      ccf = Math.ceil((element.parafiscales * 4) / 9 + ccf);
    });
    credito = salarios + eps + parafiscales + pension + cesantias + vacaciones + prima;
    total =
      sueldos +
      Hextras +
      auxTrans +
      cesantias +
      prima +
      vacaciones +
      eps +
      pension +
      sena +
      icbf +
      ccf;
    console.log(sueldos);
    setCuentas({
      ...cuentas,
      salario: salarios,
      parafiscales: parafiscales,
      basicototal: sueldos,
      horasextras: Hextras,
      auxtransporte: auxTrans,
      cesantias: cesantias,
      prima: prima,
      vacaciones: vacaciones,
      salud: eps,
      pension: pension,
      sena: sena,
      icbf: icbf,
      ccf: ccf,
      netopagar: total,
        credito: credito
    });
  };
  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0, 
  });
  useEffect(() => {
    LoadNominas();
  }, []);
  useEffect(() => {
    LoadDatos();
  }, [nomina]);
  return (
    <div style={{ padding: "5%" }}>
      <div style={{ textAlign: "center" }}>
        <h4>Contabilidad </h4>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Nombre de la cuenta</th>
            <th scope="col">Debito</th>
            <th scope="col">Credito</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>250505	</td>
            <td>Salarios por pagar</td>
            <td></td>
            <td>{formatterPeso.format(cuentas.salario)}</td>
          </tr>
          <tr>
            <td>237005</td>
            <td>Aportes E.P.S</td>
            <td></td>
            <td>{formatterPeso.format(cuentas.salud)}</td>
          </tr>
          <tr>
            <td>237010</td>
            <td>Aportes parafiscales</td>
            <td></td>
            <td>{formatterPeso.format(cuentas.parafiscales)}</td>
          </tr>
          <tr>
            <td>238030</td>
            <td>Fondos de pensión</td>
            <td></td>
            <td>{formatterPeso.format(cuentas.pension)}</td>
          </tr>
          <tr>
            <td>261005</td>
            <td>Cesantias</td>
            <td></td>
            <td>{formatterPeso.format(cuentas.cesantias)}</td>
          </tr>
          <tr>
            <td>261015</td>
            <td>Vacaciones</td>
            <td></td>
            <td>{formatterPeso.format(cuentas.vacaciones)}</td>
          </tr>
          <tr>
            <td>261020</td>
            <td>Prima de Servicios</td>
            <td></td>
            <td>{formatterPeso.format(cuentas.prima)}</td>
          </tr>
          <tr>
            <td>510506</td>
            <td>Sueldos</td>
            <td>{formatterPeso.format(cuentas.basicototal)}</td>
            <td></td>
          </tr>
          <tr>
            <td>510515</td>
            <td>Horas Extras</td>
            <td>{formatterPeso.format(cuentas.horasextras)}</td>
            <td></td>
          </tr>
          <tr>
            <td>510520</td>
            <td>Auxilio de transporte</td>
            <td>{formatterPeso.format(cuentas.auxtransporte)}</td>
            <td></td>
          </tr>
          <tr>
            <td>510533</td>
            <td>Cesantias</td>
            <td>{formatterPeso.format(cuentas.cesantias)}</td>
            <td></td>
          </tr>
          <tr>
            <td>510536</td>
            <td>Prima de Servicios</td>
            <td>{formatterPeso.format(cuentas.prima)}</td>
            <td></td>
          </tr>
          <tr>
            <td>510539</td>
            <td>Vacaciones</td>
            <td>{formatterPeso.format(cuentas.vacaciones)}</td>
            <td></td>
          </tr>
          <tr>
            <td>510569</td>
            <td>Aportes E.P.S</td>
            <td>{formatterPeso.format(cuentas.salud)}</td>
            <td></td>
          </tr>
          <tr>
            <td>510570</td>
            <td>Aportes fondo pensiones</td>
            <td>{formatterPeso.format(cuentas.pension)}</td>
            <td></td>
          </tr>
          <tr>
            <td>510572</td>
            <td>Aportes cajas de compensación</td>
            <td>{formatterPeso.format(cuentas.ccf)}</td>
            <td></td>
          </tr>
          <tr>
            <td>510575</td>
            <td>I.C.B.F</td>
            <td>{formatterPeso.format(cuentas.icbf)}</td>
            <td></td>
          </tr>
          <tr>
            <td>510578</td>
            <td>SENA</td>
            <td>{formatterPeso.format(cuentas.sena)}</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>Total</td>
            <td>{formatterPeso.format(cuentas.netopagar)}</td>
            <td>{formatterPeso.format(cuentas.credito)}</td>
          </tr>
          {/* {hextras.map((element: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{momento.tz(element.fechaNovedad, "Africa/Dakar").format("LL")}</td>
                  <td>{element.nombreEmpleado}</td>
                  <td>{element.hed}</td>
                  <td>{element.hen}</td>
                  <td>{element.valor}</td>
                </tr>
              );
            })} */}
        </tbody>
      </table>
    </div>
  );
}

export default CuentasList;
