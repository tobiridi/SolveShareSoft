import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';
import { Category } from '../shared/category';
import { CategoryService } from '../services/category.service';
import { SoftwarelistService } from '../services/softwarelist.service';

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

  constructor(private readonly _alert: AlertService,
    private readonly _formBuilder: FormBuilder,
    private readonly _catService: CategoryService,
    private readonly _softList: SoftwarelistService) {

    this.sub = new Subscription();
    this.allCategories = [];

    this.softListForm = this._formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      description: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      isPublic: [false, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.allCategories = [];
    const allCatSub: Subscription = this._catService.getAllCategories().subscribe({
      next: (value: Category[]) => {
        this.allCategories = value;
      },
      error: (err) => {
        console.error(err);
        this._alert.displayAlert('Erreur lors du chargement des catégories', 'error');
      },
    });

    this.sub.add(allCatSub);
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  public createSoftList(): void {
    if (this.softListForm.valid) {
      const softListSub: Subscription = this._softList.createSoftList(this.softListForm.value).subscribe({
        next: (value: any) => {
          this._alert.displayAlert("Liste créer avec succès", 'success');
        },
        error: (err) => {
          console.error(err);
          this._alert.displayAlert("Erreur lors de la création de la liste", 'error');
        },
      });

      this.sub.add(softListSub);
    }
    else {
      this._alert.displayAlert("Le formulaire n'est pas valide", 'error');
    }
  }

}
