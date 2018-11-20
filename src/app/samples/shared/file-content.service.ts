import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class FileContentService {
	constructor(private http: HttpClient) {
	}

	getFileContent(url: string): Observable<string> {
		return this.http.get(url, { responseType: 'text' }).pipe(
			catchError(this.handleError(`getFileContent url='${url}'`, null))
		);
	}

	protected handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.log(`${operation} failed: ${error}`);
			return of(result as T);
		};
	}
}
