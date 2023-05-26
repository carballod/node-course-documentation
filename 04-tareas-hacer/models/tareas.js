import { Tarea } from "./tarea.js";

/**
 *  _listado:
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoeEN:92231 }  },
 */

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }
    
    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {

        const tareasArr = Object.values(tareas);
        
        tareasArr.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }
 
    crearTarea( desc = '' ) {
 
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto () {

        console.log();
        this.listadoArr.forEach( (tarea, i) => {

            const idx = `${i+1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red;
                                
            console.log(`${ idx + '.'.green } ${ desc } :: ${ estado }`);
        });

    }

    listarPendientesCompletadas( completadas = true ) {

        console.log();
        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i+1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            if ( completadas ) {
                if ( completadoEn ) {
                    console.log(`${ idx + '.'.green } ${ desc } :: ${ completadoEn.green }`);
                }
            } else {
                if ( !completadoEn ) {
                    console.log(`${ idx + '.'.green } ${ desc } :: ${ estado }`);
                }
            }
        });

    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}


export { Tareas };