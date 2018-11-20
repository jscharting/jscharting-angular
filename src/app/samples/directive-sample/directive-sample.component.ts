import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-directive-sample',
	templateUrl: './directive-sample.component.html',
	styleUrls: ['./directive-sample.component.css']
})
export class DirectiveSampleComponent implements OnInit {
	chartOptions: any;

	constructor() {
	}

	ngOnInit(): void {
		this.chartOptions = this.getBarsChartOptions();
	}

	barsChart(): void {
		this.chartOptions = this.getBarsChartOptions();
	}

	pyramidChar() {
		this.chartOptions = this.getPyramidChartOptions();
	}

	private getBarsChartOptions(): any {
		return {
			defaultSeries_type: 'columnAqua',
			title_label_text: 'Net Cash Flow',
			legend_visible: false,
			yAxis_formatString: 'c',
			series: [{
				points: [
					{name: 'Angie', y: -12232},
					{name: 'Chris', y: 28651},
					{name: 'Arthur', y: -23093},
					{name: 'David', y: 35698},
					{name: 'Mike', y: -21324},
					{name: 'Laura', y: -18342},
					{name: 'Michelle', y: 25684},
					{name: 'Joseph', y: 38654}
				]
			}]
		};
	}

	private getPyramidChartOptions(): any {
		return {
			type: 'pyramid',
			title_label_text: 'Operations Cost',
			uiCat1: '<#These y axis settings  describe the point y values.#Label#>',
			yAxis_label_text: 'Cost',
			yAxis_formatString: 'c',
			defaultSeries: {
				shape_innerPadding: 6,
				defaultPoint: {
					label_text: '%name <b>%yValuek</b> (%percentOfSeries%)'
				}
			},
			series: [{
				name: '2015 Costs',
				palette: 'default',
				points: [
					{name: 'R&D', y: 183},
					{name: 'Shipping', y: 140},
					{name: 'Marketing', y: 136},
					{name: 'Manufacturing', y: 80},
					{name: 'Retail', y: 50}
				]
			}]
		};
	}
}
