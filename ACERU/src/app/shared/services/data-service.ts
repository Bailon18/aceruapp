// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class  DataService<T> {
  
//   private data!: T | null;

//   setData(data: T) {
//     this.data = data;
//   }

//   getData(): T| null {
//     return this.data;
//   }

//   clearData() {
//     this.data = null;
//   }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {

  private storageKey = 'dataServiceData';

  setData(data: T) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getData(): T | null {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : null;
  }

  clearData() {
    localStorage.removeItem(this.storageKey);
  }
}
