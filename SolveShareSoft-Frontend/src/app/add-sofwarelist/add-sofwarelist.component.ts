import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';
import { Category } from '../shared/category';

@Component({
  selector: 'app-add-sofwarelist',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-sofwarelist.component.html',
  styleUrl: './add-sofwarelist.component.scss'
})
export class AddSofwarelistComponent implements OnInit, OnDestroy {
  public softListForm: FormGroup
  private sub: Subscription;
  public allCategories: Category[];

  constructor(private readonly _alert: AlertService, private readonly _formBuilder: FormBuilder) {
    this.sub = new Subscription();
    this.allCategories = [];

    this.softListForm = this._formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      description: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      isPublic: [false, [Validators.required]],
      category: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    //TODO: add catergory service
    this.allCategories = [
      {categoryId: 1, name: 'cat 1'},
      {categoryId: 2, name: 'cat 2'},
      {categoryId: 3, name: 'cat 3'},
    ];
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  public validForm(): void {
    console.log(this.softListForm.value);
  }

}
