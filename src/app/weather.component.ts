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
  }

  loadWeather() {
    $.simpleWeather({
      location: 'Austin, TX',
      woeid: '',
      unit: 'f',
      success: function (weather) {
        const html = `<h2><i class="icon-${weather.code}"></i> ${weather.temp}&deg${weather.units.temp}</h2>
        <ul><li>${weather.city}, ${weather.region}</li>
        <li class="currently">${weather.currently}'</li>
        <li>${weather.wind.direction} ${weather.wind.speed} ${weather.units.speed}</li></ul>
        `
        $('#weather').html(html)
      },
      error: function(error) {
        $('#weather').html(`<p>${error}</p>`)
      }
    })
  }

}
