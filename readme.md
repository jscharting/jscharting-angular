# JSCharting: Any Chart. Anywhere.

<a href="https://jscharting.com"><img src="https://jscharting.com/images/logo_short.svg" style="margin:0px" align="left" hspace="10" vspace="6" width="200" ></a>

**JSCharting** is a JavaScript chart library for visualizing your data, providing resolution 
independent results across all devices and platorms. Every JSCharting license includes the 
full suite of 150+ advanced chart types, interactive stock charts and JSMapping at no additional charge.

## Official JSCharting Samples for Angular 6

This set of samples demonstrate how to use JSCharting with the Angular framework. Samples are located in the `src/app/samples` folder.

### How to use

1) In your component import Chart and create an instance.

```typescript
import {Chart} from 'jscharting';

this.chart = new Chart({});
```

----

2) In your app module, import the `JSChartingModule` module and add it to the `imports`:

```typescript
import {JSChartingModule} from './jscharting/jscharting.module';

@NgModule({
	imports: [
	JSChartingModule
	]
})
export class AppModule {}
```

----

3) Inject the `JSChartingService` into your app component, create a '<div>' element with reference `chartTargetElement: ElementRef`.

```typescript
import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';

import {Chart} from './jscharting/jscharting';
import {JSChartingService} from './shared/jscharting.service';

@Component({
	template: '<div><div #chartTargetElement class="chart-container"></div></div>'
})
export class AppComponent implements AfterViewInit, OnDestroy {
	@ViewChild('chartTargetElement') chartTargetElement: ElementRef;

	private chart: Chart;

	constructor(private chartService: JSChartingService) {
	}

	ngAfterViewInit(): void {
		this.chart = this.chartService.chart({
			targetElement: this.chartTargetElement.nativeElement
		});
	}

	ngOnDestroy(): void {
		if (this.chart) {
			this.chart.destroy();
		}
	}
```

Make sure you destroy chart in `ngOnDestroy` method.

----

4) Rather than using `JSChartingService` you can instead use the `appJSCharting` directive:

```typescript
import {Component, OnInit} from '@angular/core';

import {JSCChartConfig} from './jscharting/jscharting';

@Component({
	template: '<div><div appJSCharting [options]="chartOptions" class="chart-container"></div></div>'
})
export class AppComponent implements OnInit {
	public chartOptions = {
		...
	};

	ngOnInit(): void {
		// You can update config.
		this.chartOptions = {};
	}
}
```

It is easer to use `appJSCharting` directive than service or create chart directly.

----

Please see full samples in the `src/app/samples` folder.

