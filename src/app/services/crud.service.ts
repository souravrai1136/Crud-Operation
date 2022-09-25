import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  postVal(data: any) {
    return this.http.post<any>('http://localhost:3000/dealers', data)
      .pipe(map((res: any) => {
        return res
      }))
  }

  getVal() {
    return this.http.get<any>('http://localhost:3000/dealers')
      .pipe(map((res: any) => {
        return res
      }))
  }
  

  updateVal(id: number, data: any) {
    return this.http.put<any>('http://localhost:3000/dealers' + '/' + id, data)
      .pipe(map((res: any) => {
        return res
      }))
  }

  deleteVal(id: number) {
    return this.http.delete<any>('http://localhost:3000/dealers' + '/' + id)
      .pipe(map((res: any) => {
        return res
      }))
  }


}

