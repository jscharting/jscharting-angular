import {NgModule} from '@angular/core';

import {JSChartingDirective} from './jscharting.directive';
import {JSCLabelDirective} from './jsc-label.directive';
import {JSChartingService} from './jscharting.service';

@NgModule({
	declarations: [
		JSChartingDirective,
		JSCLabelDirective
	],
	exports: [
		JSChartingDirective,
		JSCLabelDirective
	],
	providers: [JSChartingService]
})
export class JSChartingModule {
}
