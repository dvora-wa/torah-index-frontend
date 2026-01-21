import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { PromptEditorComponent } from '../pages/prompt-editor/prompt-editor.component';
import { ChunkSettingsComponent } from '../pages/chunk-settings/chunk-settings.component';

@Component({
  selector: 'admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PromptEditorComponent,
    ChunkSettingsComponent
  ]
})
export class AdminFormComponent {
  private fb = inject(FormBuilder);
  private snackbar = inject(MatSnackBar);
  form = this.fb.group({
    prompt: this.fb.group({
      basicPrompt: ['', [Validators.minLength(20)]],
      sources: [''],
      topics: [''],
      personal: ['']
    }),
    chunks: this.fb.group({
      chunkSize: [''],
      overlap: ['']
    })
  });

  get promptForm(): FormGroup {
    return this.form.get('prompt') as FormGroup;
  }

  get chunksForm(): FormGroup {
    return this.form.get('chunks') as FormGroup;
  }

  save() {
    if (this.form.invalid) return;

    console.log('Form Value:', this.form.value);

    this.snackbar.open('שינויים נשמרו בהצלחה!', 'סגור', { duration: 3000 });
  }
}
