import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'chunk-settings',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './chunk-settings.component.html',
  styleUrl: './chunk-settings.component.scss',
})
export class ChunkSettingsComponent {
  @Input() formGroup!: FormGroup;
}
