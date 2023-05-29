import axios from "axios";

class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San José"];
  dbPath = "./db/database.json";

  constructor() {
    // TODO: leer DB si existe
  }

  async ciudad(lugar = "") {

    try {
      const resp = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/BUENOS%20AIRES.json?proximity=ip&language=es&access_token=pk.eyJ1IjoiZGFuaTEyMTIiLCJhIjoiY2xpN3ppNnhxMzZjOTNocDk3OXJmMDE3OSJ9.-5gs9lKhPZ5wX3KIEzglaA");
      console.log(resp.data);
        return []; // retornar los lugares que coincidan con la búsqueda
    } catch (error) {
        console.log(error);
        return [];
    }
  }
}

export { Busquedas };
