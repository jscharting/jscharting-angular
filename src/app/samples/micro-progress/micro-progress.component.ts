import {Component, OnInit, AfterViewInit} from '@angular/core';

@Component({
	selector: 'app-micro-progress',
	templateUrl: 'micro-progress.component.html',
	styleUrls: ['./micro-progress.component.css']
})
export class MicroProgressComponent implements OnInit, AfterViewInit {
	labelConfig1: string;
	labelConfig2: string;
	labelConfig3: string;
	finalLabelConfig: string;

	private step: number;
	private stepNext: number;
	private progress: number;

	ngOnInit(): void {
		this.step = Math.floor(Math.random() * 10);
		this.stepNext = 0;
		this.progress = this.step + this.stepNext;
	}

	ngAfterViewInit(): void {
		this.showProgress((config) => { this.labelConfig1 = config; }, () => {
			this.showProgress((config) => { this.labelConfig2 = config; }, () => {
				this.showProgress((config) => { this.labelConfig3 = config; }, () => {
					this.finalLabelConfig = '<span style="font-weight:bold; font-size:20px">The installation was successful!</span><br>';
				});
			});
		});
	}

	private showProgress(configFn, cb) {
		const interval = setInterval(() => {
			this.stepNext = Math.floor(Math.random() * 50);
			this.progress = this.progress + this.stepNext;
			this.step = this.stepNext;
			this.updateLabel(configFn, this.progress, 2000);
			if (this.progress >= 2000) {
				clearInterval(interval);
				this.progress = 0;
				this.step = Math.floor(Math.random() * 50);
				this.stepNext = 0;
				this.doneLabel(configFn);
				cb();
			}
		},
			Math.floor(50 + Math.random() * 10)
		);
	}

	private updateLabel(configFn, progress, goal) {
		configFn(
			'<span style="font-weight:bold; font-size:18px">' + ((progress * 100) / goal).toFixed(2) + '%' + '</span><br>' +
			'<chart width=200 type=progress data=' + progress + ' max=' + goal + ' color=#00e676><br>' +
			'<span style="font-size:14px">' + progress + ' of ' + goal + '</span>'
		);
	}

	private doneLabel(configFn) {
		configFn(
			'<span style="font-weight:bold; font-size:18px">100%</span><br>' +
			'<chart width=200 type=progress data=100 max=100 color=#00e676>' +
			'<span style="font-size:14px"> Done </span><icon name=material/navigation/check size=16 fill=green>'
		);
	}
}
