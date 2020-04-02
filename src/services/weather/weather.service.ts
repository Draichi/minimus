import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const appId = 'e0619676fd64adc2112bd9007d17c292';

@Injectable()
export class WeatherService {
  // > appid
  constructor(public http: HttpClient) {}

  getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSub = new Subject<string>();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`;
    this.http
      .get(url)
      .subscribe(data => {
        dataSub.next(data['weather']);
      }, err => {
        console.error(err);
      });
    return dataSub;
  }

  getCitiesWeatherByNames(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
    const citiesSubject = new Subject();
    cities.forEach(city => {
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`
      citiesSubject.next(this.http.get(url));
    });
    return citiesSubject;
  }

  getWeatherState(city: string): Subject<string> {
    const dataSubject = new Subject<string>();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=952d6b1a52fe15a7b901720074680562`;
    this.http
      .get(url)
      .subscribe(data => dataSubject.next(data['weather'][0].main));
    return dataSubject;
  }

  getCurrentTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=${appId}`
    this.http
      .get(url)
      .subscribe((weather: any) => dataSubject.next(Math.round(Number(weather.main.temp))));
    return dataSubject;
  }

  getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=${appId}`
    this.http
      .get(url)
      .subscribe((weather: any) => dataSubject.next(weather.main.humidity));
    return dataSubject;
  }

  getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=${appId}`
    this.http
      .get(url)
      .subscribe((weather: any) => dataSubject.next(Math.round(weather.wind.spread)));
    return dataSubject;
  }

  getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    let max: number;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=${appId}`
    this.http
      .get(url)
      .subscribe((weather: any) => {
        max = weather.list[0].main.temp;
        weather.list.forEach(value => {
          if (max < value.main.temp) {
            max = value.main.temp;
          }
        });
        dataSubject.next(Math.round(max));
      });
    return dataSubject;
  }

  getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    let min: number;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=${appId}`
    this.http
      .get(url)
      .subscribe((weather: any) => {
        min = weather.list[0].main.temp;
        weather.list.forEach(value => {
          if (min < value.main.temp) {
            min = value.main.temp;
          }
        });
        dataSubject.next(Math.round(min));
      });
    return dataSubject;
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>> {
    const dataSubject = new Subject<Array<any>>();
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=${appId}`
    this.http
      .get(url)
      .subscribe((weather: any) => dataSubject.next(weather.list));
    return dataSubject;
  }
}
