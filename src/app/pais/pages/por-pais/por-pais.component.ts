import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `
  ]
})
export class PorPaisComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  resultados: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
  }

  buscar( termino: string){
    
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino)
      .subscribe( paises => {
        this.resultados = paises;
      },
      err => {
        this.hayError = true;
        this.resultados = [];
      });
  }

  sugerencias( termino: string ){
    this.mostrarSugerencias = true;
    this.hayError = false;
    this.termino = termino;
    
    this.paisService.buscarPais(termino)
      .subscribe( 
        paises => this.paisesSugeridos = paises.splice(0,3),
        err => this.paisesSugeridos = []
      );
  }

  buscarSugerido(termino:string){
    this.buscar(termino);
  }
}
