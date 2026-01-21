import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PromptConfig } from '../../models/prompt-config.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromptConfigService {
  private baseUrl = '/api/admin/prompts';

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<{ systemPrompt: string; userPrompt: string }>(
      this.baseUrl
    );
  }

  update(data: any) {
    return this.http.put(this.baseUrl, data);
  }
}
