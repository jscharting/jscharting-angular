import {Injectable, NgZone} from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class JSChartingService {
	private JSC: any;

	constructor(private zone: NgZone) {
		this.JSC = window['JSC'];
	}

	chart(options: any, callback?: (chart: any) => void): any {
		return new this.JSC.Chart(options, callback);
	}

	fetch(input: any, init?: any): Promise<any> {
		return this.zone.runOutsideAngular(() => fetch(input, init));
	}

	formatDate(value: any, formatStr?: string, culture?: any): string {
		return this.zone.runOutsideAngular(() => this.JSC.formatDate(value, formatStr, culture));
	}

	formatNumber(value: any, formatStr?: string, culture?: any): string {
		return this.zone.runOutsideAngular(() => this.JSC.formatNumber(value, formatStr, culture));
	}

	formatString(value: any, formatStr?: string, culture?: any): string {
		return this.zone.runOutsideAngular(() => this.JSC.formatString(value, formatStr, culture));
	}

	parseCsv(text: string, options?: any): any {
		return this.JSC.parseCsv(text, options);
	}

	csv2Json(csvText: string, options?: any) {
		return this.JSC.csv2Json(csvText, options);
	}

	tsv2Json(tsvText: string, options?: any): any {
		return this.JSC.tsv2Json(tsvText, options);
	}

	dsv2Json(dsvText: string, options?: any): any {
		return this.JSC.dsv2Json(dsvText, options);
	}

	json2Csv(items: any, options?: any): any {
		return this.JSC.json2Csv(items, options);
	}

	json2Tsv(items: any, options?: any): any {
		return this.JSC.json2Tsv(items, options);
	}

	json2Dsv(items: any, options?: any): any {
		return this.JSC.json2Dsv(items, options);
	}
}
