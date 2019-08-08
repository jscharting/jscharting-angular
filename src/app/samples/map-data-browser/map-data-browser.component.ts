import {Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';

import {FileContentService} from '../shared/file-content.service';
import {ScriptService} from '../shared/script.service';

import JSC from '../shared/jscharting-common';

@Component({
	selector: 'app-map-data-browser',
	templateUrl: './map-data-browser.component.html',
	styleUrls: ['./map-data-browser.component.css']
})
export class MapDataBrowserComponent implements AfterViewInit, OnDestroy {
	@ViewChild('chartTargetElement', null) chartTargetElement: ElementRef;

	countries: any[];
	country: any;

	provinces: any[];
	province: any;

	regions: any[];
	region: any;

	private chart: any;
	private paletteIndex: number;
	private mapDataIndex: any;

	constructor(
		private fileContentService: FileContentService,
		private scriptService: ScriptService,
		private changeDetector: ChangeDetectorRef
	) {
		this.countries = [];
		this.country = null;
		this.provinces = [];
		this.province = null;
		this.regions = [];
		this.region = null;
		this.chart = null;
		this.paletteIndex = 0;
		this.mapDataIndex = null;
	}

	ngAfterViewInit(): void {
		const bundle = window['JSC'].bundle;
		if (!bundle || !bundle.mapDataIndex) {
			this.fileContentService.getFileContent('assets/mapDataIndex.js').subscribe((mapData: string) => {
				this.scriptService.insertScriptCode(mapData);
				this.mapDataIndex = window['JSC'].bundle.mapDataIndex;
				this.renderChart();
			});
		} else {
			this.mapDataIndex = bundle.mapDataIndex;
			this.renderChart();
		}
		this.changeDetector.detectChanges();
	}

	ngOnDestroy(): void {
		if (this.chart) {
			this.chart.dispose();
		}
	}

	changeCountry() {
		this.fillProvincesAndRegions(this.country.id);
		this.updateChart(this.country.id);
	}

	changeProvince() {
		let provincePoint: any;
		if (this.province.id === 'ALL') {
			this.chart.zoom(1);
		} else if (provincePoint = (this.chart as any).series().points(this.province.id)) {
			provincePoint.zoomTo();
		}
		this.region = this.regions[0];
	}

	changeRegion() {
		if (this.region.id === 'ALL') {
			this.chart.zoom(1);
		} else {
			this.chart.zoom('region:' + this.region.id);
		}
		this.province = this.provinces[0];
	}

	private createChartConfig(): any {
		return {
			targetElement: this.chartTargetElement.nativeElement,
			debug: true,
			type: 'map',
			defaultPoint_label_visible: true,
			legend_visible: false,
			defaultPoint_tooltip: '%mapCode<br/>%name<br/>%region',
			series: [{
				defaultPoint_states_select: {
					outline: {color: 'white', width: 1}
				}
			}],
			toolbar_items_resetZoom_visible: false
		};
	}

	private renderChart() {
		const chartConfig = this.createChartConfig();
		this.chart = new JSC.Chart(chartConfig, (chart) => {
			this.fillCountries(chart);
			this.updateChart(this.country.id, chart);
		});
	}

	private updateChart(id, chart?: any) {
		const seriesConfig = this.createSeriesConfigByCountryId(id);
		chart = chart || this.chart;
		chart.series.splice(0, 1, seriesConfig);
	}

	private createSeriesConfigByCountryId(id) {
		const palette = JSC.getPalette(0);
		return [{
			map: id,
			name: this.mapDataIndex[id].name,
			palette: JSC.colorToPalette(palette[this.paletteIndex++ % palette.length], {
				saturation: .3,
				hue: .05,
				lightness: .5
			}, 10, 4)
		}];
	}

	private fillCountries(chart?: any) {
		const mapDataIndex = this.mapDataIndex;
		const countries = [];
		for (const id of Object.keys(mapDataIndex).sort()) {
			countries.push({id, name: mapDataIndex[id].name});
		}
		this.countries = countries;
		this.country = this.countries[0];
		this.fillProvincesAndRegions(this.country.id, chart);
	}

	private fillProvincesAndRegions(countryId: string, chart?: any) {
		const provincesData = this.mapDataIndex[countryId].provinces;

		const provinces = [];
		provinces.push({id: 'ALL', name: 'Select a province'});
		for (const id of Object.keys(provincesData).sort()) {
			provinces.push({id, name: provincesData[id].name});
		}
		this.provinces = provinces;
		this.province = this.provinces[0];

		let regionsData = this.mapDataIndex[countryId].regions;
		const regions = [];
		if (regionsData) {
			regionsData = regionsData.sort();
			for (let i = 0; i < regionsData.length; i++) {
				const region = regionsData[i];
				regions.push({id: region, name: region});
			}
		}

		chart = chart || this.chart;
		if (regions.length) {
			regions.unshift({id: 'ALL', name: 'Select a region'});
			chart.options({defaultPoint_tooltip: '%mapCode<br/>%name<br/>%region'});
		} else {
			regions.push({id: 'ALL', name: 'Regions not available'});
			chart.options({defaultPoint_tooltip: '%mapCode<br/>%name'});
		}

		this.regions = regions;
		this.region = this.regions[0];
	}
}
