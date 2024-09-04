import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertpanelComponent } from './alertpanel.component';

describe('AlertpanelComponent', () => {
  let component: AlertpanelComponent;
  let fixture: ComponentFixture<AlertpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertpanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
