import { Component } from '@angular/core';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Webshop";

  isLanguagesLoaded = false;
  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.isLoaded().subscribe((loaded) => {
      this.isLanguagesLoaded = loaded;
    });
  }


}
