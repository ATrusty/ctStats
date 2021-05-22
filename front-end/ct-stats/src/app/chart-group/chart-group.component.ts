import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-chart-group',
  templateUrl: './chart-group.component.html',
  styleUrls: ['./chart-group.component.css']
})
export class ChartGroupComponent implements OnInit {


  // lineChartData: ChartDataSets[] = [
  //   { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  // ];
  lineChartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];

  // lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  lineChartLabels: Label[]
  
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(public backendService: BackendServiceService) {
    /*this.backendService.getIndivStats("TR Trusty").subscribe((gameStats: any) => {
      console.log(gameStats);
    });*/

    this.backendService.getAggStats().subscribe((gameStats: any) => {
      let labels: Label[] = [];
      let chartDataList = [];
      let chartData: ChartDataSets[] = [];
      for (const stat of gameStats.data) {
        labels.push(stat.playedAt);
        chartDataList.push(stat.avgKD);
      }
      this.lineChartLabels = labels;
      chartData = [{ data: chartDataList, label: 'Squad Stats' }];
      this.lineChartData = chartData;
    });
  }

  async ngOnInit(): Promise<void> {

  }

}
