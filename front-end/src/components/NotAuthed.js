import { Link } from "react-router-dom";
function NotAuthed() {
  return (
    <div className="containerWrapper">
      <h1>OOF, you cannot see the page becasue you are not logged in</h1>
      <h2>Click here to login</h2>
      <Link to="/login"  className='bigclass'>Login</Link>
    </div>
  );
}

export default NotAuthed;
