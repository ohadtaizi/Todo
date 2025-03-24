import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
    // Makes this service globally available (singleton instance)

})
export class TodoService {
  private todos: Todo[] = [
    // { id: 1, title: 'Learn Angular', description: 'Study Angular basics', completed: false },
    // { id: 2, title: 'Write Code', description: 'Practice coding', completed: true }
  ];

  getTodos(): Todo[] {
    return this.todos;
      // Returns the current list of todos
  }

  addTodo(title: string, description: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    this.todos.push(newTodo);
  }

  toggleTodo(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }

  getTodoById(id: number): Todo | undefined {
    return this.todos.find(t => t.id === id);
      // Searches for and returns a todo with the matching id
    // Returns undefined if not found
  }
}
