"use client"

import { useState, useEffect } from 'react';


export default function Home() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: inputText, completed: false },
      ]);
      setInputText("");
    }
  };

  const toggleTodo = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (index) => {
    setTodos((prevTodos) =>
      prevTodos.filter((_, i) => i !== index)
    );
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className='flex flex-col items-center gap-y-8'>
        <div className='font-black text-transparent bg-gradient-to-r from-[#213555] to-[#4F709C] bg-clip-text text-8xl'>Todo App</div>
        <form id="form" className='max-w-full w-96' onSubmit={addTodo}>
          <input
            type="text"
            id="input"
            placeholder="Enter your todo"
            autocomplete="off"
            className='w-full p-2 text-2xl placeholder-gray-500 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#4F709C]'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className='mt-6'>
            {todos.length > 0 ? (
              <>
                <h1 className='mb-2 text-lg font-bold'>Todo List:</h1>
                <ul class="p-0 list-none grid gap-y-1 max-h-[28rem] overflow-auto">
                  {todos.map((todo, index) => (
                    <li
                      key={index}
                      className={`${todo.completed ? " line-through text-teal-500" : "text-[#213555"}  cursor-pointer text-2xl px-8 py-4 rounded-md bg-white`}
                      onClick={() => toggleTodo(index)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        removeTodo(index);
                      }}
                    >
                      {todo.text}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className='text-2xl font-bold text-center'>No todos yet.</p>
            )}
          </div>
        </form>
      </div>
      <div className='mt-12 text-center text-[#213555] text-xl'>
        <p>Left click to <span className='text-teal-500 line-through'>toggle</span> complete.</p>
        <p>Right click to <span className='text-rose-400'>delete</span> the todo.</p>
      </div>
    </main>
  )
}
