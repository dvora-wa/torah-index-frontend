// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class Index {

// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndexEntry, IndexResponse, IndexType } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class IndexService {

  constructor(private http: HttpClient) { }

  generateIndex(file: File, type: IndexType): Observable<IndexResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('indexType', type.toString());

    return this.http.post<IndexResponse>('http://localhost:3000/api/index/generate', formData);
  }

  exportToWord(entries: IndexEntry[], type: IndexType): Observable<Blob> {
    return this.http.post('http://localhost:3000/api/index/export-word', { entries, type }, { responseType: 'blob' });
  }
}
