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
      isBranch: boolean;
      isMainBranch: boolean;
      addresses: Array<{
        type: string;
        street: string;
        houseNumber: string;
        houseNumberAddition?: string;
        postalCode: string;
        city: string;
        country: string;
      }>;
    }>;
  };
}
