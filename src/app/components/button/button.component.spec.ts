import { ChangeDetectorRef } from '@angular/core';
import {
    ComponentFixture, TestBed, waitForAsync
} from '@angular/core/testing';
import {
    interval,
    of,
    Subject,
    Subscription,
    takeUntil,
    tap
} from 'rxjs';
import { ModalTypes } from 'src/app/core/enum';
import { MenuButtonsStateService } from 'src/app/core/state/menu-buttons.service';
import { ButtonComponent } from './button.component';

// describe groups to remain beforeEach containing only stuff needed for the specific context
describe('ButtonComponent component creation', () => {
  // object holding component in testing environment
  // provides access to component instance, the template, and the DOM elements, allowing interacting with the component and its inputs and outputs to test its behavior
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(waitForAsync(() => {
    // testing context includes all core instances needed for testing
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', waitForAsync(() => {
    fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
    expect(component.ngOnInit).toBeTruthy();
  }));
});

describe('ButtonComponent and button class depending on change detection', () => {
  // DIs which code execution come across during testing (like when then mocking)
  let stateSpyObj: jasmine.SpyObj<MenuButtonsStateService>;
  let cdRefSpyObj: jasmine.SpyObj<ChangeDetectorRef>;

  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(waitForAsync(() => {
    // spy for service [method] used during testing
    stateSpyObj = jasmine.createSpyObj('MenuButtonsStateService', [
      'changesOnMenuButtons$',
    ]);
    cdRefSpyObj = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges$']);

    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      providers: [
        // when execution faces particular service and it's changesOnMenuButtons$ subject use supplied value
        {
          provide: MenuButtonsStateService,
          useValue: { changesOnMenuButtons$: of(true) },
        },
        { provide: ChangeDetectorRef, useValue: cdRefSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  }));

  it('change detection in oninit updates the button class within on init', () => {
    const dom = fixture.nativeElement;
    const getByClass = (className: string) => dom.querySelector(className);

    const onInit = spyOn(component, 'ngOnInit').and.callThrough();

    expect(onInit).not.toHaveBeenCalled();
    // undefined
    expect(component.state.activeMenuBtn).toBeFalsy();

    // input
    component.target = ModalTypes.ABOUT;

    // activeMenuBtn !== target
    expect(getByClass('.active')).toBeFalsy();

    component.state.activeMenuBtn = ModalTypes.ABOUT;

    // target === activeMenuBtn (subject$) -> onPush -> no change detection run yet -> should be called within onInit
    component.ngOnInit();

    expect(onInit).toHaveBeenCalled();

    // proof change detection was called and 'active' class was applied to the button
    expect(getByClass('.active')).toBeTruthy();
  });

  it('proof that if change detection in oninit would not be called the button class would not be changed', () => {
    const template = fixture.nativeElement;
    const getByClass = (className: string) => template.querySelector(className);

    const onInit = spyOn(component, 'ngOnInit').and.callThrough();

    expect(onInit).not.toHaveBeenCalled();
    // undefined
    expect(component.state.activeMenuBtn).toBeFalsy();

    // input
    component.target = ModalTypes.ABOUT;

    // activeMenuBtn !== target
    expect(getByClass('.active')).toBeFalsy();

    component.ngOnInit();

    // target === activeMenuBtn (subject$) -> onPush -> no change detection run
    component.state.activeMenuBtn = ModalTypes.ABOUT;

    expect(onInit).toHaveBeenCalled();

    // proof 'active' class was applied to the button because change detection was not called
    expect(getByClass('.active')).toBeFalsy();
  });
});

describe('ButtonComponent and subscription after destroy', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  }));

  it('subject next and complete causes unsubscribe calls', () => {
    const onDestroy = spyOn(component, 'ngOnDestroy').and.callThrough();
    const onInit = spyOn(component, 'ngOnInit').and.callThrough();

    spyOn(Subscription.prototype, 'unsubscribe');

    const unsubscribeSubject = component['unsubscribe'];

    component.ngOnInit();
    expect(onInit).toHaveBeenCalled();

    component['ngOnDestroy']();

    // next and complete methods on subject triggers unsubscribe
    expect(Subscription.prototype.unsubscribe).toHaveBeenCalledTimes(2);

    expect(onDestroy).toHaveBeenCalled();

    // even both, unsubscribe & unsubscribe$ have closed property false, they were just stopped after component destruction,
    // it will not cause a memory leak, because there was never a subscribe called on them
    expect(unsubscribeSubject.closed).toBeFalsy();
  });

  it('should unsubscribe using combination of subject & subject as observable & takeUntil', waitForAsync(() => {
    const subj = new Subject<void>();
    const subj$ = subj.asObservable();

    const $ = interval(1000)
      .pipe(
        tap((i: number) => console.log(`i: ${i}`)),
        takeUntil(subj$)
      )
      .subscribe();

    setTimeout(() => {
      subj.next();
      // waitForAsync ensures it will wait on expectation and toss it out from timeout
      // otherwise no expectation would be displayed on the tests summary for this one
      expect($.closed).toBeTruthy();
    }, 4000);
  }));
});
