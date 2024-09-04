import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftListDetailsComponent } from './soft-list-details.component';

describe('SoftListDetailsComponent', () => {
  let component: SoftListDetailsComponent;
  let fixture: ComponentFixture<SoftListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftListDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoftListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
