import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndexEntry, IndexResponse, IndexType } from '../../models/index.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  generateIndex(
    file: File,
    type: IndexType,
    fromPage?: number | null,
    toPage?: number | null
  ): Observable<IndexResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('indexType', type.toString());
    if (fromPage != null) formData.append('fromPage', fromPage.toString());
    if (toPage != null) formData.append('toPage', toPage.toString());

    return this.http.post<IndexResponse>(`${this.apiUrl}/api/index/generate`, formData);
  }

  exportToWord(entries: IndexEntry[], type: IndexType): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/api/index/export-word`, { entries, type }, { responseType: 'blob' });
  }
}
