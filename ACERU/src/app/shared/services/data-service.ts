import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  DataService<T> {
  
  private data!: T;

  setData(data: T) {
    this.data = data;
  }

  getData(): T {
    return this.data;
  }
}
