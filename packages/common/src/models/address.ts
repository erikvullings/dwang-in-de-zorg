export interface IAddress {
  /** straat */
  str: string;
  /** huisnummer */
  hn: string;
  /** huisletter + huisnummer toevoeging */
  toev?: string;
  /** postcode */
  pc: string;
  /** woonplaatsnaam */
  wn: string;
  /** landnaam */
  land?: string;
  /** landnaam buiten Europa, foreign land */
  fland?: string;
  /** aanvullende adresinformatie */
  aanv?: string;
  /** BAG identifier */
  bag?: number;
  /** Rijkdriehoekcoördinaten x */
  x?: number;
  /** Rijkdriehoekcoördinaten y */
  y?: number;
  /** Latitude */
  lat?: number;
  /** Longitude */
  lon?: number;
  /** Has non mailing indicator */
  noMail?: boolean;
}
