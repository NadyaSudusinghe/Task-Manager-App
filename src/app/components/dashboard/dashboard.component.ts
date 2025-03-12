import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, ChangeDetectionStrategy, AfterViewInit, ViewChild, NgModule, Input, AfterViewChecked } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Task } from '../../models/task';
import { Status, Category } from '../../models/enums';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexChart, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexAxisChartSeries } from 'ng-apexcharts';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, FormsModule, ReactiveFormsModule, MatTableModule,
    MatPaginatorModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, NgApexchartsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {

  tasks: Task[] = [];

  public chartOptions: any = {
    chart: {
      type: 'bar',
      height: 350,
      // width: '100%',
    },
    title: {
      text: 'Tasks by Category and Status',
      align: 'center',
    },
    xaxis: {
      categories: ['To Do', 'In Development', 'Done'],
    },
    series: [
      {
        name: 'Personal',
        data: [0, 0, 0],
      },
      {
        name: 'Work',
        data: [0, 0, 0],
      },
    ],
  };

  public chartOptions2: any = {
    series: [0],
    chart: {
      type: "radialBar",
      height: 300,
      offsetY: -20
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            opacity: 0.31,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: "22px"
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
      }
    },
    tooltip: {
      enabled: true,
      shared: true, 
      intersect: false, 
      followCursor: true,
      custom: function () {
        return '<div class="tooltip-custom" style="font-size:12px; height:20px; width:80px; text-align:center;background-color: rgba(243, 232, 232, 0.7);display: flex;align-items:center;  justify-content: center;">To Do Tasks</div>';
      },
    },
    // labels: ["Average Results"]
  };

  public chartOptions3: any = {
    series: [0],
    chart: {
      type: "radialBar",
      height: 300,
      offsetY: -20
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            opacity: 0.31,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: "22px"
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
      }
    },
    annotations: {
      yaxis: [{
        y: 100,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396'
          },
          text: 'Work Tasks',
        }
      }]
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      followCursor: true,
      custom: function () {
        return '<div class="tooltip-custom" style="font-size:12px; height:20px; width:130px; text-align:center;background-color: rgba(243, 232, 232, 0.7);display: flex;align-items:center;  justify-content: center;">In Development Tasks</div>';
      },
    },
  };

  public chartOptions4: any = {
    series: [0],
    chart: {
      type: "radialBar",
      height: 300,
      offsetY: -20
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            opacity: 0.31,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: "22px"
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
      }
    },
    annotations: {
      yaxis: [{
        y: 100,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396'
          },
          text: 'Work Tasks',
        }
      }]
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      followCursor: true,
      custom: function () {
        return '<div class="tooltip-custom" style="font-size:12px; height:20px; width:70px; text-align:center;background-color: rgba(243, 232, 232, 0.7);display: flex;align-items:center;  justify-content: center;">Done Tasks</div>';
      },
    },
  };

  public chartOptions5: any = {
    series: [0, 0, 0],
    chart: {
      height: 390,
      type: "radialBar"
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000'
          },
          value: {
            show: true,
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000',
          offsetY: 10 
          }
        }
      }
    },
    colors: ["#0084ff", "#39539E", "#0077B5"],
    labels: ["Done", "In Development", "To Do"],
    legend: {
      show: true,
      floating: true,
      fontSize: "16px",
      position: "left",
      offsetX: 50,
      offsetY: 10,
      labels: {
        useSeriesColors: true
      },
      // formatter: function(seriesName, opts) {
      //   return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      // },
      itemMargin: {
        horizontal: 3
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }
    ]
  };


  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.prepareChartData();
    // });
  }

  ngAfterViewInit() {
    this.prepareChartData();
  }

  prepareChartData() {
    const categories = ['To Do', 'In Development', 'Done'];
    const personalTasks = [0, 0, 0];
    const workTasks = [0, 0, 0];
    let personalTasksRB = [];
    let workTasksRB = [];

    this.tasks.forEach((task) => {
      const statusIndex = categories.indexOf(task.status);
      if (task.category === Category.personal) {
        personalTasks[statusIndex]++;
      } else if (task.category === Category.work) {
        workTasks[statusIndex]++;
      }
    });

    personalTasksRB = this.tasks.filter((task) => task.category === Category.personal);
    workTasksRB = this.tasks.filter((task) => task.category === Category.work);

    const toDoTasks: any = this.tasks.filter((task) => task.status === Status.toDo);
    const inDevelopmentTasks: any = this.tasks.filter((task) => task.status === Status.inDevelopment);
    const doneTasks: any = this.tasks.filter((task) => task.status === Status.done);

    const toDoTasksPercent: any = this.calculatePercentage(toDoTasks.length);
    const inDevelopmentTasksPercent: any = this.calculatePercentage(inDevelopmentTasks.length);
    const doneTasksPercent: any = this.calculatePercentage(doneTasks.length);

    this.chartOptions.series = [
      {
        name: 'Personal',
        data: personalTasks,
      },
      {
        name: 'Work',
        data: workTasks,
      },
    ];

    this.chartOptions2.series = [toDoTasksPercent];
    this.chartOptions3.series = [inDevelopmentTasksPercent];
    this.chartOptions4.series = [doneTasksPercent];
    this.chartOptions5.series = [doneTasksPercent, inDevelopmentTasksPercent, toDoTasksPercent];
  }

  calculatePercentage(value: number): number {
    const totalTasks = this.tasks.length;
    return totalTasks > 0 ? Math.round((value / (this.tasks.length)) * 100) : 0;
  }

}
