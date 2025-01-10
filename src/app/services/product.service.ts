import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dbUrl = 'https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app/'

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<{[key: string]:Product}>(this.dbUrl + ".json"
    )
    .pipe(
        map((responseData) => {
            const products: Product[] = []
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    products.push({ ...responseData[key], key })
                }}
            return products
        }));
  }


  createProduct(product: any): Observable<any> {
    const url = this.dbUrl + ".json";
    return this.http.post<{ name: string }>(url, product).pipe(
        map((res) => {
            return {...product, key: res.name}
        }))
  }

  updateProduct(productKey: string, product: Product): Observable<Product> {
    return this.http.put<Product>(this.dbUrl + productKey + ".json", product)
  }

  deleteProduct(productKey: string): Observable<void> {
    return this.http.delete<void>(this.dbUrl + productKey + ".json")
  }

}
