

let brd = $state({} as JXG.Board);

export function getBrd() : JXG.Board {
  return brd;
}

export function setBrd(value: JXG.Board) {
  brd = value;
}
