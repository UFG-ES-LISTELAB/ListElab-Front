import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsCardComponent } from './lists-card.component';

describe('ListsCardComponent', () => {
  let component: ListsCardComponent;
  let fixture: ComponentFixture<ListsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
