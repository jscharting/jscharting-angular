import {Component, OnInit} from '@angular/core';
import {Router, Event, NavigationEnd} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	samples = [
		{
			path: '/samples/calendar-exams',
			name: 'Calendar Exams',
			description: 'Calendar chart with events marked by a custom svg path.'
		},
		{
			path: '/samples/calendar-planner-selection',
			name: 'Calendar Planner Selection',
			description: 'Events data loaded dynamically shown as dots with expanded view on click.'
		},
		{
			path: '/samples/directive-calendar-events',
			name: 'Calendar Events',
			description: 'An events calendar based on csv data.'
		},
		{
			path: '/samples/directive-sample',
			name: 'Directive sample',
			description: 'Directive usage sample.'
		},
		{
			path: '/samples/map-data-browser',
			name: 'Map Data Browser',
			description: 'Loads the digital list of available maps and displays them.'
		},
		{
			path: '/samples/radar-col-complete',
			name: 'Radar Col Complete',
			description: 'Radar column chart with complete data.'
		},
		{
			path: '/samples/service-sample',
			name: 'Service sample',
			description: 'Usage of service sample.'
		},
		{
			path: '/samples/icons-browser',
			name: 'Icons Browser',
			description: 'Icon browser with search to view and find all available icons.'
		},
		{
			path: '/samples/micro-progress',
			name: 'Micro Progress',
			description: 'Demonstrate using JSC.label() with microcharts.'
		}
	];

	sample: any;

	constructor(
		private router: Router,
		private titleService: Title
	) {
	}

	ngOnInit(): void {
		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				this.sample = this.samples.find(s => s.path === this.router.url);
				if (!this.sample) {
					this.sample = this.samples[0];
				}
				this.titleService.setTitle(this.sample.name);
			}
		});
	}

	changeSample() {
		this.router.navigate([this.sample.path]);
		this.titleService.setTitle(this.sample.name);
	}
}
