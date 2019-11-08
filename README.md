# LOCATION REGISTER, part of [dwangindezorg.nl](dwangindezorg.nl)

A web application for storing and searching locations, using:

- A backend service, consisting of:
  - [node.js](https://nodejs.org) and [koa](https://www.npmjs.com/package/koa) as the backend service.
  - [lokijs](http://lokijs.org) as an in-memory database, with a JSON file for persistence.
  - [rest-easy-loki](https://github.com/erikvullings/rest-easy-loki) a REST interface on top of loki, also supporting MongoDB like queries.
- A frontend single-page application (a so-called SPA), using:
  - [mithril](http://mithril.js.org) as JS framework
  - [mithril-ui-form](https://github.com/erikvullings/mithril-ui-form) for creating the forms
  - [mithril-materialized](https://github.com/erikvullings/mithril-materialized) for the Material design
- A [Keycloak](https://www.keycloak.org) identity provider, running in a Docker container. In the `.env` file, the realm settings and application name need to be provided in order for it to work as expected.

## Installation

This application is developed using [node.js](https://nodejs.org) v10, so please install that first if you don't have it.

To install all project dependencies, start the database service and run parcel to bundle your dependencies. You can access the application at [http://localhost:3000](http://localhost:3000).

```bash
pnpm i
npm build:domain
npm run serve
```

## TODO

- CSV: Slaan we alle aantekeningen op, of alleen de huidige. Laatste...
- Date picker modals worden teveel aangemaakt - bug in mithril-materialized
- Mutaties opslaan
- Locatie wijzigingen van een datumstempel voorzien
- Repeat items: wat als er 1200 locaties zijn? Pagination + filter
- KvK koppeling
- PDOK koppeling
- Docker versie bouwen
  - locatieregister.db in volume data (Kubernetics: persistent volume cache oid pvc)

Bij het aanmaken of wijzigen van een nieuwe locatie moeten de volgende vragen worden gesteld:

Selecteer onder welke wet(ten) gedwongen zorg wordt aangeboden in of vanuit deze locatie: 

o	Wet zorg en dwang
•	Is gedwongen opname op grond van de Wzd mogelijk?
	Nee: Wzd-locatie
	Ja: Wzd-accommodatie
o	Wordt in of vanuit deze accommodatie ook ambulante zorg verleend? Ja/nee
o	Wet verplichte ggz
•	Is gedwongen opname op grond van de Wvggz mogelijk?
	Nee: Wvggz-locatie
	Ja: Wvggz-accommodatie
o	Wordt in of vanuit deze accommodatie ook ambulante zorg verleend? Ja/nee

Per locatie moet minstens 1 wet worden aangevinkt. 
Als de wet is aangevinkt: verplicht om een keuze te maken tussen locatie en accommodatie.
Als accommodatie: verplicht kiezen tussen ja en nee voor ambulante zorg


Voor alle Wvggz-locaties en accommodaties moeten de verplichte vormen van zorg worden opgenomen:

Vormen van verplichte zorg die worden verleend:

o	toedienen van vocht, voeding en medicatie, alsmede het verrichten van medische controles of andere medische handelingen en therapeutische maatregelen, ter behandeling van een psychische stoornis, dan wel vanwege die stoornis, ter behandeling van een somatische aandoening;
o	beperken van de bewegingsvrijheid;
o	insluiten;
o	uitoefenen van toezicht op betrokkene;
o	onderzoek aan kleding of lichaam;
o	onderzoek van de woon- of verblijfsruimte op gedrag-beïnvloedende middelen en gevaarlijke voorwerpen;
o	controleren op de aanwezigheid van gedrag-beïnvloedende middelen;
o	aanbrengen van beperkingen in de vrijheid het eigen leven in te richten, die tot gevolg hebben dat betrokkene iets moet doen of nalaten, waaronder het gebruik van communicatiemiddelen;
o	beperken van het recht op het ontvangen van bezoek;
o	ontnemen van de vrijheid van betrokkene door hem over te brengen naar een plaats die geschikt is voor tijdelijk verblijf.

Dat betekent dat je de volgende velden weg kan halen:
-	Is ambulant geleverd?
-	Is klinisch geleverd?
-	Opnemen in een accomodatie
Daarnaast het verzoek (nice to have) om alle velden in 1x aan of uit te zetten.


Met terugwerkende kracht een datum invullen mag technisch niet mogelijk zijn. Een datum in de toekomst mag wel.

Een admin moet van de achterkant wel een datum kunnen wijzigen naar een datum in het verleden, mocht er iets fout zijn gegaan.


Er wordt een veld toegevoegd of een locatie een BOPZ-aanmerking had in het verleden. Deze is niet zichtbaar in de interface van het register, wel in de CSV.


De ingangsdatum voor alle bopz-locaties is 1 januari 2020. (Ik verwacht dat Rob dit regelt door in zijn lijst 1-1-2020 als ingangsdatum op te nemen.)


Als je met je muis over een icoontje gaat, graag een ‘ballonnetje’/tektvakje met wat dit icoontje is/doet.


FB

- In Internet Explorer (standaard VWS browser) opent het locatieregister niet (volledig lege pagina)
- Als je vanaf test.locatieregister.dwangindezorg.nl op start klikt verwacht ik als gebruiker de volledige lijst met zorgaanbieders waarbinnen ik kan gaan zoeken. Nu is het een lege pagina met een alleen een zoekbalk
- Op http://test.locatieregister.dwangindezorg.nl/#!/zoeken is de achtergrond wit en de tekst in de zoekbalk ook (‘zoek op naam, etc’), waardoor het nauwelijks te lezen is
- Ik probeerde op huisnummer te zoeken binnen Parnassia (nr 72) – ik kreeg veel meer resultaten dan verwacht (16 stuks) en ik kon niet uitvinden waarom (nr zat niet in de postcode of adres)
- Als een locatie een lange naam heeft die afgebroken wordt door het einde van de kolom (zie hieronder), dan is het onmogelijk om de hele naam te kunnen zien. Hetzelfde geldt voor het volledige adres. Zou het mogelijk zijn om (als je op een locatie klikt), je ook alle informatie van die locatie (naam, adres, wellicht vestigingsnr) te zien in het uitklapscherm?
- Wij leveren nog aangepaste tekst aan voor de startpagina (nu alleen Wzd) en de pagina onder ‘i’. Wat voor een tekst verwacht je onder het vraagteken?

Zorgaanbieder maken:

1. (1) Rechtsvorm "publiekrechtelijke rechtspersoon" (cq. de officiele benaming ervan) ontbreekt  - o.a. bij academisch ziekenhuizen (zie excel lijst/csv)
a. Vraag: hoe is nu de mapping tussen csv en rechtsvormen dropdown?
2. (2) "Aanvullende adresinformatie" staat nu in bold tekst, moet aansluiten bij / in zelfde font / fontgrootte als andere adresinfo: het is onderdeel van het adres (gebeurt ook bij Locatie)
3. (2) Tekst "Voeg op de volgende pagina uw locaties toe (zie menu links)" is vreemd. Er is geen "volgende pagina".
o Voorstel: veranderen in "Voeg locaties toe via het menu links"
1. (2) De volgorde van de knoppen is ohandig: Toon registratie komt voor Bewaar registratie.
o Voorstel: eerst bewaren, dan tonen
o Voorstel: "registratie" is te algemeen. Benoem wat op dat moment wordt bewaard.
2. (1) Het pad in de applicaties naar locaties toevoegen is niet duidelijk / verwarrend en verspringt door het scherm:
a. voor de ZA:
i. ZA toevoegen (linksboven)
ii. <gegevens invullen>
iii. "bewaar registratie" (links, middelste knop)
b. Voor de locatie(s)
i. "toon registratie" (links)
ii. "nieuwe locatie toevoegen" (midden boven)
iii. <gegevens invullen>
iv. "bewaar registratie" (links midden)
o Voorstel:
• Zet de knop "bewaar registratie" in het scherm met de gegevens  niet links.
• Maak bij de ZA een knop/mogelijkheid om direct locaties toe te voegen
1. (2) De functie van de knop "verwijder registratie" is onduidelijk. Wat doet deze? (zorgaanbieder weggooien of alleen locaties?). Zie eerdere opmerking bij bewaren: benoem wat op dat moment wordt verwijderd.
 
Locatie toevoegen:

1. (3) Rechtsboven staat een niet benoemd veld waarvan de functie (visueel) onduidelijk is. Wat is de functie / het doel hiervan? Zie ook Algemeen
2. (2) Tekst "NB: De locatie is nooit het adres van de patiënt. In dat geval, gebruik het adres van waaruit de zorg geleverd wordt." kan beter.
o Voorstel: "Registreer geen woonadressen van cliënten of patiënten. Gebruik voor situaties waar ambulant zorg wordt verleend het adres van waaruit de zorg wordt geleverd"
o @Reinier, Marleen: gaarne jullie oordeel over een goede tekst.
3. (1) Veld "nmr" moet zijn "KvK (neven) vestigingsnummer" of "KvK Vestigingsnummer"
4. (2) "Aanvullende adresinformatie" staat nu in bold tekst, moet aansluiten bij / in zelfde font en fontgrootte als andere adresinfo: het is onderdeel van het adres (gebeurt ook bij Zorgaanbieder)
5. (1) Het scherm heeft een "verwijderen" knop rechtsonder, links de "bewaren" knop. Maak dit eenduidig/consistent

1. (1) Locaties zijn volgens de tekst op het scherm "niet actief" na aanmaken. 
2. (1) Voor een tweede keer op "locatie toevoegen" klikken doet niets zichtbaars. Blijkt later dat er een "lege pagina" wordt aangemaakt. 
3.  (2) Bovenin die pagina staat "Locatiegegevens (laatste wijziging op {{mutated:date}})"
 
Algemeen:

1. (2) Scherm "flow" is niet overal handig:
a. Mensen lezen (in het Nederlands) van linksboven naar rechtsonder.
b. Knoppen zijn visueel gescheiden (verticale lijn) van de gegevens
c. Er is (zo te zien) een filteroptie in invulschermen. Wat doet die?
o Voorstel: zorg dat de flow van schermen hierbij past. Zet actieknoppen onder of rechts van de gegevens, niet links en visueel gescheiden

Nog een paar volgens mij belangrijke:

- (1) Na inloggen zijn de eerder geimporteerde records niet zichtbaar/vindbaar. "par" geeft vóór inloggen het verwachte resultaat, na inloggen is de lijst leeg.
- (1) Opgevoerde ZA en Locaties zijn na uitloggen niet meer zichtbaar/vindbaar. Tijdens het editen zijn ze zichtbaar, kun je ook terug naar het hoofdscherm en zie/vind je ze. Log je uit, dan zijn de ZA en locaties weg of niet meer vindbaar. Na opnieuw inloggen zijn ze er ook niet.


## Development

As above, but now run `parcel` in watch mode, and access the application at [http://localhost:3000](http://localhost:1234).

```bash
npm i
npm start
```

### Environment settings

- LOKI_PORT: to change the output port, default 3000, e.g. `set LOKI_PORT=80` to serve it at [http://localhost](http://localhost).
- LOKI_DB: to change the database name.
- LOKI_CORS: to disable CORS.
- LOKI_PRETTY: to show nicely formatted logs.

### Activities

1. Ik heb al een ingangsdatum, maar nog geen einddatum of een einddatum in de toekomst (van de laatste aantekening)
  Pas de ingangsdatum aan => pas de laatste aantekening aan (ingangsdatum)
  Pas de einddatum aan => pas de laatste aantekening aan (einddatum)
2. Ik heb al een ingangsdatum en ook een einddatum in het verleden (van de laatste aantekening).
  Maak een nieuwe aantekening aan, nog zonder ingangsdatum.
3. Ik heb nog geen ingangsdatum (van de laatste aantekening).
  Biedt een date picker aan om de ingangsdatum in te stellen

Hoe los ik op:

- Einddatum moet groter zijn dan ingangsdatum.
- Ingangsdatum in het verleden mag je niet meer aanpassen.
