import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather/weather.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = 'Москва';
  currentWeather: any;
  hourlyWeather: any[] = [];
  chartInstance: any;

  constructor(private weatherService: WeatherService) { }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(data => {
      this.currentWeather = data.current;
      this.hourlyWeather = data.forecast.forecastday[0].hour;
      this.createChart();
    }, error => {
      alert('Не удалось получить данные о погоде для указанного города.');
    });
  }

  createChart() {
    const times = this.hourlyWeather.map(hour => new Date(hour.time).getHours() + ':00');
    const temperatures = this.hourlyWeather.map(hour => hour.temp_c);
    const pressures = this.hourlyWeather.map(hour => hour.pressure_mb);
    const humidities = this.hourlyWeather.map(hour => hour.humidity);

    const chartDom = document.getElementById('chart');
    this.chartInstance = echarts.init(chartDom);
    this.chartInstance.setOption({
      title: { text: 'Погода по часам' },
      tooltip: {},
      legend: { data: ['Температура (°C)', 'Давление (hPa)', 'Влажность (%)'] },
      xAxis: { data: times },
      yAxis: {},
      series: [
        { name: 'Температура (°C)', type: 'line', data: temperatures },
        { name: 'Давление (hPa)', type: 'line', data: pressures },
        { name: 'Влажность (%)', type: 'line', data: humidities }
      ]
    });
  }
}
