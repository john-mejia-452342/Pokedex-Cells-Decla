import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';

class PokeEvolution extends CellsPage {

  static get is() {
    return 'evolution-page';
  }

  static get properties() {
    return {
      pokemonList: { type: Array },
      params: { type: Object},
      id: { type: Number}
    };
  }

  constructor() {
    super();
    this.pokemonList = [];
    this.params = {};
    this.id = 0;
  }

  get headerTitlle() {
    const pokeId = this.params.id || this.titlle;
    console.log(pokeId);
    return decodeURIComponent(pokeId).replace(/-g/, ' ');
  }

  onPageLeave() {
    this.pokemonList = [];
  }

  onPageEnter() {
    // Obtener la URL actual
    const hash = window.location.hash;

    // Extraer el valor del parámetro id de la URL
    const idParam = hash.match(/id=(\d+)/);

    // Verificar si se encontró el parámetro id en la URL
    if (idParam && idParam[1]) {
      // Asignar el valor del parámetro id a la propiedad id de la clase
      this.id = parseInt(idParam[1]);
    }

    console.log(idParam);
  }

  render() {
    return html`
      <div>
        <h1>Hola Evos</h1>
      </div>

    `;
  }


}

window.customElements.define(PokeEvolution.is, PokeEvolution);