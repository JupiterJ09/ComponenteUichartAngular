import { Component, signal } from '@angular/core';
import { ChartComponent } from './components/chart.component/chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Graficas');
}
