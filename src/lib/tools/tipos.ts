//import type JXG from './jsxgraphcore.mjs';

import type { Polinomio, FunRacional } from './Polinomio';
type Board= typeof JXG.Board;
type GeomElem= typeof JXG.GeometryElement;
type funTipo= FunRacional | Polinomio;
type funR= (x:number) => number | undefined;
type funEvent= (e: Event) => void;
type funReal= funR | undefined;

interface OptMenu {
  href: string;
  texto: string;
}

interface DatosHead {
  funcTipo: string;
	tarea: string;
	titMnu: string;
  opcMnu: OptMenu[];
}

interface brdAttrib {
  axis: boolean;
  boundingbox: number[];
}
interface paramF {
  func: funR;
  name: string;
  color: string;
  raices: number[];
  traza: boolean;
  ventana: brdAttrib
  idFuns: GeomElem[];
  idRaices: GeomElem[];
}

interface paramFunR {
  func: funR;
  name: string;
  color: string;
  idFuns: GeomElem[];
}

interface paramD {
  func: GeomElem;  // (x:number) => number;
  deriv: (x: number) => number;
  vxmin: number;
  vxmax: number;
  color: string;
  idObjs: GeomElem[];
}

interface DeslPr {
  id: string;
  min: string;
  max: string;
  step: string;
  value: string;
}

export type {
  OptMenu,
  DatosHead,
  paramF,
  paramD,
  paramFunR,
  GeomElem,
  Board,
  brdAttrib,
  funTipo,
  DeslPr,
  funR,
  funReal,
  funEvent
} 