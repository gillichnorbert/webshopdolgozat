import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isNavbarOpen = false;
  langSelectorCollapse = true;
  dropDownNavCollapse = true;
  navItems: any[] = [];
  langSelection: any[] = [];
  search = "";
  name = "";
  actLang = "Magyar";
  hamburgerActive = false;

  constructor(private config: ConfigService, private router: Router) {
    config.getContent().subscribe((content) => {
      this.langSelection = content.langSelection || [];
      this.navItems = content.navItem;
      this.name = content.name
    });
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
    this.hamburgerActive = !this.hamburgerActive;
  }

  routeTo(link: string) {
    window.location.href = link;
  }

  ngOnInit() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      this.actLang = savedLanguage === 'en' ? 'English' : savedLanguage === 'de' ? 'Deutsch' : 'Magyar';
      this.config.changeLanguage(savedLanguage);
    }
  }

  toggleLangSelector() {
    this.langSelectorCollapse = !this.langSelectorCollapse;
  }  
  
  langChange(lang: any) {
    this.actLang = lang.text;
    this.config.changeLanguage(lang.sign);
    localStorage.setItem('selectedLanguage', lang.sign);
    this.langSelectorCollapse = true; 
  }
}
