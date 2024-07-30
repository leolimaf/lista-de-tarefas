import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Tarefa } from '../../../Tarefa';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskItemComponent, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tarefas: Tarefa[] = [];
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((dado) => {
      this.tarefas = dado;
    });
  }
  deleteTask(tarefa: Tarefa) {
    this.taskService
      .deleteTak(tarefa)
      .subscribe(
        () => (this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id))
      );
  }
  toggleConcluido(tarefa: Tarefa) {
    tarefa.concluido = !tarefa.concluido;
    this.taskService.updateTask(tarefa).subscribe();
  }
  addTask(tarefa: Tarefa) {
    this.taskService.addTask(tarefa).subscribe(() => {
      this.tarefas.push(tarefa);
    });
  }
}
