import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubButtonComponent } from './sub-button.component';

describe('SubButtonComponent', () => {
  let component: SubButtonComponent;
  let fixture: ComponentFixture<SubButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
