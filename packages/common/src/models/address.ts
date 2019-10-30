export interface IAddress {
  /** straat */
  str: string;
  /** huisnummer */
  hn: number;
  /** huisletter */
  hl?: string;
  /** huisnummerToevoeging */
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
}
