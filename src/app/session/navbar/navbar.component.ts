import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SinginService } from '../services/singin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public singinFormBuilder: FormGroup;
  public messageErrorSession?: string;
  public activeSession: boolean = false;

  constructor(private fb: FormBuilder, private singIn: SinginService) {
    this.singinFormBuilder = this.fb.group({
      username: ['juan@juan.com', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  public get username() {
    return this.singinFormBuilder.get('username');
  }

  public get password() {
    return this.singinFormBuilder.get('password');
  }

  public onSubmitSingin(event: Event): boolean {
    event.preventDefault;
    this.singIn.initSession(this.singinFormBuilder.value).subscribe({
      next: (data: { jwt: string; }) => {
        sessionStorage.setItem('Authorization', 'Bearer ' + data.jwt);
        this.messageErrorSession = undefined;
        this.setActiveSession();
        this.singinFormBuilder.reset();
      },
      error: (error: { status: string; }) => {
        this.messageErrorSession = 'Username or Password invalid!';
        console.warn('Status error: ' + error.status);
        this.setDisableSession();
        this.singinFormBuilder.setValue({username: '', password: ''})
      }
    });
    return false;
  }

  private setActiveSession(): void {
    this.activeSession = true;
  }

  public setDisableSession():void {
    this.activeSession = false;
    sessionStorage.removeItem('Authorization');
  }
}
