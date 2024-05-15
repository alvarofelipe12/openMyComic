import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ComicService {

    /**
     * Proxy Server to avoid CORS problems in dev,
     * This can't be used in a production env.
     */
  private proxyServerURL = 'https://let-me-apy.vercel.app/cors/';

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
     * @param num number of the comic (optional)
     * @author Alvaro Felipe Garcia Mendez
     * @since 1/11/2020
     */
    public getComicData(num?: number) {
        const comicNumber = num ? String(num) : this.randomNumber(0, 2252);
      const url = this.proxyServerURL + encodeURIComponent(this.xkdcURL + comicNumber + this.jsonURL);
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

    public getRating(comicNumber: number) {
        const search = localStorage.getItem(String(comicNumber));
        if (search) {
            return Number(search);
        } else {
            return null;
        }
    }

    public setRating(comicNumber: number, rating: number) {
        localStorage.setItem(String(comicNumber), String(rating));
    }
}
