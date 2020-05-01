import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage {

  tasks$ = new Observable<Task[]>();

  constructor(private navCtrl: NavController, private overlayService: OverlayService, private tasksService: TasksService) { }

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      this.tasks$ = this.tasksService.getAll();
      this.tasks$.pipe(take(1)).subscribe(() => loading.dismiss());
    } catch (error) {
      console.log("Task-list error: ", error.message);
    }

    // Implementação oficial
    // const loading = await this.overlayService.loading();
    // this.tasks$ = this.tasksService.getAll();
    // this.tasks$.pipe(take(1)).subscribe(tasks => loading.dismiss());
  }

  onUpdate(task: Task): void {
    this.navCtrl.navigateForward(['tasks', 'edit', task.id]);
  }

  async onDelete(task: Task): Promise<void> {
    await this.overlayService.alert({
      message: `Do you really want to delete the task "${task.title}"?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.tasksService.delete(task);
            await this.overlayService.toast({
              message: `Task "${task.title}" deleted!`
            })
          }
        },
        'No'
      ]
    });
  }

  async onDone(task: Task): Promise<void> {
    const taskToUpdate = { ...task, done: !task.done };
    await this.tasksService.update(taskToUpdate);
    await this.overlayService.toast({
      message: `Task "${task.title}" ${taskToUpdate.done ? 'completed' : 'updated'}!`
    })
  }
}
