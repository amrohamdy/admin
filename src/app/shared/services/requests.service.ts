import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../core/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor (private http: HttpClient,
  ) { }

  get = (url: string) => {
    return this.http.get(environment.apiBaseUrl + '/api/' + url);
  };

  export = (url: string) => {
    return this.http.get(environment.apiBaseUrl + '/api/' + url, {
      responseType: 'blob',
    });
  };

  PostExport = (url: string, obj: any) => {
    return this.http.post(environment.apiBaseUrl + '/api/' + url, obj, {
      responseType: 'blob',
    });
  };

  post = (url: string, params: any = null) => {
    return this.http.post(environment.apiBaseUrl + '/api/' + url, params);
  };

  put = (url: string, params: any = null) => {
    return this.http.put(environment.apiBaseUrl + '/api/' + url, params);
  };

  delete = (url: string) => {
    return this.http.delete(environment.apiBaseUrl + '/api/' + url);
  };

  UploadFile(data: any) {
    return this.http.post(`${ environment.apiBaseUrl }/api/method/upload_file`, data);
  }



  // Function to convert a file to Base64
  fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = error => reject(error);
    });
  }

}
