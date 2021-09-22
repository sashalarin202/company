import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, Employee } from './contracts';


export abstract class BaseRepo<TEntity> {
  constructor(private http: HttpClient,) { }

  readonly apiRoot = "http://localhost:56267/api";
  abstract readonly entityName: string;
  get entityURL(): string {
    return `${this.apiRoot}/${this.entityName}`
  }


  getList(): Observable<TEntity[]> {
    return this.http.get<TEntity[]>(this.entityURL)
  }

  add(val: TEntity) {
    return this.http.post(this.entityURL, val);
  }

  update(val: TEntity) {
    return this.http.put(this.entityURL, val);
  }

  delete(val: number) {
    return this.http.delete(`${this.entityURL}/${val}`);
  }
}


@Injectable({
  providedIn: 'root'
})
export class DepartmentRepo extends BaseRepo<Department>{
  entityName = "Department";
  constructor(http:HttpClient){
    super(http)
  }
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeRepo extends BaseRepo<Employee>{
  entityName = "Employee";
  constructor(http:HttpClient){
    super(http)
  }
}
