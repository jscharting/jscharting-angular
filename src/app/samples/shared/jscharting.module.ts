import {NgModule} from '@angular/core';

import {JSChartingDirective} from './jscharting.directive';
import {JSChartingService} from './jscharting.service';

@NgModule({
	declarations: [JSChartingDirective],
	exports: [JSChartingDirective],
	providers: [JSChartingService]
})
export class JSChartingModule {
}
