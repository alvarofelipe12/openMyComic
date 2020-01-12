import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/providers/comic.service';
import { ComicModel } from 'src/app/models/comic.model';

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.sass']
})
export class ViewerComponent implements OnInit {

    public comic: ComicModel;

    max: number = 10;
    rate: number = 7;
    isReadonly: boolean = false;

    constructor(
        private comicService: ComicService
    ) {
        this.comic = new ComicModel();
    }

    ngOnInit() {
        this.getComic();
    }

    private getComic() {
        this.comicService.getComicData().subscribe((data: ComicModel) => {
            if (data) {
                this.comic = data;
            }
        });
    }
}
