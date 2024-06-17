import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';
import { SoftwareService } from '../services/software.service';
import { SoftwareList } from '../shared/software-list';

@Component({
  selector: 'app-add-software',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-software.component.html',
  styleUrl: './add-software.component.scss'
})
export class AddSoftwareComponent implements OnDestroy {
  public softForm: FormGroup;
  private sub: Subscription;
  @Output()
  public visibilityEmitter: EventEmitter<boolean>;
  @Input()
  public currentSoftList?: SoftwareList;

  constructor(private readonly _builder: FormBuilder, private readonly _alert: AlertService, private readonly _soft: SoftwareService) {
    this.softForm = this._builder.group({
      name: [null, [Validators.minLength(3), Validators.maxLength(100), Validators.required]],
      description: [null, [Validators.minLength(5), Validators.maxLength(250)]],
      version: [null, [Validators.minLength(1), Validators.maxLength(50), Validators.required]],
      size: [null, [Validators.min(1), Validators.max(9999), Validators.required]],
      sizeUnit: [null, [Validators.minLength(1), Validators.maxLength(2), Validators.required]],
      lang: [null, [Validators.minLength(2), Validators.maxLength(50), Validators.required]],
      link: [null, [Validators.minLength(30), Validators.maxLength(500), Validators.required]],
    });

    this.visibilityEmitter = new EventEmitter<boolean>();
    this.sub = new Subscription();
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  public createSoft(): void {
    if(this.softForm.valid){
      const body: any = {};
      Object.assign(body, this.softForm.value);
      body.softwareListId = this.currentSoftList?.softwareListId;
      const addSoftSub: Subscription = this._soft.createSoft(body).subscribe({
        next: (value: any) => {
          console.log(value);
          if(value.status === 201) {
            this._alert.displayAlert("Software créer", 'success');
            this.visibilityEmitter.emit(false);
          }
        },
        error: (err) => {
          console.error(err);
        }
      });

      this.sub.add(addSoftSub);
    }
    else {
      this._alert.displayAlert("Le formulaire n'est pas valide", 'error');
    }
    
  }

  public cancelForm(): void {
    this.visibilityEmitter.emit(false);
  }

}
