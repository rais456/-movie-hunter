import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../user/auth.service";

@Component({
  selector: "mh-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  pageTitle = "InStep Movie Hunter";

  // get isLoggedIn(): boolean {
  //   return this.authService.isLoggedIn();
  // }

  get userName(): string | null {
    if (this.authService.userData) {
      return this.authService.userData.email;
    } else {
      return null;
    }
  }

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {}

  logOut(): void {
    this.authService.logout().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["/welcome"]);
    });
  }
}
