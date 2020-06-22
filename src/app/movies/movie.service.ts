import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of, throwError } from "rxjs";
import { catchError, tap, map, flatMap } from "rxjs/operators";

import { Movie } from "./movie";
import {
  AngularFirestore,
  DocumentChangeAction,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private moviesUrl = "api/movies";

  constructor(private http: HttpClient, private db: AngularFirestore) {}

  getMovies() {
    // return this.http.get<Movie[]>(this.moviesUrl)
    //   .pipe(
    //     tap(data => console.log(JSON.stringify(data))),
    //     catchError(this.handleError)
    //   );

    // return new Promise<any>((resolve, reject) => {
    //   this.db.collection('/movieDetails').snapshotChanges()
    //   .subscribe(snapshots => {
    //     resolve(snapshots)
    //   })
    // });
    return this.db
      .collection<Movie>("/movieDetails")
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getMovie(id: string) {
    console.log(id);
    if (id === "0") {
      return of(this.initializeMovie());
    }
    // const url = `${this.moviesUrl}/${id}`;
    // return this.http.get<Movie>(url)
    //   .pipe(
    //     tap(data => console.log('Data: ' + JSON.stringify(data))),
    //     catchError(this.handleError)
    //   );
    // return this.db
    // .collection<Movie>("movieDetails", (ref) =>
    //   ref.where("id", "==", id).limit(1)
    // )
    // .valueChanges()
    // .pipe(flatMap((movie) => movie));

    return this.db
      .collection<Movie>("movieDetails")
      .doc<Movie>(id)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          const data = actions.payload.data();
          const id = actions.payload.id;
          return { id, ...data };
        })
      );
  }

  saveMovie(movie: Movie) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    if ("id" in movie) {
      return this.db.collection("movieDetails").doc(movie.id).update(movie);
    }
    return this.createMovie(movie);
  }

  deleteMovie(id: string) {
    // const headers = new HttpHeaders({ "Content-Type": "application/json" });

    // const url = `${this.moviesUrl}/${id}`;
    // return this.http
    //   .delete<Movie>(url, { headers })
    //   .pipe(
    //     tap((data) => console.log("deleteMovie: " + JSON.stringify(data))),
    //     catchError(this.handleError)
    //   );
    return this.db.collection("movieDetails").doc(id).delete();
  }

  private createMovie(movie: Movie): Promise<any> {
    // movie.id = null;
    // return this.http.post<Movie>(this.moviesUrl, movie, { headers })
    //   .pipe(
    //     tap(data => console.log('createMovie: ' + JSON.stringify(data))),
    //     catchError(this.handleError)
    //   );
    return this.db.collection("movieDetails").add(movie);
    // .then(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => reject(err)
    // );
  }

  private updateMovie(id: number, headers: HttpHeaders) {
    // const url = `${this.moviesUrl}/${movie.id}`;
    // return this.http
    //   .put<Movie>(url, movie, { headers })
    //   .pipe(
    //     tap((data) => console.log("updateMovie: " + movie.id)),
    //     catchError(this.handleError)
    //   );
    // delete movie.id;
    return this.db
      .collection<Movie>("movieDetails", (ref) =>
        ref.where("id", "==", id).limit(1)
      )
      .valueChanges()
      .pipe(flatMap((movie) => movie));
    // return this.db.doc('movieDetails/' + movie.id).update(movie);
  }

  private initializeMovie(): Movie {
    // Return an initialized object
    return {
      approvalRating: null,
      description: "",
      director: "",
      imageurl: "",
      mpaa: "",
      price: null,
      releaseDate: "",
      starRating: null,
      title: "",
      category: "",
      tags: [],
    };
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
