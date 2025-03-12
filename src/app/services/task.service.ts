import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category, Status } from '../models/enums';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSubject = new BehaviorSubject<Task[]>([
    { id: 1, name: 'Buying groceries', status: Status.done, deadline: new Date(), category: Category.personal },
    { id: 2, name: 'Debugging angular project', status: Status.inDevelopment, deadline: new Date(), category: Category.work },
    { id: 3, name: 'Cleaning kitchen', status: Status.toDo, deadline: new Date(), category: Category.personal },
    { id: 4, name: 'Sorting groceries', status: Status.done, deadline: new Date(), category: Category.personal },
    { id: 5, name: 'Adding update function', status: Status.toDo, deadline: new Date(), category: Category.work },
    { id: 6, name: 'Deleting comments', status: Status.inDevelopment, deadline: new Date(), category: Category.work },
  ]);

  tasks$ = this.tasksSubject.asObservable();

  constructor() { }

  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  addTask(task: Task): void {
    const tasks = this.tasksSubject.getValue();
    tasks.push(task);
    this.tasksSubject.next(tasks);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.tasksSubject.getValue();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      this.tasksSubject.next(tasks);
    }
  }

  deleteTask(task: Task): void {
    const tasks = this.tasksSubject.getValue();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.tasksSubject.next(tasks);
    }
  }

  filterTasks(category: Category[], status: Status[]): Task[] {
    return this.tasksSubject.getValue().filter(task =>
      (category.length === 0 || category.includes(task.category)) &&
      (status.length === 0 || status.includes(task.status))
    );
  }

}
