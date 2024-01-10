import { useState } from "react";
import "./App.css";
import axios from "axios";

function Login({ setSession }: { setSession: (session: string) => void }) {
  const URL = "http://localhost:5285/api/User";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function login() {
    setError("");
    if (!password) {
      setError("Şifre boş olamaz");
      return;
    }
    if (!email) {
      setError("Email boş olamaz");
      return;
    }
    axios
      .post(URL + "/Login", {
        name: "",
        surname: "",
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p />
        <button style={{ margin: "3px" }} onClick={login}>
          Giriş Yap
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

export default Login;
