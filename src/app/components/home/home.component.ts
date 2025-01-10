import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any[] = [];
  productstitle1 = ""
  productstitle2 = ""
  categories: any[] = [];

  constructor(private productService: ProductService, private config:ConfigService) {
    config.getContent().subscribe((content) => {
      this.productstitle1 = content.productsTitle1
      this.productstitle2 = content.productsTitle2
      this.categories = content.categories
    }) 
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    });
  }
}
