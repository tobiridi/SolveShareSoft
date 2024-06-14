import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSoftwarelistComponent } from './delete-softwarelist.component';

describe('DeleteSoftwarelistComponent', () => {
  let component: DeleteSoftwarelistComponent;
  let fixture: ComponentFixture<DeleteSoftwarelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSoftwarelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteSoftwarelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
