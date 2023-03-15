import React, { useEffect, useState } from 'react';
import './DashAdmin.css';
import {Sidebar} from '../../components/DashAdmin/Sidebar';
import {Header} from '../../components/DashAdmin/Header';
import {Content} from '../../components/DashAdmin/Content';
import { useNavigate } from "react-router-dom";

export function DashAdmin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Simular la validación del token con un timeout de 1 segundo
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
<<<<<<< Updated upstream
      setIsLoading(false);
  }, [navigate]);
<<<<<<< Updated upstream
//*setIsLoading(false);
=======
=======
  }, [navigate]);
>>>>>>> Stashed changes

>>>>>>> Stashed changes
  return (
    <>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <div className="dashboard-container">
          <Sidebar />
          <div className="dashboard-content">
            <Header />
            <Content />
          </div>
        </div>
      )}
    </>
  );
}
