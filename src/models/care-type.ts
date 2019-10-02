export interface ICareType {
  bejegening?: boolean;
  verzorging?: boolean;
  verpleging?: boolean;
  behandeling?: boolean;
  begeleiding?: boolean;
  bescherming?: boolean;
  /** Toedienen van vocht, voeding en medicatie, verrichten van medische controles of handelingen, therapeutische maatregelen */
  behandelen?: boolean;
  /** Beperken van de bewegingsvrijheid */
  beperkengBewegingsvrijheid?: boolean;
  insluiten?: boolean;
  /** Uitoefenen van toezicht */
  toezicht?: boolean;
  /** Onderzoek aan kleding of lichaam */
  inspectieLichaam?: boolean;
  /** Onderzoek van de woon- of verblijfsruimte op gedrag-beïnvloedende middelen en gevaarlijke voorwerpen */
  inspectieOmgeving?: boolean;
  /** Controleren? op aanwezigheid van gedrag-beïnvloedende middelen */
  inspectieDrugs?: boolean;
  /** Beperken in de vrijheid het eigen leven in te richten */
  beperkenVrijheid?: boolean;
  /** Beperken van het recht op het ontvangen van bezoek */
  beperkenBezoek?: boolean;
  /** Opnemen in een accommodatie */
  opname?: boolean;
  /** Ontnemen van de vrijheid van betrokkene door hem over te brengen naar een plaats die geschikt is voor tijdelijk verblijf */
  onvrijwilligePlaatsing?: boolean;
}
