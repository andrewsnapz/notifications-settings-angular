import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToggleComponent } from './toggle.component';

function setDefaultToggleComponentState(
  fixture: ComponentFixture<ToggleComponent>
) {
  fixture.componentRef.setInput('id', 'test-id');
  fixture.componentRef.setInput('labelActiveText', 'on');
  fixture.componentRef.setInput('labelDeactiveText', 'off');
  fixture.componentRef.setInput('isLabelHidden', false);
  fixture.componentRef.setInput('defaultToggled', false);
  fixture.componentRef.setInput('isDisabled', false);
}

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;
  let toggleDebugEl: DebugElement;
  let toggleEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    toggleDebugEl = fixture.debugElement;
    toggleEl = toggleDebugEl.nativeElement;

    setDefaultToggleComponentState(fixture);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // https://www.w3.org/WAI/ARIA/apg/patterns/switch/
  describe('toggle accessibility tests', () => {
    describe('keyboard interaction', () => {
      it("when the toggle is focused, hitting 'enter' toggles", fakeAsync(() => {
        // select toggleButton, get it's initial aria-checked value
        const toggleButton = toggleEl.querySelector('button');
        expect(toggleButton?.getAttribute('aria-checked')).toBe('false');

        // focus on the button
        toggleButton?.focus();
        expect(document.activeElement).toBe(toggleButton);

        // spy onToggleChange component method:
        spyOn(component, 'onToggleChange').and.callThrough();

        // while the element is focused, hit the 'enter' key
        const enterKeyEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          keyCode: 13,
        });
        toggleButton?.dispatchEvent(enterKeyEvent);
        tick();
        fixture.detectChanges();

        // expect onToggleChange to be invoked
        expect(component.onToggleChange).toHaveBeenCalled();

        // see the toggle button's new aria-checked value
        expect(toggleButton?.getAttribute('aria-checked')).toBe('true');
      }));

      it("when the toggle is focused, hitting 'space' toggles", fakeAsync(() => {
        // select toggleButton, get it's initial aria-checked value
        const toggleButton = toggleEl.querySelector('button');
        expect(toggleButton?.getAttribute('aria-checked')).toBe('false');

        // focus on the button
        toggleButton?.focus();
        expect(document.activeElement).toBe(toggleButton);

        // spy onToggleChange component method:
        spyOn(component, 'onToggleChange').and.callThrough();

        // while the element is focused, hit the 'enter' key
        const spaceKeydownEvent = new KeyboardEvent('keydown', {
          key: ' ', // The printable representation of the key
          code: 'Space', // The physical key on the keyboard
          bubbles: true, // Allows the event to bubble up the DOM tree
          cancelable: true, // Allows the event to be canceled
        });
        toggleButton?.dispatchEvent(spaceKeydownEvent);
        tick();
        fixture.detectChanges();

        // expect onToggleChange to be invoked
        expect(component.onToggleChange).toHaveBeenCalled();

        // see the toggle button's new aria-checked value
        expect(toggleButton?.getAttribute('aria-checked')).toBe('true');
      }));
    });

    // describe('wai-roles, states, and properties', () => {});
  });

  // it("toggle should be disabled if passed the disabled property", () => {})
});
