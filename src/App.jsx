import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [users, setUsers] = useState([]);

  const getDatasUser = (e) => {
    e.preventDefault();
    const nameUser = name;
    const emailUser = email;
    const ageUser = age;

    const newUser = {
      name: nameUser,
      email: emailUser,
      age: ageUser,
    };

    setUsers([...users, newUser]);
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setName("");
    setEmail("");
    setAge("");
  };

  const removeUser = (index) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // remove 1 item a partir do índice
    users.splice(index, 1);

    // atualiza o localStorage com o novo array
    localStorage.setItem("users", JSON.stringify(users));

    // opcional: atualizar o estado do React também
    setUsers(users);
  };

  return (
    <div>
      <header>
        <h2>cadastro de usuários </h2>
      </header>

      <section className="main">
        <form className="formInfosUsers" onSubmit={getDatasUser}>
          <input
            type="text"
            placeholder="O seu nome:"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="O seu email:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="A sua idade:"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>

        <h3>Nossos Usuários</h3>
        <div className="list-users">
          {users.map((user, index) => (
            <div key={index} className="user">
              <div>
                <p>
                  O seu nome: <b>{user.name}</b>
                </p>
                <p>
                  O seu email: <b>{user.email}</b>
                </p>
                <p>
                  A sua idade: <b>{user.age}</b>
                </p>
              </div>
              <button onClick={() => removeUser(index)}>X</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;