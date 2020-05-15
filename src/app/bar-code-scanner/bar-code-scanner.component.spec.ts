import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCodeScannerComponent } from './bar-code-scanner.component';

describe('BarCodeScannerComponent', () => {
  let component: BarCodeScannerComponent;
  let fixture: ComponentFixture<BarCodeScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarCodeScannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarCodeScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
