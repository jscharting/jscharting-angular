import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';

import {JSChartingService} from '../shared/jscharting.service';

@Component({
	selector: 'app-service-sample',
	templateUrl: './service-sample.component.html',
	styleUrls: ['./service-sample.component.css']
})
export class ServiceSampleComponent implements AfterViewInit, OnDestroy {
	@ViewChild('chartTargetElement') chartTargetElement: ElementRef;

	private chart: any;

	constructor(private chartService: JSChartingService) {
	}

	ngAfterViewInit(): void {
		this.chart = this.chartService.chart({
			targetElement: this.chartTargetElement.nativeElement,
			defaultSeries_type: 'columnRounded',
			palette: 'fiveColor18',
			yAxis_scale_type: 'stacked',
			series: [
				{
					name: 'Z1 Saw',
					id: 's1',
					points: [
						{name: 'Q1', y: -130},
						{name: 'Q2', y: -200},
						{name: 'Q3', y: 267},
						{name: 'Q4', y: 238}
					]
				},
				{
					name: 'Z1 Hammer',
					points: [
						{name: 'Q1', y: 325},
						{name: 'Q2', y: -180},
						{name: 'Q3', y: -120},
						{name: 'Q4', y: 371}
					]
				},
				{
					name: 'Z1 Grinder',
					points: [
						{name: 'Q1', y: 285},
						{name: 'Q2', y: 292},
						{name: 'Q3', y: -210},
						{name: 'Q4', y: -165}
					]
				},
				{
					name: 'Z1 Drill',
					points: [
						{name: 'Q1', y: 185},
						{name: 'Q2', y: 192},
						{name: 'Q3', y: 198},
						{name: 'Q4', y: 248}
					]
				}]
		});
	}

	ngOnDestroy(): void {
		if (this.chart) {
			this.chart.destroy();
		}
	}
}
