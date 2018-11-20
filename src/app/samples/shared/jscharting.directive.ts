import {AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, NgZone} from '@angular/core';

@Directive({
	selector: '[appJSCharting]'
})
export class JSChartingDirective implements AfterViewInit, OnChanges, OnDestroy {
	@Input() options: any;
	@Input() callback: (chart: any) => void;

	private chart: any;
	private JSC: any;

	constructor(
		private element: ElementRef,
		private zone: NgZone
	) {
		this.JSC = window['JSC'];
	}

	ngAfterViewInit() {
		this.zone.runOutsideAngular(() => {
			this.createChart();
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['options']) {
			this.options = changes['options'].currentValue;
		}

		if (changes['callback']) {
			this.callback = changes['callback'].currentValue;
		}

		if (!this.options) {
			this.options = {};
		}

		this.zone.runOutsideAngular(() => {
			this.createChart();
		});
	}

	ngOnDestroy() {
		if (this.chart) {
			this.chart.destroy();
		}
	}

	private createChart() {
		if (this.chart) {
			this.chart.destroy();
		}

		this.setOptionsTargetElement();
		this.chart = new this.JSC.Chart(this.options, this.callback);
	}

	private setOptionsTargetElement() {
		this.options.targetElement = this.element.nativeElement;
	}
}
