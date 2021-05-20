import jwt from "jsonwebtoken";
import "./navigation.css";
import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import ContextSidebar from "../../context/ContextSidebar";
import Logo from "../../images/logo.png";
//import userJson from '../../utils/userJson'
import { IoList } from "react-icons/io5";

function Navbar() {
  const loggedUserJson = window.localStorage.getItem("loggedUser") || null;
  const {position, setPosition} = useContext<any>(ContextSidebar)
  const user = JSON.parse(loggedUserJson || "");
  let decodeData, arrayUsuario, name: string, char;

  if (user) {
    decodeData = jwt.verify(user, "ikhodi");
    arrayUsuario = Object.values(decodeData);
    name = `${arrayUsuario[1]}`;
    char = name.charAt(0).toUpperCase();
  }

  //const array = userJson();
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
  };
  function openSidebar(){
    setPosition(!position)
  }

  return (
    <div
      className={position ? "Navbar" : "Navbar active"}
      style={{ float: "right" }}
    >
      <nav className="navbar navbar-expand-lg ">
        {!position ? (
          <button
            className="btn btn-link btn-lg"
            type="button"
            style={{
              margin: 0,
              paddingBlock: 0,
              marginRight: 15,
              border: "2px solid #18bc9c",
            }}
            onClick={openSidebar}
          >
            <IoList />
          </button>
        ) : (
          <></>
        )}
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img style={{ height: 45, margin: -10 }} src={Logo} />
          </a>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
            </ul>
            {arrayUsuario ? (
              <div className="row ">
                <div className="col"
                  style={{
                    height: 35,
                    width: 35,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0f7864",
                  }}
                >
                  <p style={{ fontSize: 20, color: "#fff" }}>
                    {char}
                  </p>
                </div>
                <div className="col">
                  <Dropdown>
                    
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      
                    {arrayUsuario[1]} {arrayUsuario[2]}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleLogout} href="/">
                        Cerrar sesión
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
