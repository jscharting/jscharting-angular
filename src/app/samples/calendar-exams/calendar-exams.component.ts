import {Component, AfterViewInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';

import {FileContentService} from '../shared/file-content.service';

import JSC from '../shared/jscharting-common';

@Component({
	selector: 'app-calendar-exams',
	templateUrl: './calendar-exams.component.html',
	styleUrls: ['./calendar-exams.component.css']
})
export class CalendarExamsComponent implements AfterViewInit, OnDestroy {
	@ViewChild('chartTargetElement') chartTargetElement: ElementRef;

	private chart: any;

	constructor(private fileContentService: FileContentService) {
	}

	ngAfterViewInit(): void {
		this.fileContentService.getFileContent('assets/examSchedule.csv').subscribe((csvString: string) => {
			const parsedData = JSC.parseCsv(csvString);
			this.renderChart(parsedData.data);
		});
	}

	ngOnDestroy(): void {
		if (this.chart) {
			this.chart.dispose();
		}
	}

	private renderChart(rows: any[]) {
		const chartConfig = this.createChartConfig(rows);
		this.chart = new JSC.Chart(chartConfig, null);
	}

	private createChartConfig(rows: any[]): any {
		const palette = JSC.getPalette(0);
		return {
			targetElement: this.chartTargetElement.nativeElement,
			debug: true,
			type: 'calendar month solid',
			title: {
				label_text: 'Exam Schedule January 2018',
				position: 'center',
				label_style_fontSize: 22
			},
			defaultBox_boxVisible: false,
			legend: {
				position: 'bottom',
				template: '%icon %name',
				customEntries: rows.map(function (row, i) {
					return {
						name: row[2],
						icon_color: palette[i]
					};
				})
			},
			defaultSeries: {
				shape_innerPadding: 0,
				mouseTracking_enabled: false,
				legendEntry_visible: false,
			},
			defaultPoint: {
				label: {
					text: '<b>%name</b><br>%events',
					align: 'center',
					verticalAlign: 'top',
					style_fontSize: 20,
				},
				attributes_events: ''
			},
			toolbar_items_export_visible: false,
			yAxis_visible: false,
			series: [{
				points: rows.map(function (row, i) {
					return {
						date: [row[0], row[1]],
						attributes: {
							subject: row[2],
							events: [`<icon path="M0 0L80 0 L80 6L0 6 z" width="55" height="8" color=${palette[i]}><br>`]
						}
					};
				})
			}]
		};
	}
}
