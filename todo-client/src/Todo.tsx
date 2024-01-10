import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import TodoItem from "./models/TodoItem";
import User from "./models/User";

function Todo({ setSession }: { setSession: (session: string) => void }) {
  const URL = "http://localhost:5285/api/TodoItems";
  const URL_USER = "http://localhost:5285/api/User";
  const [todoItem, setTodoItem] = useState("");
  const [todoItems, setTodoItems] = useState(new Array<TodoItem>());
  const [error, setError] = useState("");
  const [editTodoItem, setEditTodoItem] = useState<TodoItem>();
  const [user, setUser] = useState<User>();

  const token = window.sessionStorage.getItem("todo_session");

  useEffect(() => {
    loadTodoItems();
    loadUserInfo();
  }, []);

  function loadUserInfo() {
    setError("");
    axios
      .get(URL_USER, { headers: { Authorization: `Bearer ${token}` } })
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        if (error.status === 401 || error.response?.status === 401)
          clearSessionInfos();
        setError(error.message);
      });
  }

  function loadTodoItems() {
    setError("");
    axios
      .get(URL, { headers: { Authorization: `Bearer ${token}` } })
      .then(function (response) {
        setTodoItems(response.data);
      })
      .catch(function (error) {
        if (error.status === 401 || error.response?.status === 401)
          clearSessionInfos();
        setError(error.message);
      });
  }

  function insertTodoItem() {
    setError("");

    axios
      .post(
        URL,
        {
          name: todoItem,
          isComplete: false,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(function ({ data }) {
        const items = [...todoItems, data];
        setTodoItems(items);
        setTodoItem("");
      })
      .catch(function (error) {
        if (error.status === 401 || error.response?.status === 401)
          clearSessionInfos();
        setError(error.message);
      });
  }

  function deleteTodoItem(id: number) {
    setError("");

    axios
      .delete(URL + "/" + id, { headers: { Authorization: `Bearer ${token}` } })
      .then(function () {
        setTodoItems(todoItems.filter((x) => x.id !== id));
      })
      .catch(function (error) {
        if (error.status === 401 || error.response?.status === 401)
          clearSessionInfos();
        setError(error.message);
      });
  }

  function updateTodoItem(item: TodoItem) {
    setError("");
    axios
      .put(URL + "/" + item.id, item, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function () {
        setTodoItems(
          todoItems.map((x) => {
            if (x.id === item.id) x = item;
            return x;
          })
        );
      })
      .catch(function (error) {
        if (error.status === 401 || error.response?.status === 401)
          clearSessionInfos();
        setError(error.message);
      });
  }

  function clearSessionInfos() {
    window.sessionStorage.setItem("todo_session", "");
    setSession("");
  }

  return (
    <>
      <div className="card" style={{ textTransform: "uppercase" }}>
        <h3>{user?.name + " " + user?.surname + " - LİSTE"}</h3>
      </div>
      <div className="card">
        <input
          style={{ width: "500px" }}
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
        />
        <p />
        <button
          onClick={() => {
            if (editTodoItem) {
              editTodoItem.name = todoItem;
              updateTodoItem(editTodoItem);
              setTodoItem("");
              setEditTodoItem(undefined);
            } else {
              insertTodoItem();
            }
          }}
        >
          {editTodoItem ? "Güncelle" : "Ekle"}
        </button>
        <button style={{ margin: "3px" }} onClick={clearSessionInfos}>
          Çıkış Yap
        </button>
      </div>
      <div className="card">
        <table style={{ width: "500px" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>İsim</th>
              <th>Tamam</th>
              <th>Sil</th>
              <th>Düzenle</th>
            </tr>
          </thead>
          <tbody>
            {todoItems.map((x: TodoItem) => (
              <tr
                key={x.id}
                style={{
                  textDecoration: x.isComplete ? "line-through" : "auto",
                }}
              >
                <td style={{ width: "100%", textAlign: "left" }}>{x.name}</td>
                <td>
                  <button
                    onClick={() => {
                      x.isComplete = !x.isComplete;
                      updateTodoItem(x);
                    }}
                  >
                    <GiCheckMark />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteTodoItem(x.id);
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setTodoItem(x.name);
                      setEditTodoItem(x);
                    }}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && (
        <div>
          <label style={{ color: "red" }}>Hata: {error}</label>
        </div>
      )}
    </>
  );
}

export default Todo;
