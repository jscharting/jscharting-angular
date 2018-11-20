import {Component, AfterViewInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';

import {FileContentService} from '../shared/file-content.service.js';

@Component({
	selector: 'app-calendar-planner-selection',
	templateUrl: './calendar-planner-selection.component.html',
	styleUrls: ['./calendar-planner-selection.component.css']
})
export class CalendarPlannerSelectionComponent implements AfterViewInit, OnDestroy {
	@ViewChild('chartTargetElement') chartTargetElement: ElementRef;
	@ViewChild('eventsElement') eventsElement: ElementRef;

	private chart: any;

	constructor(private fileContentService: FileContentService) {
	}

	ngAfterViewInit(): void {
		this.fileContentService.getFileContent('assets/events_data2.csv').subscribe((csvString: string) => {
			const parsedCsv = window['JSC'].parseCsv(csvString);
			this.renderChart(parsedCsv.data);
		});
	}

	ngOnDestroy(): void {
		if (this.chart) {
			this.chart.dispose();
		}
	}

	private renderChart(rows: any[]) {
		const chartConfig = this.createChartConfig(rows);
		this.chart = new window['JSC'].Chart(
			chartConfig,
			(chart) => {
				this.printEventInfo(chart);
			});
	}

	private printEventInfo(chart) {
		setTimeout(() => {
			chart.series().points({selected: true}).each((point) => {
				this.eventsElement.nativeElement.innerHTML = this.createEventsHtml(point);
			});
		}, 100);
	}

	private createEventsHtml(point): string {
		const attributes = point.options('attributes');
		const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		return `<div class="day-events">
			<div class="day">
				<span style="font-size:22px; font-weight:bold">${window['JSC'].formatDate(point.tokenValue('%date'), 'dd')}</span>
				<span style="font-weight:100;text-transform:uppercase">${weekDays[new Date(point.tokenValue('%date')).getDay()]}</span>
			</div>
			<div class="events">${attributes.events}</div>
		</div>`;
	}

	private createChartConfig(rows: any[]): any {
		const palette = window['JSC'].getPalette(0),
			entries = this.createEntriesByRows(rows),
			chartConfig: any = {
				targetElement: this.chartTargetElement.nativeElement,
				type: 'calendar month solid',
				defaultCultureName: 'en',
				title: {
					label_text: 'JULY 2019',
					position: 'right',
					label_style: {
						fontSize: 20
					}
				},
				defaultBox_boxVisible: false,
				legend: {
					visible: true,
					position: 'bottom',
					template: '%icon %name',
					customEntries: this.createLegendCustomEntries(entries, palette)
				},
				chartArea: {fill: 'none'},
				calendar: {
					range: ['7/1/2019', '8/1/2019'],
					defaultEdgePoint: {mouseTracking: false, label_visible: false, fill: 'none'},

				},
				defaultTooltip_enabled: false,
				defaultSeries: {
					legendEntry_visible: false,
					shape_innerPadding: 0,
					pointSelection: true,
				},
				defaultPoint: {
					events_click: () => {
						this.printEventInfo(this.chart);
					},
					states_hover: {color: '#eaf5f9'},
					outline_width: 0,
					label: {
						text: '%icons<br><span style="align:center;"><b>%name</b></span>',
						style_fontSize: 12,
						align: 'right',
						verticalAlign: 'top',
						padding: 5,
						color: 'gray'
					},
					attributes_events: '',
					attributes_icons: '<icon name=material/toggle/radio-button-unchecked color=transparent outerShape=circle size=6 >',
				},
				toolbar_items_export_visible: false,
				yAxis_visible: false,
				series: [{
					points: this.createSeriesPoints(rows, palette, entries)
				}]
			};

		return chartConfig;
	}

	private createLegendCustomEntries(entries: any[], palette) {
		const result = [];
		for (let i = 0; i < entries.length; i++) {
			const entry = entries[i];
			result.push({
				name: entry,
				icon: {
					color: palette[i],
					name: 'material/toggle/radio-button-unchecked',
					size: 14,
					outerShape: 'circle',
					outline_width: 0
				}
			});
		}

		return result;
	}

	private createSeriesPoints(rows: any[], palette, entries) {
		const result = [];
		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];

			const eventsText = `
				<div class="${row[3]}" style="border-left:5px solid ${palette[entries.indexOf(row[3])]};">
					<table>
						<tr>
							<th style="text-align:left; font-weight:normal">
								<icon name=material/toggle/radio-button-unchecked color=black size=4>${row[2]}
							</th>
							<th style="text-align:right;font-size:10px; width:50px;">
								${window['JSC'].formatDate(new Date(row[0]), 't')}
							</th>
						</tr>
					</table>
				</div>`;

			const labelText = `<icon name=material/toggle/radio-button-unchecked
				color='${palette[entries.indexOf(row[3])]} outerShape=circle size=6 >`;

			result.push({date: [row[0], row[1]], attributes: {events: [eventsText], icons: [labelText]}});
		}

		return result;
	}

	private createEntriesByRows(rows: any[]) {
		const result = [];
		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];
			const entryName = row[3];
			if (result.indexOf(entryName) === -1) {
				result.push(entryName);
			}
		}

		return result;
	}
}
