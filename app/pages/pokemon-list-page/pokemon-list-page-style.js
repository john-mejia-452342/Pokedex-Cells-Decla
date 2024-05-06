import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
.pokedex-header {
    display: flex;
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
    background-color: blue;
    justify-content: center;
    height: 70px;
    align-items: center;
}
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
}
.pokemon-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    display: flex;
    width: 200px;
    text-align: center;
    height: 322px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.pokemon-image {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.tipos {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
}

.btn-modal{
    height: 33px;
    width: 100px;
    background-color: #7979cd;
    border: none;
    border-radius: 1rem;
    font-size: medium;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  text-align: center;
}
.header-modal{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.modal-pokes{
    
    display: flex;
    width: 100%;
    
}
.modal-close {
    cursor: pointer;
    height: 33px;
    width: 69px;
    background-color: #e27d7d;
    border: none;
    border-radius: 1rem;
}
`;
