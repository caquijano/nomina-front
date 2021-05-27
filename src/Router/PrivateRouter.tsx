import {Switch, Route, Redirect } from "react-router-dom";
/*import Home from "../components/Home/Home";
import { ActivoForm } from "../components/Activos/ActivoForm";
import ActivoList from "../components/Activos/ActivoList";
import UserList from "../components/Auth/UserList";
import UserView from "../components/Home/UserView";*/
import verifyToken from "../utils/verifyToken"
import SideBar from "../components/Navigation/SideBar";
import Navbar from "../components/Navigation/Navbar";
import Footer from "../components/Navigation/Footer";
import ContextSidebar from "../context/ContextSidebar";
import React, { useContext } from "react";
import './router.css'
import Home from "../components/Home/Home";
import SettingsForm from "../components/Settings/SettingsForm";
import EscSalarialForm from "../components/EscalaSalarial/EscSalarialForm";
import EmpleadosForm from "../components/Empleados/EmpleadosForm";
import EmpleadosList from "../components/Empleados/EmpleadosList";
import Nomina from "../components/Nomina/NominaForm";
import HextraForm from "../components/HExtras/HextraForm";
import CuentasList from "../components/Cuentas/CuentasList";
import LiquidacionForm from "../components/Liquidacion/LiquidacionForm";

function PrivateRouter(){
 
  const {position} = useContext<any>(ContextSidebar)

  verifyToken();

    return (
        <>
        
          <Navbar />
          <SideBar/>
          <div className={position ? "PrivateRouter":"PrivateRouter active"} style={{float:"right"}}>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/settingsform" component={SettingsForm} />
            <Route exact path="/escalasalarial" component={EscSalarialForm} />
            <Route exact path="/colaboradoreslist" component={EmpleadosList}/>
            <Route exact path="/colaboradores" component={EmpleadosForm} />
            <Route exact path="/nomina" component={Nomina} />
            <Route exact path="/novedades" component={HextraForm} />
            <Route exact path="/cuentas" component={CuentasList} />
            <Route exact path="/liquidacion" component={LiquidacionForm} />
              <Redirect from="/**" to="/" />
            </Switch>
          </div>
          <Footer/>
        </>
    )
}

export default PrivateRouter
