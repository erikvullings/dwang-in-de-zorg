export interface ICareType {
  /** RoWe de zorgvorm als string is niet meer nodig, zie boolean velden */
  //zorgvorm: string;

  /** RoWe: nog uit te zoeken: hier staat ambulant/klinisch voor de verzameling zorgvormen; moet dat per zorgvorm? */
  isAmbulantGeleverd?: boolean;
  isKlinischGeleverd?: boolean;
  // RoWe: velden voor geleverde typen zorg
  isBejegening?: boolean;
  isVerzorging?: boolean;
  isVerpleging?: boolean;
  isBehandeling?: boolean;
  isBegeleiding?: boolean;
  isBescherming?: boolean;
  isVochtVoedingMedicatie?: boolean;
  isMedishceControles?: boolean;
  isBeperkenBewegingsvrijheid?: boolean;
  isInsluiten?: boolean;
  isToezicht?: boolean;
  isOnderzoekLledingLichaam?: boolean;
  isOnderzoekWoonruimte?: boolean;
  isBeperkenEigenLeven?: boolean;
  isBeperkenBezoek?: boolean;
  isOpnemen?: boolean;
  isTijdelijkVerblijf?: boolean;
  
}
