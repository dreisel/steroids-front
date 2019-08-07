import React, {useContext, useState} from 'react';
import '../../components/App/App.css';
import {TodoContext, ITodosContext} from "../../context/TodosContext";

const Todos: React.FC<{}> = () => {
    const { todos, isLoading, addTodo, completeTodo, deleteTodo} = useContext<ITodosContext>(TodoContext);
    const [name, setName] = useState<string>('');

    async function onAddClick() {
        await addTodo(name);
        setName('');
    }

    return (
        <div>
            <h1>My Todo List</h1>
            {isLoading && <h3>Loading</h3>}
            <div>
                <input value={name} onChange={(e) => !isLoading && setName(e.target.value)} placeholder={'Add Todo'}/>
                <button onClick={onAddClick} disabled={isLoading}>Add</button>
            </div>
            {todos.map(({ id, name, completed }) => (
                <div key={id}>
                    <h3>{name}</h3>
                    <p>{completed ? 'Completed' : 'Not Completed'}</p>
                    <div><button value={id} onClick={() => deleteTodo(id)}>Delete</button></div>
                    <div><button value={id} onClick={() => completeTodo(id)}>Mark Completed</button></div>
                </div>
            ))}
        </div>
    );
};

export default Todos;
