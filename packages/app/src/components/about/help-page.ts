import m from 'mithril';
import { SlimdownView } from 'mithril-ui-form';

// const md = `<h4 class="primary-text">Handleiding Locatieregister</h4>
// <h5 class="primary-text">Zoeken</h5>`;

const md = `
### Handleiding locatieregister Wet verplichte ggz (Wvggz) en Wet zorg en dwang (Wzd)

#### Locatieregister

Verplichte of onvrijwillige zorg mag alleen worden verleend in of vanuit een locatie die is opgenomen in een openbaar register. Dat is geregeld in de Wet verplichte ggz (Wvggz) en de Wet zorg en dwang (Wzd) die per 1 januari 2020 in werking treden. Daardoor weet onder andere de Inspectie Gezondheidszorg en Jeugd (IGJ) waar gedwongen zorg wordt verleend.

#### Voor wie

Het register is openbaar en kan door iedereen worden geraadpleegd, bijvoorbeeld door mensen die gedwongen zorg krijgen of door partijen die besluiten nemen en voorbereiden over gedwongen zorg. Zorgaanbieders zijn ervoor verantwoordelijk dat hun locaties correct in het register staan. De Inspectie Gezondheidszorg en Jeugd (IGJ) gebruikt het register voor hun toezicht.

#### Wat is een locatie?

Een locatie is een plek in of van waaruit gedwongen zorg kan worden verleend op grond van de Wvggz of Wzd.

In het locatieregister is aansluiting gezocht bij de definities in het handelsregister. Op basis van de Handelsregisterwet moet elke zorginstelling zijn gebouwen of complexen van gebouwen waar duurzame uitoefening van de activiteiten plaatsvindt inschrijven in het handelsregister als **hoofd- of nevenvestiging**. Een vestiging kan door een zorgaanbieder worden aangemerkt als locatie.

In de praktijk kan een locatie dus een groot complex van gebouwen zijn (bijvoorbeeld een ziekenhuis), maar ook één kleiner gebouw op bijvoorbeeld het terrein van een ggz-instelling of instelling voor (verstandelijke) gehandicaptenzorg.

Meer informatie over het inschrijven van vestigingen is te vinden op de [website](https://www.kvk.nl/inschrijven-en-wijzigen/inschrijven-vestiging-onderneming/) van de Kamer van Koophandel of in een [document met veelgestelde vragen bij de registratie van vestigingen in de zorgsector](https://www.kvk.nl/download/Veelgestelde vragen inschrijven zorginstellingen_versie 110214_tcm109-386522.pdf).

#### Verschil locatie/accommodatie

Een accommodatie is een bijzondere vorm van een locatie. Een accommodatie is een locatie waar betrokkenen gedwongen opgenomen kunnen worden, of met een opname op grond van artikel 21 (opname en verblijf op grond van een besluit van het CIZ) van de Wzd kunnen verblijven.

Als er in of vanuit één locatie zowel gedwongen opname als ambulante zorg wordt verleend op grond van de Wvggz en/of Wzd, dan wordt in het register de hele locatie aangemerkt als Wvggz- en/of Wzd-accommodatie.

Alle locaties (inclusief accommodaties) moeten voldoen aan de regels in de Wvggz en/of de Wzd. Voor locaties die niet zijn aangemerkt als accommodatie gelden aanvullende regels die zijn opgenomen in het [Besluit zorg en dwang](https://www.dwangindezorg.nl/wzd/documenten/publicaties/implementatie/wzd/diversen/besluit-zorg-en-dwang) en het [Besluit verplichte ggz](https://www.dwangindezorg.nl/wvggz/documenten/publicaties/informatiepunt/documenten/1/besluit-verplichte-ggz). Deze besluiten zijn ook van toepassing als vanuit een accommodatie zorg wordt verleent die niet plaatsvindt in de accommodatie, maar bijvoorbeeld bij een betrokkene thuis.

PM: Verwijzen naar notitie accommodatiebegrip? Vooral voor Wzd relevant.

#### Ambulante zorg

In de Wzd en de Wvggz is geregeld dat gedwongen zorg ook ambulant kan worden verleend, bijvoorbeeld bij een betrokkene thuis of in een polikliniek. De locatie die dan moet worden opgenomen is de locatie in of van waaruit de zorg wordt verleend door een hulpverlener. Het thuisadres van een betrokkene is nooit een locatie.

PM: praktijkvoorbeeld toevoegen

#### Overgang van bopz

Alle instellingen waar gedwongen opname op grond van de Wet bijzondere opname psychiatrische ziekenhuizen (bopz) mogelijk was, hebben een bopz-aanmerking. Alle instellingen met een bopz-aanmerking zijn automatisch in het nieuwe locatieregister opgenomen als Wvggz-accommodatie of Wzd-accommodatie. De besturen van deze instellingen ontvangen daarover een brief met het verzoek de gegevens in het locatieregister te controleren en aan te vullen.

#### Gedwongen zorg op grond van Wzd en Wvggz

Als op één locatie zowel gedwongen zorg op grond van de Wzd als Wvggz wordt verleend, dan moet dit in het register worden opgenomen. Dat kan door bij het aanmelden of wijzigen van een locatie te selecteren onder welke wet(ten) de zorg wordt verleend. Een locatie kan bijvoorbeeld tegelijkertijd Wvggz-accommodatie en Wzd-locatie zijn.

PM: Voorbeeld uit de praktijk?


#### Verplichte vormen van zorg (Wvggz)

Op grond van de Wvggz moet een zorgaanbieder in het locatieregister opnemen welke vormen van verplichte zorg op een locatie worden verleend. De Wzd kent deze verplichting niet.

De vormen van verplichte zorg in de Wvggz zijn:

1. toedienen van vocht, voeding en medicatie, alsmede het verrichten van medische controles of andere medische handelingen en therapeutische maatregelen, ter behandeling van een psychische stoornis, dan wel vanwege die stoornis, ter behandeling van een somatische aandoening;
2. beperken van de bewegingsvrijheid;
3. insluiten;
4. uitoefenen van toezicht op betrokkene;
5. onderzoek aan kleding of lichaam;
6. onderzoek van de woon- of verblijfsruimte op gedrag-beïnvloedende middelen en gevaarlijke voorwerpen;
7. controleren op de aanwezigheid van gedrag-beïnvloedende middelen;
8. aanbrengen van beperkingen in de vrijheid het eigen leven in te richten, die tot gevolg hebben dat betrokkene iets moet doen of nalaten, waaronder het gebruik van communicatiemiddelen;
9. beperken van het recht op het ontvangen van bezoek;
10. opnemen in een accommodatie;
11. ontnemen van de vrijheid van betrokkene door hem over te brengen naar een plaats die geschikt is voor tijdelijk verblijf.

Bij alle Wvggz-accommodaties die automatisch zijn opgenomen in het register omdat zij een bopz-aanmerking hadden, zijn de volgende vormen van verplichte zorg in het locatieregister geselecteerd: a, b, c en j. Deze vormen van verplichte zorg corresponderen met de middelen en maatregelen in de bopz. Een zorgaanbieder mag in het register alle vormen van zorg selecteren die hij kan aanbieden op die locatie, ook als deze zorg op dit moment (nog) niet wordt verleend. 


#### PRAKTISCHE HANDLEIDING ZORGAANBIEDERS

##### Ik ben een zorgaanbieder die gedwongen zorg wil verlenen. Wat moet ik doen?

PM: Marleen

##### Hoe voeg ik een nieuwe locatie toe?

PM: Erik

##### Hoe wijzig ik gegevens?

PM: Erik

##### Wat als de gegevens uit het handelsregister niet juist zijn?

U kunt de gegevens die op basis van uw vestigingsnummer zijn opgehaald uit het handelsregister niet wijzigen in het locatieregister om te voorkomen dat er discrepantie bestaat tussen beide registers. Als de gegevens niet juist zijn kunt u deze wijzigen in het handelsregister. Daarvoor verwijs ik u naar [https://www.kvk.nl/inschrijven-en-wijzigen/inschrijven-vestiging-onderneming/](https://www.kvk.nl/inschrijven-en-wijzigen/inschrijven-vestiging-onderneming/). Indien een wijziging juist en volledig wordt doorgegeven, wordt het na ontvangst binnen enkele werkdagen in het handelsregister verwerkt. Vervolgens kunt u de gegevens ophalen in het locatieregister.

Mocht er een urgente situatie zijn, waardoor het niet mogelijk is om te wachten tot de wijziging in het handelsregister is verwerkt, dan is er een tijdelijke oplossing in het locatieregister mogelijk. U kunt een nieuwe locatie aanmaken **zonder vestigingsnummer**. U kunt dan handmatig de (adres)gegevens invoeren en de locatie laten opnemen in het locatieregister.

##### Kan ik meerder locaties in één keer toevoegen/wijzigen?

PM: Erik

##### Ik weet niet zeker of een vestiging een locatie of een accommodatie is

PM: Zie boven / Notitie accommodatiebegrip

##### Hoe log ik in?
PM: Erik

##### Ik ben mijn wachtwoord vergeten
PM: Erik


#### PRAKTISCHE HANDLEIDING RAADPLEGERS

##### Zoeken/filteren
PM: Erik
`;

export const HelpPage = () => ({
  view: () =>
    m('.row', [
      m(SlimdownView, { md, className: 'normalized' }),
      // m('img.responsive-img', { src: l3, style: 'margin: 0 auto; padding: 0 10px' }),
    ]),
});
