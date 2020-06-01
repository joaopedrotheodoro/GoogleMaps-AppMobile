import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Title } from '@angular/platform-browser';
import { Ilocal } from '../interfaces/Ilocal';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;
  posicaoAtual: any;

  public listaLocais: Ilocal[] = [
    {
      lat:-22.488648,
      lng:-48.546691,
      titulo:'Já morei aqui',
    },
    {
      lat:-22.494531, 
      lng:-48.550726,
      titulo:'Local 2',      
    },
    {
      lat:-22.489447,  
      lng:-48.566204,
      titulo:'Local 3',    
    },
    {
      lat:-22.493533, 
      lng:-48.543675,
      titulo:'Local 4',      
    },
    {
      lat:-22.482288, 
      lng:-48.567981,
      titulo:'Local 5',      
    }
  ];

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(private geolocation: Geolocation) { }

  public async showMap(){

    await this.buscaPosicao();

    const options = {
      center: this.posicaoAtual,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options)

    const marcador = new google.maps.Marker({
      position: this.posicaoAtual,
      map: this.map,
      title: "Minha localização",
      icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      animation: google.maps.Animation.BOUNCE
    });

    for(let Local of this.listaLocais){
      this.adicionarMarcador(Local);
    }
  }

  ionViewDidEnter(){
    this.showMap();
  }

  private adicionarMarcador(Local: Ilocal) {
    const {lat, lng, titulo} = Local;

    const marcador = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: titulo,
    });
  }

  public async buscaPosicao(){
    await this.geolocation.getCurrentPosition().then((posicaoGPS) => {
      this.posicaoAtual = {
        lat: posicaoGPS.coords.latitude,
        lng: posicaoGPS.coords.longitude
      }
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
