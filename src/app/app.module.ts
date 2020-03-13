import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestComponent } from './components/guest/guest.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddImageFormComponent } from './components/add-image-form/add-image-form.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { FooterComponent } from './components/footer/footer.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    UserComponent,
    DashboardComponent,
    SearchComponent,
    ForgotPasswordComponent,
    NavigationComponent,
    ImageCardComponent,
    ImageGalleryComponent,
    AddImageFormComponent,
    FileUploadComponent,
    FooterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
