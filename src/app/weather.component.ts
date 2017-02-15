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
        console.log(weather)
        const html = `
        <div class="row">
          <img class="col-md-8" src=${weather.image}>
          <div class="col-md-4 info">
            <h2 style="margin-top:10px;">${weather.temp}&deg${weather.units.temp}</h2>
            <p>${weather.city}, ${weather.region}</p>
            <p class="currently">${weather.currently}</p>
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
