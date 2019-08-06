import {Component, AfterViewInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';

import JSC from '../shared/jscharting-common';

@Component({
	selector: 'app-radar-col-complete',
	templateUrl: './radar-col-complete.component.html',
	styleUrls: ['./radar-col-complete.component.css']
})
export class RadarColCompleteComponent implements AfterViewInit, OnDestroy {
	@ViewChild('chartTargetElement') chartTargetElement: ElementRef;

	private chart: any;

	ngAfterViewInit(): void {
		this.chart = new JSC.Chart({
			targetElement: this.chartTargetElement.nativeElement,
			debug: true,
			type: 'radar column',
			yAxis_alternateGridFill: '#f4f4f4',
			chartArea_boxVisible: false,
			legend_visible: false,
			title: {
				boxVisible: false,
				position: 'center',
				label: {
					text: 'Sales By Representative',
					style: {fontSize: 15, fontWeight: 'normal'}
				}
			},
			defaultSeries: {
				opacity: .7,
				defaultPoint_complete: {fill: ['white', .3], hatch_style: 'dotted-grid'}
			},
			series: [{
				name: 'William',
				points: [{
					name: 'Jan',
					y: 196, complete_y: .5
				}, {
					name: 'Feb',
					y: 178, complete_y: .7
				}, {
					name: 'Mar',
					y: 169, complete_y: .8
				}, {
					name: 'Apr',
					y: 166, complete_y: .3
				}, {
					name: 'May',
					y: 110, complete_y: .6
				}, {
					name: 'Jun',
					y: 162, complete_y: [.8, 1]
				}]
			}]
		}, null);
	}

	ngOnDestroy(): void {
		if (this.chart) {
			this.chart.dispose();
		}
	}
}
