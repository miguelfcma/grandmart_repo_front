import { useState } from "react";
import { useUsuarios } from "../UsuariosContext/UsuarioProvider";
import "./RecoverPassForm.css";
import { Link, useNavigate } from "react-router-dom";
import nodemailer from "nodemailer";

export function RecoverPassForm() {

    const { usuarios } = useUsuarios();
    const [usuarioLogin, setUsuarioLogin] = useState({ email: ""});
    const navigate = useNavigate();

    /* Funcion que recibe email y busca la contraseña del usuario */
    const enviarCorreo = async (destinatario, password) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cgbo192927@upemor.edu.mx',
                pass: 'CGBO192927.'
            }
        });
        
        let info = await transporter.sendMail({
            from: 'cgbo192927@upemor.edu.mx',
            to: destinatario,
            subject: 'Recuperación de contraseña',
            text: `Tu contraseña es: ${password}`
        });

        console.log("Mensaje enviado: %s", info.messageId);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const usuario = usuarios.find(user => user.email === usuarioLogin.email);

        if (usuario) {
            await enviarCorreo(usuario.email, usuario.password);
            alert("Te hemos enviado tu contraseña por correo electrónico!");
            navigate("/");
        } else {
            alert("El correo electrónico introducido no corresponde a ningún usuario registrado.");
        }
    }

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <a href="/">
                        <img alt="e-commerce" src="../src/components/HomePageComponents/logo.png" />
                    </a>
                </div>
            </nav>
            <div className="login-form-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Recuperar contraseña</h2>
                    <br></br>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="email">Favor de introducir tu correo electrónico de tu perfil que deseas recuperar y nosotros te enviaremos tu contraseña.</label>
                        <br></br><br></br>
                        <label htmlFor="email">Correo electrónico: </label>
                        <input
                            type="email"
                            id="email"
                            value={usuarioLogin.email}
                            onChange={(event) =>
                                setUsuarioLogin({
                                    ...usuarioLogin,
                                    email: event.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <br></br>

                    <button type="submit" className="btn-login">
                        Enviar
                    </button>

                    <br></br>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <button className="back-button" type="button">
                        <span>Atrás</span>
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}
