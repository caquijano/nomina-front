import React from "react";
import {
  IoCash,
  IoClipboardSharp,
  IoPeople,
  IoSettings,
  IoWatch,
} from "react-icons/io5";

export const SideBarData = [
  {
    title: "Colaboradores",
    icon: <IoPeople />,
    link: "/colaboradoreslist",
    rol: "admin",
  },
  {
    title: "Configuración",
    icon: <IoSettings />,
    link: "/settingsform",
  },
  {
    title: "Escala Salarial",
    icon: <IoCash />,
    link: "/escalasalarial",
  },
  {
    title: "Liquidar colaborador",
    icon: <IoCash />,
    link: "/",
  },
  {
    title: "Nomina",
    icon: <IoClipboardSharp />,
    link: "/nomina",
  },
  {
    title: "Novedades",
    icon: <IoWatch />,
    link: "/novedades",
  },
];
