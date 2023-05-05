import { Link } from "react-router-dom";
import logo from "./logo-color.png";

function HeroPage() {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <h1 className="display-4">Cruise Control</h1>
          <p className="lead">
            Revolutionize your vehicle service business with an all-in-one,
            cutting-edge software solution designed specifically for the vehicle
            service industry.
          </p>
          <p>
            Empower your business to grow by automating tedious tasks,
            streamlining workflows, and enhancing customer satisfaction.
          </p>
          <Link className="btn btn-info btn-lg" to="clientsignup" role="button">
            Sign Up For Cruise Control
          </Link>
        </div>
        <div className="col-md-6">
          <img src={logo} alt="Cruise Control" className="img-fluid" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>Unlock the Full Potential of Your Business</h2>
          <p>
            Say goodbye to tedious office tasks and disjointed workflows. With
            Cruise Control, you can manage your entire operation effortlessly,
            right at your fingertips. Experience the future of vehicle service
            management:
          </p>
          <ul>
            <li>Streamlined client management</li>
            <li>
              Efficient technician management with complete service history
            </li>
            <li>
              Easy service creation, customization, and checklist handling
            </li>
            <li>Hassle-free appointment scheduling and management</li>
            <li>Swift appointment request approvals or denials</li>
            <li>Boost customer satisfaction with seamless inquiry handling</li>
          </ul>
        </div>
      </div>
      <Link
        className="btn btn-primary btn-sm"
        to="newappoitnment"
        role="button"
      >
        Make an appointment with a Business that uses Cruise Control
      </Link>
    </div>
  );
}

export default HeroPage;
