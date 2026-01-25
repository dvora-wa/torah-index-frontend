import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { PromptEditorComponent } from '../pages/prompt-editor/prompt-editor.component';
import { ChunkSettingsComponent } from '../pages/chunk-settings/chunk-settings.component';
import { PromptConfigService } from '../../services/prompt-config/prompt-config.service';

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
  private promptConfigService = inject(PromptConfigService);
  form = this.fb.group({
    prompt: this.fb.group({
      basePrompt: this.fb.control<string[]>([]),
      sourcesPrompt: this.fb.control<string[]>([]),
      topicsPrompt: this.fb.control<string[]>([]),
      personsPrompt: this.fb.control<string[]>([])
    }),
    chunks: this.fb.group({
      chunkSize: this.fb.control<number>(10),
      overlapPages: this.fb.control<number>(1)
    })
  });

  ngOnInit() {
    this.promptConfigService.get().subscribe(config => {
      this.form.patchValue({
        prompt: {
          basePrompt: config.basePrompt,
          sourcesPrompt: config.sourcesPrompt,
          topicsPrompt: config.topicsPrompt,
          personsPrompt: config.personsPrompt,
        },
        chunks: {
          chunkSize: config.chunkSize,
          overlapPages: config.overlapPages,
        }
      });
    });
  }

  get promptForm(): FormGroup {
    return this.form.get('prompt') as FormGroup;
  }

  get chunksForm(): FormGroup {
    return this.form.get('chunks') as FormGroup;
  }

  save() {
    if (this.form.invalid) return;

    const value = this.form.value;

    const payload = {
      ...value.prompt,
      ...value.chunks
    };

    this.promptConfigService.update(payload).subscribe({
      next: () => {
        this.snackbar.open('שינויים נשמרו בהצלחה!', 'סגור', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackbar.open('שגיאה בשמירה', 'סגור', {
          duration: 3000,
        });
      }
    });
  }

}
