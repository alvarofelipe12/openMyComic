import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/providers/comic.service';
import { ComicModel } from 'src/app/models/comic.model';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.sass']
})
export class ViewerComponent implements OnInit {

    /**
     * Store the comic object
     */
    public comic: ComicModel;

    /**
     * Max number to rate the comic
     */
    public max: number;

    /**
     * The actual rate (cumulative) of the comic
     */
    public rate: number;

    /**
     * Property for rating component (bootstrap)
     */
    public isReadonly: boolean;

    /**
     * hovered number
     */
    public overStar: number;

    constructor(
        private comicService: ComicService
    ) {
        this.comic = new ComicModel();
        this.isReadonly = false;
        this.max = 10;
    }

    ngOnInit() {
        this.getComic();
    }

    /**
     * Get a random comic
     * @param num number of the comic (optional)
     * @author Alvaro Felipe Garcia Mendez
     * @since 1/11/2020
     */
    private getComic(num?: number) {
        this.comicService.getComicData(num)
            .pipe(
                finalize(() => {
                    // once we have the number of the comic
                    // we must check if there's a rating
                    this.rate = this.comicService.getRating(this.comic.num);
                })
            )
            .subscribe((data: ComicModel) => {
                if (data) {
                    this.comic = data;
                }
            });
    }

    /**
     * Controls the navigation through all the comics
     * @param argument allows to know in wich way should navigate
     * @author Alvaro Felipe Garcia Mendez
     * @since 1/11/2020
     */
    public navComic(argument: string) {
        let comicNumber = 1;
        if (argument === 'next') {
            comicNumber = this.comic.num + 1;
        } else if (argument === 'prev') {
            comicNumber = this.comic.num - 1;
        } else if (argument === 'last') {
            comicNumber = 2252;
        }
        this.getComic(comicNumber);
    }

    /**
     * Event of hovering over the rating element
     * @param value hovered value
     * @author Alvaro Felipe Garcia Mendez
     * @since 1/11/2020
     */
    public hoveringOver(value: number): void {
        this.overStar = value;
    }

    /**
     * reset hovered number
     * @author Alvaro Felipe Garcia Mendez
     * @since 1/11/2020
     */
    public resetStar(): void {
        this.overStar = void 0;
    }

    /**
     * Set the rating when a star is clicked
     * @author Alvaro Felipe Garcia Mendez
     * @since 1/11/2020
     */
    public setRating() {
        this.comicService.setRating(this.comic.num, this.rate);
    }
}
