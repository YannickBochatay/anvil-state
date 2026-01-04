import "./Square.js"
import { Anvil, html } from "../Anvil.js";

let template = html(`
  <table>
    <tr>
      <td><demo-square index="0"></demo-square></td>
      <td><demo-square index="1"></demo-square></td>
      <td><demo-square index="2"></demo-square></td>
    </tr>
    <tr>
      <td><demo-square index="3"></demo-square></td>
      <td><demo-square index="4"></demo-square></td>
      <td><demo-square index="5"></demo-square></td>
    </tr>
    <tr>
      <td><demo-square index="6"></demo-square></td>
      <td><demo-square index="7"></demo-square></td>
      <td><demo-square index="8"></demo-square></td>
    </tr>
  </table>
`);

class Board extends Anvil {

  constructor() {
    super(template);
  }

}

customElements.define("demo-board", Board);