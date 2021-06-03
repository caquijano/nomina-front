import React, { useEffect, useState } from "react";
import * as settingsService from "../Settings/settingsService";
import Hextras from "./HextraForm";
function HorasExtras() {
  const [settings, setSettings] = useState(false);
  const loadSettings = async () => {
    const res = await settingsService.getSettings();
    if (res.data[0]) {
      setSettings(true);
    }
  };
  useEffect(() => {
    loadSettings();
  }, []);
  return (
    <>
      {settings ? (
        <Hextras />
      ) : (
        <h3>No has llenado aun la configuración inicial</h3>
      )}
    </>
  );
}

export default HorasExtras;
