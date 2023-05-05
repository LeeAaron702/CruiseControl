import { NavLink } from "react-router-dom";
import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useContext } from "react";
import useUser from "./useUser";
import "./Nav.css";

function Nav() {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const { logout } = useToken();

  // const closeOffcanvas = () => {
  //   document.getElementById("offcanvasNavbar").classList.remove("show");
  // };

  return (
    <nav id="nav" className="navbar fixed-top">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand navbar-brand-custom fw-bold"
          to={
            user === null || token === null
              ? "/"
              : user?.is_client
              ? "/clientlanding"
              : user?.is_technician
              ? "/technicianlanding"
              : "/"
          }
        >
          Cruise Control
        </NavLink>

        <div id="offheader" className="offcanvas-header  text-capitalize">
          {token && user ? <h5 className="offcanvas-title"></h5> : null}
          {user === null || token === null ? (
            <h1 className="offcanvas-title"></h1>
          ) : null}
        </div>
        <div id="offcanvas" className="offcanvas-body">
          <ul className="navbar-nav ">
            {token && user?.is_client === true ? (
              <>
                <li className="d-flex.mr-auto p-2">
                  <NavLink>
                    <button
                      className="btn fw-bolder navbar-logging"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </NavLink>
                </li>
              </>
            ) : null}
            {token && user?.is_technician ? (
              <>
                <li className="d-flex.mr-auto p-2">
                  <NavLink>
                    <button
                      className="btn fw-bolder navbar-logging"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </NavLink>
                </li>
              </>
            ) : null}
            {user === null || token === null ? (
              <>
                <li className="d-flex.mr-auto p-2">
                  <NavLink to="/clientsignup">
                    <button className="btn fw-bolder navbar-logging">
                      Client Signup
                    </button>
                  </NavLink>
                  <NavLink to="/Login">
                    <button className="btn fw-bolder navbar-logging">
                      Login
                    </button>
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
