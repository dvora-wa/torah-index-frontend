import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkSettingsComponent } from './chunk-settings.component';

describe('ChunkSettingsComponentComponentComponent', () => {
  let component: ChunkSettingsComponent;
  let fixture: ComponentFixture<ChunkSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChunkSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChunkSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
