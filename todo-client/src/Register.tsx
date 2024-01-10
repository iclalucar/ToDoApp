import { useState } from "react";
import "./App.css";
import axios from "axios";

function Register({ setSession }: { setSession: (session: string) => void }) {
  const URL = "http://localhost:5285/api/User";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  function register() {
    setError("");
    if(!name || !surname){
      setError("İsim ve Soyisim boş bırakılamaz");
      return;
    }
    if(!email || !password){
      setError("Email ve şifre boş bırakılamaz")
    }
    axios
      .post(URL + "/Register", {
        name,
        surname,
        email,
        password,
      })
      .then(function ({ data }) {
        window.sessionStorage.setItem("todo_session", data);
        setSession(data);
      })
      .catch(function (error) {
        if (error?.response?.data) {
          setError(error?.response?.data);
          return;
        }
        setError(error.message);
      });
  }

  return (
    <>
      <div className="card">
        <table style={{ width: "100%", textAlign: "left" }}>
          <tbody>
            <tr>
              <td>
                <label>İsim</label>
              </td>
              <td>
                <input
                  style={{ width: "95%" }}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Soyisim</label>
              </td>
              <td>
                <input
                  style={{ width: "95%" }}
                  required
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>E-Posta</label>
              </td>
              <td>
                <input
                  style={{ width: "95%" }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Şifre</td>
              <td>
                <input
                  style={{ width: "95%" }}
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p />
        <button style={{ margin: "3px" }} onClick={register}>
          Kayıt Ol
        </button>
      </div>
      {error && (
        <div style={{ maxWidth: "300px" }}>
          <label style={{ color: "red" }}>Hata: {error}</label>
        </div>
      )}
    </>
  );
}

export default Register;
