import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySoftListsComponent } from './my-soft-lists.component';

describe('MySoftListsComponent', () => {
  let component: MySoftListsComponent;
  let fixture: ComponentFixture<MySoftListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySoftListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySoftListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
