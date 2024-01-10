import { useState } from "react";
import "./App.css";
import Todo from "./Todo";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [session, setSession] = useState(
    window.sessionStorage.getItem("todo_session")
  );

  function open(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tabName: string
  ) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].setAttribute("style", "display:none;");
    }
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName)?.setAttribute("style", "display:block;");
    event.currentTarget.className += " active";
  }

  if (session)
    return (
      <>
        <div className="card">
          <Todo setSession={setSession} />
        </div>
      </>
    );
  return (
    <>
      <div className="tab">
        <button
          className="tablinks active"
          onClick={(event) => open(event, "login")}
        >
          Giriş Yap
        </button>
        <button
          className="tablinks"
          onClick={(event) => open(event, "register")}
        >
          Kayıt Ol
        </button>
      </div>
      <div id="login" className="tabcontent" style={{ display: "block" }}>
        <Login setSession={setSession} />
      </div>

      <div id="register" className="tabcontent">
        <Register setSession={setSession} />
      </div>
    </>
  );
}

export default App;
