import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromptConfigService {
  private baseUrl = `${environment.apiUrl}/api/admin/prompts`;

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  update(data: any): Observable<void> {
    return this.http.put<void>(this.baseUrl, data);
  }
}
