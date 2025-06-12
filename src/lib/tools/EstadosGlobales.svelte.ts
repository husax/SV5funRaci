import type {Board} from "./tipos";

let brd = $state(null);

export function getBrd() : Board {
  return brd;
}

export function setBrd(value: Board) {
  brd = value;
}
