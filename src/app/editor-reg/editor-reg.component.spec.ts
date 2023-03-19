import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorRegComponent } from './editor-reg.component';

describe('EditorRegComponent', () => {
  let component: EditorRegComponent;
  let fixture: ComponentFixture<EditorRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
