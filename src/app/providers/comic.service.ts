import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ComicService {

    /**
     * Proxy Server to avoid CORS problems
     */
    private proxyServerURL = 'https://cors-anywhere.herokuapp.com/';

    /**
     * Base url for xkdc
     */
    private xkdcURL = 'https://xkcd.com/';

    /**
     * complement url for xkdc
     */
    private jsonURL = '/info.0.json';

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Get a ramdomized comic
     * @author Alvaro Felipe Garcia Mendez
     * @since 1/11/2020
     */
    public getComicData() {
        const url = this.proxyServerURL + this.xkdcURL + this.randomNumber(0, 2252) + this.jsonURL;
        return this.http.get(url);
    }

    /**
     * Generate a random number between range
     * @param min minimal number
     * @param max maximum number
     * @author Alvaro Felipe Garcia Mendez
     * @since 1/11/2020
     */
    private randomNumber(min: number, max: number): string {
        return String(Math.floor(Math.random() * (max - min + 1)) + min);
    }

}
