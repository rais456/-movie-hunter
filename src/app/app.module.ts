import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { MovieData } from "./movies/movie-data";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { ShellComponent } from "./home/shell.component";
import { MenuComponent } from "./home/menu.component";
import { WelcomeComponent } from "./home/welcome.component";
import { PageNotFoundComponent } from "./home/page-not-found.component";

/* Feature Modules */
import { UserModule } from "./user/user.module";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "mytestapp"),
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule, // Only required for storage features
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(MovieData, {
      delay: 1000,
      dataEncapsulation: false,
    }),
    UserModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    ShellComponent,
    MenuComponent,
    WelcomeComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
