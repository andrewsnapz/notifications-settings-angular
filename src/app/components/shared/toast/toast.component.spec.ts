import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastDebugEl: DebugElement;
  let toastEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastDebugEl = fixture.debugElement;
    toastEl = toastDebugEl.nativeElement;

    fixture.componentRef.setInput('type', 'success');
    fixture.componentRef.setInput('title', 'test-toast-title');
    fixture.componentRef.setInput('message', 'test-toast-message');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct toast title', () => {
    const toast = toastDebugEl.query(By.css('.toast'));
    const toastTitle = toast.query(
      By.css('.toast-header.toast-header-success')
    );
    expect(toastTitle.nativeElement.textContent.trim()).toBe(component.title());
  });

  it('should display the correct toast message', () => {
    const toast = toastDebugEl.query(By.css('.toast'));
    const toastMessage = toast.query(By.css('.toast-body.toast-body-success'));
    expect(toastMessage.nativeElement.textContent.trim()).toBe(
      component.message()
    );
  });
});
