import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  loggedIn: boolean = false;
  isHomePage: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.authService.user.subscribe( user =>
      this.loggedIn = user !== null
    );
    this.route.firstChild?.url.subscribe(segments => {
      this.isHomePage = segments[0]?.path === 'home';
    });
  }
}