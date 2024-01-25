import { useCallback, useEffect, useState } from "react";
import copy from "clipboard-copy";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LISTA_ITENS = [
  { text: "Abridor de garrafas e latas", completed: true },
  { text: "Açucareiro", completed: true },
  { text: "Afiador de facas", completed: true },
  { text: "Forminha de gelo de silicone", completed: true },
  { text: "Assadeiras de tamanhos diferentes", completed: true },
  { text: "Avental", completed: false },
  { text: "Bacia (pequena, média)", completed: false },
  { text: "Balde e pinça de gelo", completed: false },
  { text: "Bandeja", completed: false },
  { text: "Batedor manual/Fouet", completed: false },
  { text: "Bowls (vasilhame)", completed: false },
  { text: "Colheres de silicone", completed: true },
  { text: "Copos", completed: true },
  { text: "Colheres e garfos", completed: false },
  { text: "Colheres de pau", completed: false },
  {
    text: "Colher tipo espátula, escumadeira e concha de feijão BEBEL E MARCO",
    completed: true,
  },
  { text: "Colher para sorvete", completed: true },
  { text: "Concha para molho", completed: false },
  { text: "Cortador de pizza", completed: false },
  { text: "Copos de medidas", completed: true },
  { text: "Cuscuzeira", completed: false },
  { text: "Descanso de panelas", completed: false },
  { text: "Descanso de colher", completed: false },
  { text: "Desc. de legumes", completed: true },
  { text: "Desentupidor de pia", completed: false },
  { text: "Espremedor de frutas", completed: false },
  { text: "Batedor de alho", completed: true },
  { text: "Escorredor de pratos", completed: true },
  { text: "Esc. de macarrão", completed: true },
  { text: "Espátula", completed: false },
  { text: "Espremedor de limão", completed: false },
  { text: "Ferro de passar roupa", completed: true },
  { text: "Forminhas para gelo", completed: false },
  { text: "Forma para pizza", completed: false },
  { text: "Formas de pudim", completed: true },
  { text: "Faqueiro completo", completed: false },
  { text: "Frigideiras", completed: true },
  { text: "Galheteiro (porta sal, azeite e pimenta)", completed: false },
  { text: "Garrafa térmica", completed: true },
  { text: "Jarra para água suco", completed: true },
  { text: "Jogo americano", completed: false },
  { text: "Luva térmica", completed: false },
  { text: "Leiteira", completed: true },
  { text: "Liquidificador", completed: true },
  { text: "Lixeira para pia", completed: true },
  { text: "Panelas", completed: false },
  { text: "Paliteiro", completed: false },
  { text: "Panos de prato", completed: true },
  { text: "Pegador de massa", completed: true },
  { text: "Pegador de salada", completed: true },
  { text: "Petisqueira", completed: true },
  { text: "Pirex", completed: true },
  { text: "Porta papel toalha", completed: false },
  { text: "Porta tempero", completed: false },
  { text: "Potes plásticos", completed: false },
  { text: "Potes de vidro", completed: true },
  { text: "Pratos", completed: true },
  { text: "Puxa saco", completed: false },
  { text: "Ralador", completed: false },
  { text: "Relógio de parede", completed: false },
  { text: "Rodo para pia", completed: false },
  { text: "Rolo de abrir massa", completed: false },
  { text: "Saca-rolhas", completed: false },
  { text: "Saladeira", completed: false },
  { text: "Saleiro", completed: false },
  { text: "Suporte de detergente e esponja", completed: false },
  { text: "Suporte de filtro de café", completed: false },
  { text: "Tábua de carne", completed: true },
  { text: "Tábua de passar roupa", completed: false },
  { text: "Taças de vinho", completed: false },
  { text: "Sanduicheira", completed: true },
  { text: "Tesoura de cozinha", completed: true },
  { text: "Vassoura, rodo e pá", completed: false },
  { text: "Tapetes", completed: false },
  { text: "Jogo de toalhas", completed: false },
  { text: "Cesto de roupa", completed: false },
  { text: "Jogo de cama (tamanho queen)", completed: false },
  { text: "Fruteira", completed: true },
  { text: "Toalhas de mesa", completed: false },
  { text: "Mini processador", completed: false },
  { text: "Toalhas de banho", completed: false },
  { text: "Cobertor (manta)", completed: false },
  { text: "Jogo de sobremesa", completed: true },
  { text: "Cesto de roupas", completed: false },
  {
    text: "Umidificador (Bárbara é viciada num umidificador e o dela quebrou kkk)",
    completed: true,
  },
  { text: "Varal retrátil", completed: false },
  { text: "Cortina", completed: false },
  { text: "Edredom", completed: true },
  { text: "Xícaras de chá", completed: false },
];

interface Todo {
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    // Carregar tarefas salvas do localStorage quando o componente for montado
    const storedTodos = JSON.parse(
      localStorage.getItem("todos") || JSON.stringify(LISTA_ITENS)
    ) as Todo[];
    console.log("storedTodos: ", storedTodos);
    setTodos(storedTodos);
  }, []);

  // useEffect(() => {
  //   // Salvar tarefas no localStorage sempre que a lista de tarefas for atualizada
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  const updateTodos = useCallback(() => {
    // Salvar tarefas no localStorage sempre que a lista de tarefas for atualizada
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
    updateTodos();
  };

  const toggleTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    updateTodos();
  };

  const deleteTodo = (index: number, todo: Todo) => {
    if (confirm(`Excluir o item abaixo?\n--------\n${todo.text}`) == true) {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
      updateTodos();
    }
  };

  const copyToClipboard = () => {
    const formattedList = todos
      .map(
        (todo) =>
          `${
            todo.completed
              ? `- ~${todo.text}${todo.completed ? "~ ✅" : ""}`
              : `- ${todo.text}`
          }`
      )
      .join("\n");

    copy("Lista Chá Bar:\n\n" + formattedList);

    toast.success("COPIADO!", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
    <>
      <div className="container">
        <div className="centralize">
          <h1>Lista Chá Bar B&G</h1>
          <div className="inputBox">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Nome item:"
            />
            <button onClick={addTodo}>Adicionar item</button>
          </div>

          <div>
            {todos
              .sort((a, b) => a.text.localeCompare(b.text))
              .map((todo, index) => (
                <div key={index}>
                  <label
                    htmlFor={`checkbox${index}`}
                    className={todo.completed ? "checked" : ""}
                  >
                    <input
                      type="checkbox"
                      id={`checkbox${index}`}
                      checked={todo.completed}
                      onChange={() => toggleTodo(index)}
                    />
                    - {todo.text} {todo.completed ? "✅" : ""}
                  </label>
                  <button
                    onClick={() => deleteTodo(index, todo)}
                    className="btnExcluir"
                  >
                    ❌
                  </button>
                </div>
              ))}
          </div>
          <div className="btnCopiarContainer">
            <button onClick={copyToClipboard} className="btnCopiar">
              Copiar Lista
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
