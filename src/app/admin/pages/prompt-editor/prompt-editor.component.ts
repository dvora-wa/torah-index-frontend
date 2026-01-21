import { Component, inject, Input, OnInit } from '@angular/core';
import { PromptConfig } from '../../../models/prompt-config.model';
import { PromptConfigService } from '../../../services/prompt-config/prompt-config.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prompt-editor',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './prompt-editor.component.html',
  styleUrl: './prompt-editor.component.scss',
})
export class PromptEditorComponent {
  @Input() formGroup!: FormGroup; // מקבל מההורה

}
