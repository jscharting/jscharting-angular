import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

import {ScriptService} from '../shared/script.service';

import JSC from '../shared/jscharting-common';

@Component({
	selector: 'app-icons-browser',
	templateUrl: './icons-browser.component.html',
	styleUrls: ['./icons-browser.component.css']
})
export class IconsBrowserComponent implements AfterViewInit {
	@ViewChild('chartTargetElement', null) chartTargetElement: ElementRef;
	@ViewChild('iconsGroupElement', null) iconsGroupElement: ElementRef;
	@ViewChild('nextIconElement', null) nextIconElement: ElementRef;
	@ViewChild('selectedIconElement', null) selectedIconElement: ElementRef;

	chart: any;

	private iconsLookup;

	private groupsLookup: any;
	private allTags: any;
	private allIcons: any[];
	private cellSize: number;
	private padding: number;
	private spacingFactor: number;
	private chartWidth: number;
	private pageSizes: number[];
	private currentPageSize: number;

	constructor(private scriptService: ScriptService) {
	}

	ngAfterViewInit(): void {
		this.groupsLookup = {};
		this.allTags = {};
		this.allIcons = [];
		this.cellSize = 70;
		this.padding = 10;
		this.pageSizes = [30, 50, 100, 0];
		this.spacingFactor = 0.5;
		this.chartWidth = 740;

		const dataUrl = 'assets/iconsBrowserData.js';
		fetch(dataUrl)
			.then((response) => {
				response.text().then((text) => {
					this.scriptService.insertScriptCode(text);
					this.iconsLookup = window['JSC'].bundle.iconsLookup;

					const iconsList = window['JSC'].bundle.iconsList;
					const systemIconsList = window['JSC'].bundle.systemIconsList;

					iconsList.map((x) => { this.addToGroupsLookup(x); });
					systemIconsList.map((x) => { this.addToGroupsLookup(x, true); });

					this.loadTokenInput();
					this.addGroupsToSelect(Object.keys(this.groupsLookup));

					this.nextIconElement.nativeElement.onclick = () => {
						let i = this.iconsGroupElement.nativeElement.selectedIndex;
						this.iconsGroupElement.nativeElement.options[++i % this.iconsGroupElement.nativeElement.options.length].selected = true;
						this.showGroupIcons(this.chart);
					};

					this.chart = new JSC.Chart(
						this.getChartOptions(),
						(chart) => {
							this.showGroupIcons(chart);
						});
			});
		});
	}

	private addGroupsToSelect(keys) {
		const el = this.iconsGroupElement.nativeElement;
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}

		for (let i = 0; i < keys.length; i++) {
			const opt = document.createElement('option'),
				val = keys[i];
			opt.value = val;
			opt.innerHTML = val;
			el.appendChild(opt);
		}

		el.onchange = () => { this.showGroupIcons(this.chart); };
	}

	private showIcons(chart, page, pageSize, data, chartTitle, groupPath) {
			const show = () => {
				let x = this.padding,
					y = this.cellSize;

				const allIconsNumber = data.length;

				if (!pageSize) {
					pageSize = allIconsNumber;
				}

				const pagesNumber = Math.ceil(allIconsNumber / pageSize),
					pageIcons = [],
					length = Math.min(allIconsNumber, (page + 1) * pageSize);

				for (let i = page * pageSize; i < length; i++) {
					const icon = data[i];
					icon.position = 'inside ' + x + ',' + y;
					x += this.cellSize * (2 + this.spacingFactor);
					if (x > this.chartWidth - this.cellSize * 2 || i === length - 1) {
						x = this.padding;
						y += this.cellSize + this.padding;
					}
					pageIcons.push(icon);
				}

				const titleAnnotation = this.title(chartTitle),
					addNumberButton = (number) => {
						pageIcons.push({
							fill: 'none',
							states: {
								select: {
									fill: '#bdbdbd'
								}
							},
							position: 'inside bottom',
							state_select: page === number,
							outline_width: 0,
							label: {
								text: '' + (number + 1),
								style_color: '#6d6d6d'
							},
							events_click: () => { this.showIcons(chart, number, pageSize, data, chartTitle, groupPath); }
						});
					},
					addArrowButton = (name, tooltip, newPage) => {
						pageIcons.push({
							fill: 'none',
							position: 'inside bottom',
							outline_width: 0,
							icon: {
								name: name,
								fill: '#6d6d6d',
							},
							tooltip: tooltip,
							events_click: () => { this.showIcons(chart, newPage, pageSize, data, chartTitle, groupPath); }
						});
					},
					addPageSizeButton = (size) => {
						pageIcons.push({
							fill: 'none',
							position: 'inside bottom left',
							states: {
								select: {
									fill: '#bdbdbd'
								}
							},
							outline_width: 0,
							state_select: pageSize === (size || allIconsNumber),
							label: {
								text: '' + (size || 'all'),
								style_color: '#6d6d6d'
							},
							events_click: () => {
								this.currentPageSize = size;
								this.showIcons(chart, 0, size, data, chartTitle, groupPath);
							}
						});
					},
					addPageSizeTitle = () => {
						pageIcons.push({
							fill: 'none',
							position: 'inside bottom left',
							outline_width: 0,
							states: {
								hover: {
									fill: 'none'
								}
							},
							cursor: 'default',
							label: {
								text: 'Show:',
								style_color: '#6d6d6d'
							}
						});
					};

				if (pagesNumber > 1) {
					addArrowButton('material/hardware/keyboard-arrow-left', 'go back', Math.max(page - 1, 0));
					for (let i = 0; i < pagesNumber; i++) {
						addNumberButton(i);
					}
					addArrowButton('material/hardware/keyboard-arrow-right', 'go forward', Math.min(page + 1, pagesNumber - 1));
				}

				if (allIconsNumber > this.pageSizes[0]) {
					addPageSizeTitle();
					for (let i = 0; i < this.pageSizes.length; i++) {
						addPageSizeButton(this.pageSizes[i]);
					}
				}

				requestAnimationFrame(() => {
					chart.options({height: y + this.cellSize + this.padding });

					if (!chart.annotations(0)) {
						chart.annotations.add(titleAnnotation);
					} else {
						chart.annotations(0).options(titleAnnotation);
					}

					(chart.toolbar() as any).items(pageIcons);
					chart.loading(false);
				});

			};

		chart.loading(true);

		if (groupPath) {
			this.evalIcons(groupPath, show);
		} else {
			show();
		}

	}

	private evalIcons(group, callback) {
		if (group.split('/')[0] === 'system') {
			return callback();
		}

		const iconsPath = `assets/icons/${group}/all.js`;
		fetch(iconsPath)
			.then((response) => {
				response.text().then((text) => {
					this.scriptService.insertScriptCode(text);
					callback();
				});
			});
	}

	private showGroupIcons(chart) {
		const group = this.getVal(this.iconsGroupElement.nativeElement);
		this.showIcons(chart, 0, 30, this.getArr(this.groupsLookup[group]), group, group);
	}

	private getVal(el) {
		return el.options[el.selectedIndex].value;
	}

	private getArr(obj) {
		const result = [];
		for (const key of Object.keys(obj)) {
			result.push(obj[key]);
		}
		return result;
	}

	private loadTokenInput() {
		const allTagsArray = Object.keys(this.iconsLookup);
		// fetch('assets/auto-complete.min.js')
		// 	.then((response) => {
		// 		response.text().then((text) => {
		// 			this.scriptService.insertScriptCode(text);

		// 			// searchInput = new autoComplete({
		// 			// 	selector: '#search',
		// 			// 	minChars: 1,
		// 			// 	source: function(term, suggest){
		// 			// 		term = term.toLowerCase();
		// 			// 		var suggestions = [];
		// 			// 		for (var i = 0; i < allTagsArray.length; i++ )
		// 			// 		{
		// 			// 			if (~allTagsArray[i].toLowerCase().indexOf(term)) {
		// 			// 				suggestions.push(allTagsArray[i]);
		// 			// 			}
		// 			// 		}
		// 			// 		suggest(suggestions);
		// 			// 	},
		// 			// 	onSelect: function(e, term, item) {
		// 			// 		doneTyping([term]);
		// 			// 	}
		// 			// });
		// 		});
		// 	});
	}

	private getChartOptions(): any {
		return {
			targetElement: this.chartTargetElement.nativeElement,
			debug: false,
			width: this.chartWidth,
			height: '100%',
			pixelCorrection: true
		};
	}

	private addToGroupsLookup(iconName, singleGroup?) {
		const levels = iconName.split('/'),
			name = levels.pop(),
			group = singleGroup ? levels[0] : levels.join('/'),
			data = this.icon(iconName, name),
			nameTags = name.split('-');

		while (nameTags.length) {
			this.allTags[nameTags.pop()] = true;
		}

		while (levels.length) {
			this.allTags[levels.pop()] = true;
		}

		if (!this.groupsLookup[group]) {
			this.groupsLookup[group] = [];
		}

		this.groupsLookup[group].push(data);
		this.allIcons.push([iconName, data]);
	}

	private icon(path, name) {
		const iconSize = this.cellSize / 2,
			width = this.cellSize * 2;

		return {
			fill: 'none',
			states: {
				hover: {
					fill: 'none'
				}
			},
			outline_width: 0,
			icon: {
				name: path,
				size: iconSize,
				fill: '#6d6d6d',
				yAlignment: 'top'
			},
			tooltip: path,
			label: {
				text: name,
				maxWidth: width,
				textOverflow: 'ellipsis'
			},
			xContentAlignment: 'center',
			width: width,
			events_click: () => {
				const nativeElement = this.selectedIconElement.nativeElement;
				nativeElement.value = path;
				nativeElement.select();
				document.execCommand('copy');
				nativeElement.value = 'Icon name was copied!';
				setTimeout(
					() => {
						nativeElement.value = '';
					},
					1000
					);
			}
		};
	}

	private title(str) {
		return {
			label_text: str,
			label_style_fill: '#6d6d6d',
			position: this.cellSize + ',' + this.cellSize / 2,
			boxVisible: false,
			style_fontWeight: 'bold'
		};
	}

}
