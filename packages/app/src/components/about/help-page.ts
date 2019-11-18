import m from 'mithril';
import { SlimdownView } from 'mithril-ui-form';

// const md = `<h4 class="primary-text">Handleiding Locatieregister</h4>
// <h5 class="primary-text">Zoeken</h5>`;

const md = `
##### Handleiding locatieregister Wet verplichte ggz (Wvggz) en Wet zorg en dwang (Wzd)

###### Locatieregister

Verplichte of onvrijwillige zorg mag alleen worden verleend in of vanuit een locatie die is opgenomen in een openbaar register. Dat is geregeld in de Wet verplichte ggz (Wvggz) en de Wet zorg en dwang (Wzd) die per 1 januari 2020 in werking treden. Daardoor weet onder andere de Inspectie Gezondheidszorg en Jeugd (IGJ) waar gedwongen zorg wordt verleend.

###### Voor wie is het register?

Het register is openbaar en kan door iedereen worden geraadpleegd, bijvoorbeeld door mensen die gedwongen zorg krijgen of door partijen die besluiten nemen en voorbereiden over gedwongen zorg. Zorgaanbieders zijn ervoor verantwoordelijk dat hun locaties correct in het register staan. De Inspectie Gezondheidszorg en Jeugd (IGJ) gebruikt het register voor hun toezicht.

###### Wat is een locatie?

Een locatie is een plek in of van waaruit gedwongen zorg kan worden verleend op grond van de Wvggz of Wzd.

In het locatieregister is aansluiting gezocht bij de definities in het handelsregister. Op basis van de Handelsregisterwet moet elke zorginstelling zijn gebouwen of complexen van gebouwen waar duurzame uitoefening van de activiteiten plaatsvindt inschrijven in het handelsregister als hoofd- of nevenvestiging. Een vestiging kan door een zorgaanbieder worden aangemerkt als locatie.

In de praktijk kan een locatie dus een groot complex van gebouwen zijn (bijvoorbeeld een ziekenhuis), maar ook één kleiner gebouw op bijvoorbeeld het terrein van een ggz-instelling of instelling voor (verstandelijke) gehandicaptenzorg.

Meer informatie over het inschrijven van vestigingen is te vinden op de [website](https://www.kvk.nl/inschrijven-en-wijzigen/inschrijven-vestiging-onderneming/) van de Kamer van Koophandel of in een [document met veelgestelde vragen bij de registratie van vestigingen in de zorgsector](https://www.kvk.nl/download/Veelgestelde vragen inschrijven zorginstellingen_versie 110214_tcm109-386522.pdf).

###### Verschil locatie/accommodatie

Een accommodatie is een bijzondere vorm van een locatie. Een accommodatie is een locatie waar betrokkenen gedwongen opgenomen kunnen worden, of met een opname op grond van artikel 21 (opname en verblijf op grond van een besluit van het CIZ) van de Wzd kunnen verblijven.

Als er in of vanuit één locatie zowel gedwongen opname als ambulante zorg wordt verleend op grond van de Wvggz en/of Wzd, dan wordt in het register de hele locatie aangemerkt als Wvggz- en/of Wzd-accommodatie.

Alle locaties (inclusief accommodaties) moeten voldoen aan de regels in de Wvggz en/of de Wzd. Voor locaties die niet zijn aangemerkt als accommodatie gelden aanvullende regels die zijn opgenomen in het [Besluit zorg en dwang](https://www.dwangindezorg.nl/wzd/documenten/publicaties/implementatie/wzd/diversen/besluit-zorg-en-dwang) en het [Besluit verplichte ggz](https://www.dwangindezorg.nl/wvggz/documenten/publicaties/informatiepunt/documenten/1/besluit-verplichte-ggz). Deze besluiten zijn ook van toepassing als vanuit een accommodatie zorg wordt verleend die niet plaatsvindt in de accommodatie, maar bijvoorbeeld bij een betrokkene thuis.

Een uitgebreidere notitie over het accommodatiebegrip is te vinden op: **_LINK NAAR NOTITIE_**

###### Ambulante zorg

In de Wzd en de Wvggz is geregeld dat gedwongen zorg ook ambulant kan worden verleend, bijvoorbeeld bij een betrokkene thuis of in een polikliniek. De locatie die dan moet worden opgenomen is de locatie in of van waaruit de zorg wordt verleend door een hulpverlener. Het thuisadres van een betrokkene is nooit een locatie.

###### Overgang van bopz

Alle instellingen waar gedwongen opname op grond van de Wet bijzondere opname psychiatrische ziekenhuizen (bopz) mogelijk was, hebben een bopz-aanmerking. Alle instellingen met een bopz-aanmerking zijn automatisch in het nieuwe locatieregister opgenomen als Wvggz-accommodatie of Wzd-accommodatie. De besturen van deze instellingen ontvangen daarover een brief met het verzoek de gegevens in het locatieregister te controleren en aan te vullen.

**Gedwongen zorg op grond van Wzd en Wvggz**

Als op één locatie zowel gedwongen zorg op grond van de Wzd als Wvggz wordt verleend, dan moet dit in het register worden opgenomen. Dat kan door bij het aanmelden of wijzigen van een locatie te selecteren onder welke wet(ten) de zorg wordt verleend. Een locatie kan bijvoorbeeld tegelijkertijd Wvggz-accommodatie en Wzd-locatie zijn.

###### Verplichte vormen van zorg (Wvggz)

Op grond van de Wvggz moet een zorgaanbieder in het locatieregister opnemen welke vormen van verplichte zorg op een locatie worden verleend. De Wzd kent deze verplichting niet.

De vormen van verplichte zorg in de Wvggz zijn:

1. Toedienen van vocht, voeding en medicatie, alsmede het verrichten van medische controles of andere medische handelingen en therapeutische maatregelen, ter behandeling van een psychische stoornis, dan wel vanwege die stoornis, ter behandeling van een somatische aandoening;
2. Beperken van de bewegingsvrijheid;
3. Insluiten;
4. Uitoefenen van toezicht op betrokkene;
5. Onderzoek aan kleding of lichaam;
6. Onderzoek van de woon- of verblijfsruimte op gedrag-beïnvloedende middelen en gevaarlijke voorwerpen;
7. Controleren op de aanwezigheid van gedrag-beïnvloedende middelen;
8. Aanbrengen van beperkingen in de vrijheid het eigen leven in te richten, die tot gevolg hebben dat betrokkene iets moet doen of nalaten, waaronder het gebruik van communicatiemiddelen;
9. Beperken van het recht op het ontvangen van bezoek;
10. Opnemen in een accommodatie;
11. Ontnemen van de vrijheid van betrokkene door hem over te brengen naar een plaats die geschikt is voor tijdelijk verblijf.

Bij alle Wvggz-accommodaties die automatisch zijn opgenomen in het register omdat zij een bopz-aanmerking hadden, zijn de volgende vormen van verplichte zorg in het locatieregister geselecteerd: 1, 2, 3 en 10. Deze vormen van verplichte zorg corresponderen met de middelen en maatregelen in de bopz. Een zorgaanbieder mag in het register alle vormen van zorg selecteren die hij kan aanbieden op die locatie, ook als deze zorg op dit moment (nog) niet wordt verleend.
`;

export const HelpPage = () => ({
  view: () =>
    m('.row', [
      m(SlimdownView, { md, className: 'normalized' }),
    ]),
});
