import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { TestButtonComponent } from './test-button-component/test-button.component';

describe('ButtonComponent', () => {
  let component: TestButtonComponent;
  let fixture: ComponentFixture<TestButtonComponent>;
  let testButtonDebugEl: DebugElement;
  let testButtonEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestButtonComponent);
    component = fixture.componentInstance;
    testButtonDebugEl = fixture.debugElement;
    testButtonEl = testButtonDebugEl.nativeElement;
    fixture.detectChanges();
  });

  it('should render whatever is passed in as a child', () => {
    const testButton = testButtonEl.querySelector('button');
    const testButtonText = testButton?.innerText;
    expect(testButton).toBeTruthy();
    expect(testButtonText).toBe('test button');
  });
});
