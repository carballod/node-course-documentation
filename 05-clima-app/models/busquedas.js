import fs from "fs";
import axios from "axios";

class Busquedas {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    this.leerDB();
  }

  get historialCapitalizado() {
    return this.historial.map( lugar => {
      let palabras = lugar.split(' ');
      palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );
      return palabras.join(' ');
    })
  }

  get paramsMapbox() {
    return {
      languaje: 'es',
      'access_token' : 'pk.eyJ1IjoiZGFuaTEyMTIiLCJhIjoiY2xpODN2N2R4MHcydDNobGY5aXdlbzhlMyJ9.nqIRthy4ZEA-hfBsdW1mDA',
      limit: 5
    }
  }

  get paramsOpenWeather() {
    return {
      appid: 'f369635965b00ad16ced5da4da4b9f3b',
      units: 'metric',
      lang: 'es'
    }
  }

  async ciudad(lugar = '') {
    try {

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json?`, 
        params: this.paramsMapbox
      })

      const resp = await instance.get();
      return resp.data.features.map( lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1]
      }));

    } catch (error) {
        console.log(error);
        return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
        params: { ...this.paramsOpenWeather, lat, lon }
      })
      
      const resp = await instance.get();
      return {
        desc: resp.data.weather[0].description,
        min: resp.data.main.temp_min,
        max: resp.data.main.temp_min,
        temp: resp.data.main.temp
      }

    } catch (error) {
      console.log(error);
      return []
    }
  }

  agregarHistorial( lugar = '' ) {
    if( this.historial.includes(lugar.toLocaleLowerCase()) ) return;

    this.historial = this.historial.splice(0,5);

    this.historial.unshift( lugar.toLocaleLowerCase() );
    // Grabar en DB
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial
    }
    fs.writeFileSync( this.dbPath, JSON.stringify(payload) );
  }

  leerDB() {
    if( !fs.existsSync(this.dbPath) ) return;

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    this.historial = data.historial;
  }

}

export { Busquedas };
