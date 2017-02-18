import { Component, OnInit } from '@angular/core'

declare const $: any

@Component({
  selector: 'hd-weather',
  template: `
    <div id='weather'></div>
  `,
  styles: []
})
export class WeatherComponent implements OnInit {

  ngOnInit() {
    this.loadWeather()
    setInterval(this.loadWeather.bind(this), 600000)
  }

  loadWeather() {
    $.simpleWeather({
      location: 'Austin, TX',
      woeid: '',
      unit: 'f',
      success: function (weather) {
        const html = `
        <div class="row weather-container">
          <img id="weather-image" class="col-md-8" src=${weather.image}>
          <div class="col-md-4 info">
            <div>${weather.temp}&deg${weather.units.temp}</div>
            <div>${weather.currently}</div>
            <div>${weather.city}, ${weather.region}</div>
          </div>
        </div>
        `
        $('#weather').html(html)
      },
      error: function(error) {
        $('#weather').html(`<p>${error}</p>`)
      }
    })
  }

}
