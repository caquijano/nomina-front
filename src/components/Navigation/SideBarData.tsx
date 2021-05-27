import React from "react";
import {
  IoCash,
  IoClipboardSharp,
  IoPeople,
  IoSettings,
  IoStatsChartOutline,
  IoWalletSharp,
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
    title: "Cuentas",
    icon: <IoWalletSharp />,
    link: "/cuentas",
  },
  {
    title: "Escala Salarial",
    icon: <IoStatsChartOutline />,
    link: "/escalasalarial",
  },
  {
    title: "Calcular Liquidación",
    icon: <IoCash />,
    link: "/liquidacion",
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
