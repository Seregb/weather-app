import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '82945af918e8480bbfb74726240407';
  private apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}&q=${city}&hours=24`);
  }
}
