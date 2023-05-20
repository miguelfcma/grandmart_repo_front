import { Link } from "react-router-dom";

export function HeaderAdmin() {
  return (
    <div className="header">
      <div className="header-container">
        <Link to="/dashAdmin">
          <img alt="e-commerce" src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379" />
          <br></br>
        </Link>
      </div>
    </div>
  );
}
