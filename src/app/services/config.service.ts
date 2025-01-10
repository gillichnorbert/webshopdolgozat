import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private content = new BehaviorSubject<any>(null); // Az alapértelmezett érték null
  private langSign = "hu";
  private isLanguagesLoaded = new BehaviorSubject<boolean>(false); // Az állapot a nyelvi fájl betöltéséről

  constructor(private http: HttpClient) { 
    this.loadContent();
  }

  changeLanguage(langSign: any) {
    this.langSign = langSign;
    this.loadContent();
  }

  loadContent() {
    this.http.get("/assets/lang_" + this.langSign + ".json").subscribe(
      (res) => {
        console.log(res);
        this.content.next(res);
        this.isLanguagesLoaded.next(true); // A nyelvek betöltődtek
      },
      (error) => {
        console.error('Language load error', error);
        this.isLanguagesLoaded.next(true); // Ha hiba van, akkor is betöltődött
      }
    );
  }

  getContent() {
    return this.content.asObservable();
  }

  isLoaded() {
    return this.isLanguagesLoaded.asObservable();
  }
}
