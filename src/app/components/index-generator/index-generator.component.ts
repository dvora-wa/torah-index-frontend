import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexResponse, IndexType } from '../../models';
import { IndexService } from '../../services/index/index.service';

@Component({
  selector: 'index-generator',
  imports: [CommonModule, FormsModule],
  templateUrl: './index-generator.component.html',
  styleUrls: ['./index-generator.component.scss'],
})
export class IndexGeneratorComponent {
  selectedIndexType = signal<IndexType | null>(null);
  selectedFile = signal<File | null>(null);
  fromPage = signal<number | null>(null);
  toPage = signal<number | null>(null);
  isLoading = signal(false);
  generatedIndex = signal<IndexResponse | null>(null);
  errorMessage = signal<string>('');

  isFileSelected = computed(() => this.selectedFile() !== null);
  isReady = computed(() => this.selectedIndexType() !== null && this.isFileSelected());

  indexTypes = [
    { value: IndexType.SOURCES, label: 'מפתח מקורות' },
    { value: IndexType.TOPICS, label: 'מפתח נושאים' },
    { value: IndexType.PERSONS, label: 'מפתח אישים' },
  ];

  constructor(private indexService: IndexService) { }

  onIndexTypeChange(type: IndexType): void {
    this.selectedIndexType.set(type);
    this.errorMessage.set('');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      const file = files[0];
      if (file.type !== 'application/pdf') {
        this.errorMessage.set('אנא בחר קובץ PDF');
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        this.errorMessage.set('גודל הקובץ חייב להיות קטן מ-50MB');
        return;
      }
      this.selectedFile.set(file);
      this.errorMessage.set('');
    }
  }

  generateIndex(): void {
    if (!this.isReady()) return;

    const from = this.fromPage();
    const to = this.toPage();

    if (from !== null && to !== null && from > to) {
      this.errorMessage.set('עמוד התחלה לא יכול להיות גדול מעמוד סיום');
      return;
    }

    const indexType = this.selectedIndexType()!;
    const file = this.selectedFile()!;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.indexService.generateIndex(
      file,
      indexType,
      this.fromPage(),
      this.toPage()
    ).subscribe({
      next: (response: IndexResponse) => {
        this.generatedIndex.set(response);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        this.errorMessage.set(error.message || 'שגיאה בהפקת המפתח');
        this.isLoading.set(false);
      },
    });
  }

  downloadAsWord(): void {
    const response = this.generatedIndex();
    if (!response) return;

    this.indexService.exportToWord(response.data.entries, this.selectedIndexType()!).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `index-${this.selectedIndexType()}-${Date.now()}.docx`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.errorMessage.set('שגיאה בהורדת הקובץ');
      },
    });
  }

  reset(): void {
    this.selectedIndexType.set(null);
    this.selectedFile.set(null);
    this.generatedIndex.set(null);
    this.errorMessage.set('');
  }

  copyToClipboard(): void {
    const response = this.generatedIndex();
    if (!response) return;

    const text = response.data.entries
      .map(e => `${e.term} (${e.pageNumbers.join(', ')})`)
      .join('\n');

    navigator.clipboard.writeText(text);
  }
}
