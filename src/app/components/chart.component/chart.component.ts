import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { StockData, StockDataArray} from '../../services/stock-data';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule,
            BaseChartDirective  
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'

})
export class ChartComponent implements OnInit{

  datosAcciones: StockDataArray[] = [];
  listaFechas: String[] = [];
  listaValores: number[] = [];

  ngOnInit(): void {

    this.cargarDatos();
    
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {

    labels: [],
    datasets: [
      {
        data: [],
        label: 'Precio de Cierre (USD)',
        fill: false,
        tension: 0.4,
        borderColor: '#2f4860'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      x: {
        ticks:{
          maxRotation: 90,
          minRotation: 90, 
          autoSkip: true,
          maxTicksLimit: 10
        }
      }
    }
  };
  
  public lineChartLegend = true; 

  constructor(
    private stockService: StockData, 
    private cdr: ChangeDetectorRef

  ){}

  cargarDatos(): void{
    this.stockService.readAcciones().subscribe({
      next: (datos)=>{
        console.log('Datos recibidos: ', datos);
        this.datosAcciones = datos;
        this.procesarDatos();
      },
      error:(error)=>{
        console.error('Error al cargar datos: ', error);
      }
    });
  }

  procesarDatos(): void{
    for(let i = 0; i < this.datosAcciones.length; i++){
      let counter = this.datosAcciones[i];
      this.listaFechas.push(counter.date);
      this.listaValores.push(counter.close);

    }

    this.lineChartData = {
    labels: this.listaFechas,
    datasets: [
      {
        data: this.listaValores,
        label: 'Precio de Cierre (USD)',
        fill: false,
        tension: 0.4,
        borderColor: '#2f4860',
        backgroundColor: '#2f4860'
      }
    ]
  };

    console.log('Fechas: ', this.listaFechas);
    console.log('Valores: ', this.listaValores);


  }

}
