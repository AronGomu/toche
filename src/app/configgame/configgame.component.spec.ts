import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiggameComponent } from './configgame.component';

describe('ConfiggameComponent', () => {
  let component: ConfiggameComponent;
  let fixture: ComponentFixture<ConfiggameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiggameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiggameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
