import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerComponent } from './pages/viewer/viewer.component';
import { ComicService } from './providers/comic.service';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        ViewerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RatingModule.forRoot(),
        FormsModule
    ],
    providers: [
        ComicService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
