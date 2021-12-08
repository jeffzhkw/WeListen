import { Link } from "react-router-dom";
function NotAuthed() {
  return (
    <>
      <div className="containerWrapper">
        <div>
          <h1>OOF, you cannot see the page becasue you are not logged in</h1>
          <h2>Click here to login</h2>
          <Link to="/" className="bigclass">
            Back to start page
          </Link>
        </div>
        <div className="errorImg">
          <img src="https://http.cat/403" alt="403" />
        </div>
      </div>
    </>
  );
}

export default NotAuthed;
