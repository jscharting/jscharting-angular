import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {JSChartingModule} from './samples/shared/jscharting.module';

import {AppComponent} from './app.component';
import {CalendarExamsComponent} from './samples/calendar-exams/calendar-exams.component';
import {CalendarPlannerSelectionComponent} from './samples/calendar-planner-selection/calendar-planner-selection.component';
import {DirectiveCalendarEventsComponent} from './samples/directive-calendar-events/directive-calendar-events.component';
import {DirectiveSampleComponent} from './samples/directive-sample/directive-sample.component';
import {MapDataBrowserComponent} from './samples/map-data-browser/map-data-browser.component';
import {RadarColCompleteComponent} from './samples/radar-col-complete/radar-col-complete.component';
import {ServiceSampleComponent} from './samples/service-sample/service-sample.component';
import {IconsBrowserComponent} from './samples/icons-browser/icons-browser.component';

import {FileContentService} from './samples/shared/file-content.service';
import {ScriptService} from './samples/shared/script.service';

@NgModule({
	declarations: [
		AppComponent,
		CalendarExamsComponent,
		CalendarPlannerSelectionComponent,
		DirectiveCalendarEventsComponent,
		DirectiveSampleComponent,
		MapDataBrowserComponent,
		RadarColCompleteComponent,
		ServiceSampleComponent,
		IconsBrowserComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		JSChartingModule
	],
	providers: [
		FileContentService,
		ScriptService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
