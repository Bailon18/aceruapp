import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  DataService<T> {
  
  private data!: T | null;

  setData(data: T) {
    this.data = data;
  }

  getData(): T| null {
    return this.data;
  }

  clearData() {
    this.data = null;
  }
}
