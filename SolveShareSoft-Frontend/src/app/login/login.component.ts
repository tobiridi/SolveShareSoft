import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AlertService } from '../services/alert.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup
  private sub: Subscription;

  constructor(
    private readonly _alert: AlertService,
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _router: Router) {

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(200)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    });

    this.sub = new Subscription();
  }
  
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public validLoginForm(): void {
    if(this.loginForm.valid) {
      this.sub = this._userService.login(this.loginForm.value).subscribe({
        next: (value) => {
          //redirect user to home page
          this._router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this._alert.displayAlert("Email ou mot de passe incorrecte", 'error');
        },
      })
    }
    else {
      this._alert.displayAlert("Le formulaire n'est pas valide", 'error');
    }
    
  }

}
