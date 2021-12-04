import { Link } from "react-router-dom";
function NotFound() {
  return (
    <>
      <h1>OOF, the page you request is not found</h1>
      <h2>Click here to go back home</h2>
      <Link to="/home">To Home</Link>
    </>
  );
}

export default NotFound;
