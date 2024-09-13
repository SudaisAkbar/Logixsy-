import React, { useState, useEffect } from 'react';
import { ToDoForm } from './ToDoForm';
import { ToDo } from './ToDo';
import { EditToDoForm } from './EditToDoForm';
import { v4 as uuidv4 } from 'uuid';

export const ToDoWrappers = () => {
  
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editToDo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: false } : todo
      )
    );
  };

  return (
    <div className='TodoWrapper'>
      <h1>Get Things Done!</h1>
      <ToDoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditToDoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <ToDo
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editToDo={editToDo}
          />
        )
      )}
    </div>
  );
};
