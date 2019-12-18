export interface ICsvModel {
  naam: string;
  kvk: string;
  rechtsvorm?:
    | 'publiekrechtelijkerechtspersoon'
    | 'beslotenvennootschap'
    | 'stichting'
    | 'cooperatie';
  straat: string;
  huisnummer: string;
  huisnummertoevoeging?: string;
  postcode: string;
  woonplaatsnaam: string;
  landnaam: string;
  // RoWe: aanvullende adresinfo voor adressen voor zorgaanbiederadres
  zaanvadresinfo?: string;
  locatienaam: string;
  // RoWe: locatieomschrijving (niet zijnde additionele adresinformatie)
  lomschrijving?: string;
  vestigingsnummer?: string;
  lstraat: string;
  lhuisnummer: string;
  lhuisnummertoevoeging?: string;
  lpostcode: string;
  lwoonplaatsnaam: string;
  llandnaam: string;
  // RoWe: aanvullende adresinfo voor adressen van locatieadres
  laanvadresinfo?: string;
  // is wvggz accommodatie + onder welke wetten wordt zorg geleverd
  iswvggzacco?: string;
  // is Wzd accommodatie + onder welke wetten wordt zorg geleverd
  iswzdacco?: string;
  iswzdamb?: string;
  isawvggzmb?: string;
  iswzd?: string;
  iswvggz?: string;
  // RoWe: deze velden alleen voor eerste imports
  aantekeningingang: string;
  aantekeningeinde?: string;
  // RoWe: velden voor geleverde typen zorg
  zvbejegening?: string;
  zvverzorging?: string;
  zvverpleging?: string;
  zvbehandeling?: string;
  zvbegeleiding?: string;
  zvbescherming?: string;
  zvvochtvoedingmedicatie?: string;
  zvmedishcecontroles?: string;
  zvbeperkenbewegingsvrijheid?: string;
  zvinsluiten?: string;
  zvtoezicht?: string;
  zvonderzoekkledinglichaam?: string;
  zvonderzoekwoonruimte?: string;
  zvcontrolerenmiddelen?: string;
  zvbeperkeneigenleven?: string;
  zvbeperkenbezoek?: string;
  zvopnemen?: string;
  zvtijdelijkverblijf?: string;
}
