# Importer from CSV to JSON

This importer converts the current registrations from CSV in the BOPZ to the new format for the location register. It performs the following functions:

- Reads the CSV
- Converts the row-based locations to care providers with locations documents in JSON
- Uses PDOK to retrieve the latitude and longitude (as well as Rijksdriehoek coordinates).
- POSTs the documents to the REST-EASY-LOKI backend.

## Some errors

Addresses that are used more than once. Estimate there are ~500 of them, for example.

Resolving 7437 BE, 2,
Resolving 7437 BE, 2,
Resolving 7437 BE, 2,
Resolving 3313 EM, 515,
Resolving 3313 EM, 515,
Resolving 3313 EM, 515,
Resolving 6713 MG, 17,
Resolving 6713 MG, 17,
Resolving 4143 EN, 1,
Resolving 4143 EN, 1,
Resolving 4143 EN, 1,
Resolving 4143 EN, 1,
Resolving 2202 TG, 1,
Resolving 2202 TG, 1,

Due to network issues, these addresses were not properly resolved.

Resolving 1687 WT, 43,
Error resolving 1687 WT, 43, !
Resolving 1687 WT, 43,
Resolving 1687 WT, 45,
Error resolving 1687 WT, 45, !
Resolving 1687 WT, 45,
Resolving 1687 WT, 47,
Error resolving 1687 WT, 47, !
Resolving 1687 WT, 47,
Resolving 1687 WT, 49,
Error resolving 1687 WT, 49, !
Resolving 1687 WT, 49,
Resolving 1688 WP, 37,
Error resolving 1688 WP, 37, !
Resolving 1688 WP, 37,
Resolving 1688 WP, 39,
Error resolving 1688 WP, 39, !
Resolving 1688 WP, 39,
Resolving 1688 WP, 41,
Error resolving 1688 WP, 41, !
