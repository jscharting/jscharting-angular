import {
	AfterViewInit,
	Directive,
	ElementRef,
	OnChanges,
	OnDestroy,
	SimpleChanges,
	NgZone,
	Input
} from '@angular/core';

import JSC from './jscharting-common';

@Directive({
	selector: '[appJSCLabel]'
})
export class JSCLabelDirective implements AfterViewInit, OnChanges, OnDestroy {
	@Input() config: string;

	constructor(
		private element: ElementRef,
		private zone: NgZone
	) {
	}

	ngAfterViewInit(): void {
		this.zone.runOutsideAngular(() => this.createLabel(this.config));
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['config']) {
			this.config = changes['config'].currentValue;
		}

		this.createLabel(this.config);
	}

	ngOnDestroy(): void {
		this.destroyLabel();
	}

	private createLabel(config?: string) {
		this.destroyLabel();
		JSC.label(
			this.element.nativeElement,
			config
			);
	}

	private destroyLabel() {
		this.element.nativeElement.innerHtml = '';
	}
}
