import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // criar usuário
  const createUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !pass)
      return console.log("Preencha todos os campos");

    try {
      const response = await fetch("https://api-crud-users-2q03.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Erro ao criar usuário:", data.error);
        return;
      }

      // ✅ Atualiza o state instantaneamente
      setUsers((prevUsers) => [...prevUsers, data]);

      // Limpa os inputs
      setName("");
      setEmail("");
      setPass("");

      // Mostra o modal por 2 segundos
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    } catch (err) {
      console.log("Erro na requisição:", err);
    }
  };

  // buscar usuários
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://api-crud-users-2q03.onrender.com/users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log("Erro ao buscar usuários:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <header>
        <h2>Cadastro de Usuários</h2>
      </header>

      <section className="main">
        <form className="formInfosUsers" onSubmit={createUser}>
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
            type="password"
            placeholder="A sua senha:"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>

        <h3>Nossos Usuários</h3>
        <div className="list-users">
          {users.map((user) => (
            <div key={user.id} className="user">
              <div>
                <p>
                  O seu nome: <b>{user.name}</b>
                </p>
                <p>
                  O seu email: <b>{user.email}</b>
                </p>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal-user">
            <b>Usuário criado com sucesso!</b>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
