import { createContext, useContext, useState } from "react";

export type Todo = {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string
}

interface TodoContextType {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoContext = createContext<TodoContextType>({
    todos: [],
    setTodos: () => { }
});
export const useTodos = () => useContext(TodoContext);

const TodosProvider = ({ children }: { children: React.ReactNode }) => {

    const [todos, setTodos] = useState<Todo[]>([]);

    return (
        <TodoContext.Provider
            value={{
                todos, setTodos
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}

export default TodosProvider;