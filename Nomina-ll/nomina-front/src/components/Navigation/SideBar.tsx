import "./navigation.css";
import { SideBarData } from "./SideBarData";
import userJson from "../../utils/userJson";
import { useContext} from "react";
import { IoArrowBack } from "react-icons/io5";
import ContextSidebar from "../../context/ContextSidebar";
import Avatar from '../../images/Captura.jpg'

function SideBar() {
  const array: any = userJson();
  const name = array[1] + " " + array[2];
  const {position, setPosition} = useContext<any>(ContextSidebar)
  function handleClose() {
    setPosition(!position);
  }
  return (
    <>
      <div className={position ? "Sidebar active" : "Sidebar"}>
        <button type="button" className="btn btn-link btn-lg" style={{marginLeft: "80%"}} onClick={handleClose}>
          <IoArrowBack/>
        </button>

        <div style={{ textAlign: "center", paddingBottom: "10%" }}>
          <img
            src={Avatar}
            style={{
              width: "50%",
              border: "1px solid black",
              borderRadius: "50%",
            }}
          />
          <h5 style={{ color: "#ecf0f1", paddingTop: 15 }}>{name}</h5>
        </div>
        <ul className="SidebarList">
          {SideBarData.map((val, key) => {
            return (
                <a href={val.link} key={key}>
                  <li className="rows ">
                    <div id="icon">{val.icon} </div>

                    <div id="title"> {val.title} </div>
                  </li>
                </a>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default SideBar;
