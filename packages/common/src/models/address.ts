export interface IAddress {
  straat: string;
  huisnummer: number;
  huisletter?: string;
  huisnummerToevoeging?: string;
  postcode: string;
  woonplaatsnaam: string;
  landnaam?: string;
  landnaamBuitenEuropa?: string;
  aanvullendeAdresinformatie?: string;
}
