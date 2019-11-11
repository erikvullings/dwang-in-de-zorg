export interface IKvKSearchResult {
  apiVersion: string;
  meta: object;
  data: {
    itemsPerPage: number;
    startPage: number;
    totalItems: number;
    items: Array<{
      kvkNumber: string;
      branchNumber: string;
      rsin: string;
      tradeNames: {
        businessName: string;
        shortBusinessName: string;
        currentTradeNames: string[];
        currentStatutoryNames: string[];
      };
      hasEntryInBusinessRegister: boolean;
      hasNonMailingIndication: boolean;
      isLegalPerson: boolean;
      legalForm?: string;
      isBranch: boolean;
      isMainBranch: boolean;
      addresses: Array<{
        type: string;
        bagid?: number;
        street: string;
        houseNumber: string;
        houseNumberAddition?: string;
        postalCode: string;
        city: string;
        country: string;
        rijksdriehoekX?: number;
        rijksdriehoekY?: number;
        rijksdriehoekZ?: number;
        gpsLatitude?: number;
        gpsLongitude?: number;
      }>;
    }>;
  };
}
