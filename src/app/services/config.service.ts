import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private content = new BehaviorSubject<any>(null);
  private langSign = "hu";
  private isLanguagesLoaded = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { 
    this.loadContent()
  }


  changeLanguage(langSign: any) {
    this.langSign = langSign
    this.loadContent()
  }

  loadContent() {
    this.isLanguagesLoaded.next(false);
    this.http.get("/assets/lang_" + this.langSign + ".json").subscribe(
      (res) => {
        console.log(res);
        this.content.next(res);
        this.isLanguagesLoaded.next(true)
      },
      (error) => {
        console.error('Language load error', error)
        this.isLanguagesLoaded.next(true)
      }
    );
  }

  getContent() {
    return this.content.asObservable()
  }

  isLoaded() {
    return this.isLanguagesLoaded.asObservable()
  }
}
