import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * ApiService provides typed wrappers around HttpClient methods.
 */
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Perform a GET request to the given endpoint.
   */
  get<T>(endpoint: string, params?: Record<string, unknown>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params: httpParams });
  }

  /**
   * Perform a POST request.
   */
  post<T>(endpoint: string, data: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data);
  }

  /**
   * Perform a PUT request.
   */
  put<T>(endpoint: string, data: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data);
  }

  /**
   * Perform a DELETE request.
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }

  /**
   * Perform a PATCH request.
   */
  patch<T>(endpoint: string, data: unknown): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, data);
  }

  /**
   * Placeholder for setting common HTTP headers.
   */
  setHeaders(headers: { [key: string]: string }): void {
    // Implementation depends on authentication strategy
  }
}
