import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ScriptService {
	insertScriptCode(code: string) {
		const script = document.createElement('script');
		script.innerHTML = code;
		document.head.appendChild(script);
	}
}
