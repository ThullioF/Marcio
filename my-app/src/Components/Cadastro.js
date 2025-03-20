import { useState, useEffect } from "react";

function Cadastro() {
  const [tarefas, setTarefas] = useState([
    "Pagar a conta de luz",
    "Estudar programação",
    "Enviar a tarefa",
  ]);
  const [input, setInput] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [corSelecionada, setCorSelecionada] = useState("white");

  // Verifica se há nome salvo e pergunta se necessário
  useEffect(() => {
    let nomeSalvo = localStorage.getItem("@nomeUsuario");
    if (!nomeSalvo) {
      const nome = prompt("Qual é o seu nome?");
      if (nome) {
        nomeSalvo = nome;
        localStorage.setItem("@nomeUsuario", nomeSalvo);
      }
    }
    setNomeUsuario(nomeSalvo || "");
  }, []);

  // Carregar tarefas do localStorage
  useEffect(() => {
    const tarefasStorege = localStorage.getItem("@tarefa");
    if (tarefasStorege) {
      setTarefas(JSON.parse(tarefasStorege));
    }
  }, []);

  // Salvar tarefas no localStorage
  useEffect(() => {
    localStorage.setItem("@tarefa", JSON.stringify(tarefas));
  }, [tarefas]);

  function handleRegistro(e) {
    e.preventDefault();
    setTarefas([...tarefas, input]);
    setInput("");
  }

  return (
    <div style={{ backgroundColor: corSelecionada, minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ color: corSelecionada === "black" ? "white" : "black" }}>Cadastro de Tarefas</h1>
      {nomeUsuario && <h2>{nomeUsuario}, sua lista de tarefas</h2>}
      <div>
        <label>Escolha uma cor:</label>
        <br />
        <input
          type="radio"
          name="cor"
          value="white"
          checked={corSelecionada === "white"}
          onChange={() => setCorSelecionada("white")}
        /> Branco
        <input
          type="radio"
          name="cor"
          value="blue"
          checked={corSelecionada === "blue"}
          onChange={() => setCorSelecionada("blue")}
        /> Azul
        <input
          type="radio"
          name="cor"
          value="red"
          checked={corSelecionada === "red"}
          onChange={() => setCorSelecionada("red")}
        /> Vermelho
        <input
          type="radio"
          name="cor"
          value="green"
          checked={corSelecionada === "green"}
          onChange={() => setCorSelecionada("green")}
        /> Verde
        <input
          type="radio"
          name="cor"
          value="black"
          checked={corSelecionada === "black"}
          onChange={() => setCorSelecionada("black")}
        /> Preto
      </div>
      <form onSubmit={handleRegistro}>
        <label>Nome da tarefa: </label>
        <br />
        <input
          placeholder="Digite uma tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <button type="submit">Registrar</button>
      </form>
      <br />
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>{tarefa}</li>
        ))}
      </ul>
    </div>
  );
}

export default Cadastro;
