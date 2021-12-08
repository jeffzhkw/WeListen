import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="containerWrapper">
      <div>
        <h1>OOF, the page you request is not found</h1>
        <h2>Click here to go back home</h2>
        <Link to="/" className="bigclass">
          Back to start page
        </Link>
      </div>
      <div className="errorImg">
        <img src="https://http.cat/404" alt="404" />
      </div>
    </div>
  );
}

export default NotFound;
