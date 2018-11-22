import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CalendarExamsComponent} from './samples/calendar-exams/calendar-exams.component';
import {CalendarPlannerSelectionComponent} from './samples/calendar-planner-selection/calendar-planner-selection.component';
import {DirectiveCalendarEventsComponent} from './samples/directive-calendar-events/directive-calendar-events.component';
import {DirectiveSampleComponent} from './samples/directive-sample/directive-sample.component';
import {MapDataBrowserComponent} from './samples/map-data-browser/map-data-browser.component';
import {RadarColCompleteComponent} from './samples/radar-col-complete/radar-col-complete.component';
import {ServiceSampleComponent} from './samples/service-sample/service-sample.component';
import {IconsBrowserComponent} from './samples/icons-browser/icons-browser.component';
import {MicroProgressComponent} from './samples/micro-progress/micro-progress.component';

const routes: Routes = [
	{path: '', redirectTo: 'samples/calendar-exams', pathMatch: 'full'},
	{path: 'samples/calendar-exams', component: CalendarExamsComponent},
	{path: 'samples/calendar-planner-selection', component: CalendarPlannerSelectionComponent},
	{path: 'samples/directive-calendar-events', component: DirectiveCalendarEventsComponent},
	{path: 'samples/directive-sample', component: DirectiveSampleComponent},
	{path: 'samples/map-data-browser', component: MapDataBrowserComponent},
	{path: 'samples/radar-col-complete', component: RadarColCompleteComponent},
	{path: 'samples/service-sample', component: ServiceSampleComponent},
	{path: 'samples/icons-browser', component: IconsBrowserComponent},
	{path: 'samples/micro-progress', component: MicroProgressComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
