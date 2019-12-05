export interface IPdokSearchResult {
  response: {
    numFound: number;
    start: number;
    maxScore: number;
    docs: Array<{
      bron: 'BAG' | 'NWB' | string;
      woonplaatscode: string;
      type: 'adres' | 'postcode' | 'weg';
      woonplaatsnaam: string;
      wijkcode: string;
      huis_nlt: string;
      openbareruimtetype: string;
      buurtnaam: string;
      gemeentecode: string;
      rdf_seealso: string;
      weergavenaam: string;
      straatnaam_verkort: string;
      id: string;
      gekoppeld_perceel: string;
      gemeentenaam: string;
      buurtcode: string;
      wijknaam: string;
      identificatie: string;
      openbareruimte_id: string;
      waterschapsnaam: string;
      provinciecode: string;
      postcode: string;
      provincienaam: string;
      centroide_ll: string;
      nummeraanduiding_id: string;
      waterschapscode: string;
      adresseerbaarobject_id: string;
      huisnummer: string;
      provincieafkorting: string;
      centroide_rd: string;
      straatnaam: string;
      score: string;
    }>;
  };
}

/** Extracts two numbers from a geopoint */
export const pointRegex = /POINT\(([\d.]+) ([\d.]+)\)/;
