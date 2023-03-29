import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheck,
  faCirclePlus,
  faPenToSquare,
  faEraser,
  faTrashCanArrowUp,
  faUserNinja,
  faFloppyDisk,
  faRotateLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const arrayObjects = [
  {
    id: 1,
    text: "Izpildīt matemātikas mājas darbus",
    completed: false,
    deleted: false,
    isEdit: false,
  },
  {
    id: 2,
    text: "Notīrīt hanteles",
    completed: false,
    deleted: false,
    isEdit: false,
  },
  {
    id: 3,
    text: "Sasaukt bezdelīgas",
    completed: false,
    deleted: false,
    isEdit: false,
  },
  {
    id: 4,
    text: "Uztaisīst ēst",
    completed: false,
    deleted: false,
    isEdit: false,
  },
];

export default function TodoViewComp() {
  const [todoList, setTodoList] = useState(arrayObjects);
  const [viewType, setViewType] = useState(0);
  const [editText, setEditText] = useState("");
  const [inputText, setInputText] = useState("");
  const [tempText, setTempText] = useState("");

  function RemoveAll() {
    setTodoList([]);
  }

  function RemoveDeleted() {
    let newTodoList = todoList.filter((todo) => todo.deleted === false);
    setTodoList(newTodoList);
  }

  function RemoveCompleted() {
    let newTodoList = todoList.filter((todo) => todo.completed === false);
    setTodoList(newTodoList);
  }

  function completeTodoItem(itemId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, completed: true };
      }
      return todo;
    });

    setTodoList(newTodoList);
  }

  function delteTodoItem(itemId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, deleted: true };
      }
      return todo;
    });

    setTodoList(newTodoList);
  }

  function restoreTodoItem(itemId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        if (editText === "") {
          return {
            ...todo,
            deleted: false,
            completed: false,
            isEdit: false,
          };
        }

        setEditText("");
        return {
          ...todo,
          deleted: false,
          completed: false,
          isEdit: false,
          text: tempText,
        };
      }
      return todo;
    });

    setTodoList(newTodoList);
  }

  function changeViewType(viewType) {
    setViewType(viewType);
  }

  function editTodoItem(itemId) {
    setEditText("");
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        setEditText(todo.text);
        setTempText(todo.text);
        return { ...todo, isEdit: true };
      } else {
        return { ...todo, isEdit: false };
      }
    });
    setTodoList(newTodoList);
  }

  function saveTodoItem(itemId) {
    if (editText.trim().length === 0) return;

    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, isEdit: false, text: editText };
      }
      return todo;
    });

    setTodoList(newTodoList);
    setEditText("");
  }

  function getNewId() {
    let maxId = 0;
    todoList.map((item) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });

    return maxId + 1;
  }

  function addTodoItem() {
    let todoId = getNewId();

    if (inputText.trim().length > 0) {
      let newTodoItem = {
        id: todoId,
        text: inputText,
        completed: false,
        deleted: false,
        isEdit: false,
      };

      const items = todoList;
      setTodoList([...items, newTodoItem]);
      setInputText("");
    }
  }

  let newList = [];
  if (viewType === 0) {
    newList = todoList;
  } else if (viewType === 1) {
    newList = todoList.filter((todo) => todo.deleted === true);
  } else if (viewType === 2) {
    newList = todoList.filter((todo) => todo.completed === true);
  } else if (viewType === 3) {
    newList = todoList.filter(
      (todo) => todo.completed === false && todo.deleted === false
    );
  }

  return (
    <div>
      <div>
        <div className="RowStyle">
          <button className="BtnStyle2" onClick={() => changeViewType(0)}>
            Attēlot visus
          </button>
          <button className="BtnStyle2" onClick={() => changeViewType(1)}>
            Attēlot dzēstos
          </button>
          <button className="BtnStyle2" onClick={() => changeViewType(2)}>
            Attēlot pabeigtos
          </button>
          <button className="BtnStyle2" onClick={() => changeViewType(3)}>
            Attēlot aktīvos
          </button>
        </div>
        <div className="RowInputStyle">
          <div className="RowInputStyle1st">
            <input
              className="InputText"
              type="text"
              placeholder="Pievienot darbiņu"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              className="ButtonStyle"
              onClick={addTodoItem}
              title="Pievienot ierakstu"
            >
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
          </div>
          <div className="RowInputStyle2nd">
            <button
              className="ButtonStyle"
              onClick={RemoveAll}
              title="Noņemt visus ierakstus"
            >
              <FontAwesomeIcon icon={faEraser} />
            </button>
            <button
              className="ButtonStyle"
              onClick={RemoveDeleted}
              title="Noņemt dzēstos ierakstus"
            >
              <FontAwesomeIcon icon={faUserNinja} />
            </button>
            <button
              className="ButtonStyle"
              onClick={RemoveCompleted}
              title="Noņemt pabeigtos ierakstus"
            >
              <FontAwesomeIcon icon={faTrashCanArrowUp} />
            </button>
          </div>
        </div>
      </div>
      <div className="RowStyle">
        {newList.map((item) => {
          let spanClassName = "TodoItemText";
          if (item.completed) spanClassName = "TodoItemTextCompleted";
          if (item.deleted) spanClassName = "TodoItemTextDeleted";

          return (
            <div key={item.id} className="TaskStyle">
              <div>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <div className="TaskStyleText">
                {item.isEdit === false && (
                  <span className={spanClassName}>{item.text}</span>
                )}
                {item.isEdit && (
                  <>
                    <input
                      type="text"
                      className="TaskStyleInput"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                    />
                  </>
                )}
              </div>
              <div>
                {!item.completed && !item.deleted && !item.isEdit && (
                  <>
                    <button
                      className="trashButton"
                      onClick={() => delteTodoItem(item.id)}
                      title="Izdzēst ierakstu"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="editButton"
                      onClick={() => editTodoItem(item.id)}
                      title="Labot ierakstu"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="completeButton"
                      onClick={() => completeTodoItem(item.id)}
                      title="Pabeigt ierakstu"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </>
                )}
                {item.isEdit && (
                  <>
                    <button
                      className="ButtonStyle"
                      title="Saglabāt"
                      onClick={() => saveTodoItem(item.id)}
                    >
                      <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                  </>
                )}
                {(item.completed || item.deleted || item.isEdit) && (
                  <button
                    className="ButtonStyle"
                    title="Atjaunot"
                    onClick={() => restoreTodoItem(item.id)}
                  >
                    <FontAwesomeIcon icon={faRotateLeft} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
