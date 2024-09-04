import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [NavbarComponent, ReactiveFormsModule]
})
export class RegisterComponent implements OnDestroy {
  public registerFrom: FormGroup;
  public currentPage: number;
  private sub: Subscription;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _alert: AlertService) {

    this.registerFrom = this.buildFormGroup();

    //form pagination
    this.currentPage = 1;

    this.sub = new Subscription();
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
  
  private buildFormGroup(): FormGroup {
    return this._formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(200)]],
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
      const registerSub: Subscription = this._userService.register(this.registerFrom.value).subscribe({
        next: (value: any) => { 
          this._alert.displayAlert("Compte créer avec succès", 'success');
        },
        error: (err) => {
          //TODO: handler errors
          this._alert.displayAlert("Inscription invalide car l'email ou le nom d'utilisateur existe déjà", 'error');
         },
      });

      this.sub.add(registerSub);
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
