import React, { useState, useEffect } from 'react';
import "./SwitchButton.css"
export function SwitchButton({ checked, onChange }){
  const [isOn, setIsOn] = useState(checked);

  useEffect(() => {
    setIsOn(checked);
  }, [checked]);

  const handleSwitch = () => {
    const newIsOn = !isOn;
    setIsOn(newIsOn);
    onChange(newIsOn);
  };

  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={handleSwitch} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};


