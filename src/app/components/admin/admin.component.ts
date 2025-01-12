import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isLanguagesLoaded = false;
  products: any[] = []
  adminList: any[] = []
  adminAddList: any[] = []
  newProduct: any = {
    name: "",
    category: "",
    description: "",
    price: 0
  }

  adminTitle1 = ""
  adminTitle2 = ""
  editButton = ""
  deleteButton = ""
  createButton = ""



  constructor(private productService: ProductService, private config:ConfigService) {
    config.getContent().subscribe((content) => {
      if (content) {
      this.adminTitle1 = content.adminTitle1
      this.adminTitle2 = content.adminTitle2
      this.adminList = content.adminList
      this.adminAddList = content.adminAddList
      this.editButton = content.editButton
      this.deleteButton = content.deleteButton
      this.createButton = content.createButton
      }
      config.isLoaded().subscribe((loaded) => {
        this.isLanguagesLoaded = loaded;
      })
    })
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = Object.keys(data).map(key => ({ id: key, ...data[key] }))
    })
  }



  createProduct(): void {
    if (this.newProduct.name && this.newProduct.category && this.newProduct.price > 0) {
      this.productService.createProduct(this.newProduct).subscribe({
        next: (product) => {
          console.log('Sikeres hozzáadás:', product)
          this.products.push(product)
          this.newProduct = { name: '', category: '', description: '', price: 0}
        }
      })
    } else {
      console.error('Minden mező kitöltése kötelező!')
    }
  }



  updateProduct(product:any): void {
    this.productService.updateProduct(product.key, product).subscribe({
        next: (updatedProduct) => {
            console.log('Sikeres frissítés:', updatedProduct)
        },
        error: (err) => {
            console.error('Hiba!', err)
        },
    })
  }

  deleteProduct(product: any): void {
    this.productService.deleteProduct(product.key).subscribe({
        next: () => {
            console.log('Termék sikeresen törölve:', product)
        },
        error: (err) => {
            console.error('Hiba történt a törlés során:', err)
        },
    })
}
}