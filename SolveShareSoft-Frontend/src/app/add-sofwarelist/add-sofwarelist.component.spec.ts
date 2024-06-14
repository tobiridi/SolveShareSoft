import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSofwarelistComponent } from './add-sofwarelist.component';

describe('AddSofwarelistComponent', () => {
  let component: AddSofwarelistComponent;
  let fixture: ComponentFixture<AddSofwarelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSofwarelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSofwarelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
