import React, { useState, useEffect } from "react";
import "./SwitchButton.css"; // Importa un archivo CSS para estilizar el botón de interruptor

export function SwitchButton({ checked, onChange }) {
  const [isOn, setIsOn] = useState(checked); // Utiliza el estado local para rastrear si el interruptor está activado o desactivado

  useEffect(() => {
    setIsOn(checked); // Actualiza el estado local cuando cambia la propiedad "checked"
  }, [checked]);

  const handleSwitch = () => {
    const newIsOn = !isOn; // Cambia el estado local al valor opuesto (encendido/apagado)
    setIsOn(newIsOn);
    onChange(newIsOn); // Llama a la función "onChange" proporcionada con el nuevo valor del interruptor
  };

  return (
    <div>
      <label className="switch">
        {" "}
        {/* Define una etiqueta de interruptor */}
        <input type="checkbox" checked={isOn} onChange={handleSwitch} />{" "}
        {/* Utiliza una entrada de tipo "checkbox" con el estado local "isOn" y el controlador "handleSwitch" */}
        <span className="slider round"></span>{" "}
        {/* Crea un control deslizante redondeado */}
      </label>
    </div>
  );
}
