import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { AlertpanelComponent } from "../alertpanel/alertpanel.component";
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [NavbarComponent, ReactiveFormsModule]
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerFrom: FormGroup;
  public currentPage: number;
  private sub: Subscription;

  constructor(private readonly _formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _alert: AlertService) {

    this.registerFrom = this.buildFormGroup();
    this.sub = new Subscription();

    //form pagination
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this._alert.obs$.subscribe();

  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
  
  private buildFormGroup(): FormGroup {
    return this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(200)]],
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      socialMedia: [null, [Validators.nullValidator]],
      website: [null, [Validators.nullValidator]],
      country: [null, [Validators.nullValidator]],
      biography: [null, [Validators.minLength(15), Validators.maxLength(250), Validators.nullValidator]],
    });
  }

  public nextPage(): void {
      this.currentPage++;
  }

  public previousPage(): void {
    if(this.currentPage > 0)
      this.currentPage--;
  }

  public validRegisterForm(): void {
    if(this.registerFrom.valid) {
      this.sub = this._userService.register(this.registerFrom.value).subscribe({
        next: (value) => { 
          this._alert.displayAlert("Compte créer avec succès", 'success');
        },
        error: (err) => {
          //TODO: handler errors
          this._alert.displayAlert("Inscription invalide car l'email ou le nom d'utilisateur existe déjà", 'error');
         },
      });
    }
    else {
      this._alert.displayAlert("Un ou plusieurs champs sont invalide", 'error');
    }
    
  }

  public isValidConfirmPassword(): boolean {
    const value = this.registerFrom.value;
    return value.password === value.confirmPassword;
  }

}
