import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedin : boolean = false;

  constructor(private userAuthService: UserAuthService,
     private router: Router,
     public userService: UserService
    ){

  }
  ngOnInit(): void {
   
  }

  public isLoggedIn(){
    this.isLoggedin = this.userAuthService.isLoggedIn()? true: false;
    return this.isLoggedin;
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }


}

