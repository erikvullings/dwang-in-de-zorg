import m from 'mithril';
import { SlimdownView } from 'mithril-ui-form';

const md = `
#### Informatie locatieregister Wet verplichte ggz (Wvggz) en Wet zorg en dwang (Wzd)

##### Locatieregister

Zorgaanbieders die verplichte of onvrijwillige zorg verlenen moeten zich registreren in het locatieregister. Zij registreren hun vestigingen voor zover dat accommodaties of locaties zijn.  Dat is geregeld in de Wet verplichte ggz (Wvggz) en de Wet zorg en dwang (Wzd) die per 1 januari 2020 in werking treden.

In de Wet verplichte ggz wordt de term verplichte zorg gehanteerd. In de Wet zorg en dwang wordt gesproken over onvrijwillige zorg. In deze handleiding wordt de verzamelterm ‘gedwongen zorg’ gebruikt wanneer verplichte en onvrijwillige zorg wordt bedoeld.

##### Voor wie is het register?

Het register is openbaar en kan door iedereen worden geraadpleegd, bijvoorbeeld door mensen die gedwongen zorg krijgen of door partijen die besluiten nemen of voorbereiden over gedwongen zorg. De Inspectie Gezondheidszorg en Jeugd (IGJ) gebruikt het register voor haar toezicht. Zorgaanbieders moeten ervoor zorgen dat hun locaties correct in het register staan. Daarbij wordt ook vermeld of een locatie een accommodatie is. Hierover verderop meer.

##### Wat moet worden geregistreerd in het locatieregister?

Zorgaanbieders moeten de vestigingen, die in het Handelsregister zijn geregistreerd, in het locatieregister registreren als mensen daar gedwongen worden opgenomen of als daar (of daarvanuit) onvrijwillige of verplichte zorg wordt verleend. Een vestiging wordt één keer geregistreerd. Een vestiging die geregistreerd is als accommodatie, wordt dus niet tevens als locatie geregistreerd. De volgende opties zijn mogelijk.

<ol>
<li>Worden betrokkenen gedwongen opgenomen in een vestiging, dan registreert u die vestiging als accommodatie. Wordt vanuit deze vestiging ook gedwongen zorg verleend aan betrokkenen buiten de accommodatie, dan moet u dit vermelden in het register:
<ul><li>Van een gedwongen opname is sprake als de opname plaatsvindt op basis van een (voortgezette) crisismaatregel, zorgmachtiging, inbewaringstelling, rechterlijke machtiging een besluit tot opname en verblijf van het CIZ (de opvolger van de huidige artikel 60-toetsing).</li></ul></li>
<li>Worden in een vestiging geen betrokkenen gedwongen opgenomen, maar wordt in een vestiging wel gedwongen zorg verleend, dan registreert u de vestiging als locatie. Dat geldt ook als u gedwongen zorg verleent aan betrokkenen buiten de locatie.</li>
<li>Worden in een vestiging geen betrokkenen gedwongen opgenomen of gedwongen zorg verleend, maar wel vanuit de vestiging gedwongen verleend aan betrokkenen buiten de locatie, dan moet u deze vestiging ook als locatie registreren.</li>
</ol>

Bij gedwongen zorgverlening in een locatie kan het zowel gaan om betrokkenen die daar duurzaam verblijven als om betrokkenen die in de locatie bijvoorbeeld gebruik maken van dagopvang, dagbesteding of poliklinische behandeling.

Bij gedwongen zorgverlening <i>vanuit</i> een accommodatie of locatie gaat het om betrokkenen aan wie buiten de accommodatie of locatie onvrijwillige of verplichte zorg verleend wordt, denk bijvoorbeeld aan een accommodatie / locatie waar een wijkteam of FACT-team is gevestigd dat onvrijwillige of verplichte zorg verleent aan cliënten die thuis wonen.

##### Wat is een locatie?

Voor het locatieregister is aansluiting gezocht bij het begrip “vestiging” in de Handelsregisterwet<sup>1</sup>. Op basis van de Handelsregisterwet moet elke zorgaanbieder zijn vestigingen (gebouwen of complexen van gebouwen waar duurzame uitoefening van activiteiten plaatsvindt) inschrijven in het handelsregister als hoofd- of nevenvestiging. Deze vestigingen geeft de zorgaanbieder dus ook op voor het locatieregister, als hij daar of van daaruit verplichte of onvrijwillige zorg verleent.

Indien er op een terrein (los van elkaar) meerdere gebouwen staan, kunnen die volgens het Handelsregister aparte vestigingen zijn. Dat is het geval wanneer een gebouw een eigen BAG-adres<sup>2</sup> heeft. Wordt in of vanuit die gebouwen verplichte of onvrijwillige zorg verleend, dan moeten die gebouwen dan ook elk afzonderlijk als locatie worden opgegeven in het locatieregister, ook al staan ze op één terrein. In de praktijk kan het dus voorkomen dat er voor één terrein van een ggz-instelling of een instelling voor (verstandelijke) gehandicaptenzorg meerdere locaties geregistreerd worden. Andersom kan het ook: als een groot complex van gebouwen als één vestiging is geregistreerd in het handelsregister, zoals een ziekenhuis, wordt het voor het locatieregister ook als één locatie gezien.

Meer informatie over het inschrijven van locaties is te vinden op de [website](https://www.kvk.nl/inschrijven-en-wijzigen/inschrijven-vestiging-onderneming/) van de Kamer van Koophandel of in een [document met veelgestelde vragen](https://www.kvk.nl/download/Veelgestelde vragen inschrijven zorginstellingen_versie 110214_tcm109-386522.pdf) bij de registratie van vestigingen in de zorgsector.

##### Welke locatie is een accommodatie?

Alle vestigingen van een zorgaanbieder zijn locaties. Sommige locaties zijn een accommodatie. Als mensen er gedwongen opgenomen worden, of verblijven op grond van artikel 21 van de Wzd (besluit tot opname en verblijf van het CIZ bij “geen bereidheid, geen bezwaar”-cliënten) is dat een accommodatie. Dat moet ook in het locatieregister vermeld worden.

Vindt er dus geen gedwongen opname of verblijf op basis van een CIZ-besluit plaats, dan is een locatie geen accommodatie. Dat zijn dan locaties waar gedwongen zorg ambulant wordt verleend. Dat betekent bijvoorbeeld dat er gedwongen poliklinische zorg wordt verleend of dat het de thuisbasis is van een FACT-team dat gedwongen zorg bij mensen thuis verleent.

Is er op of vanuit één locatie sprake van zowel gedwongen opname als ambulante zorg, dan moet de locatie als accommodatie worden geregistreerd.

Een uitgebreidere notitie over het accommodatie- en locatiebegrip is te vinden op: https://www.dwangindezorg.nl/wzd/documenten/publicaties/implementatie/wzd/diversen/notitie-vws---de-betekenis-van-locatie-en-accommodatie-binnen-de-wzd-en-wvggz.

##### Extra regels voor locaties en zorg vanuit accommodaties

Alle locaties en accommodaties moeten voldoen aan de regels in de Wvggz en/of de Wzd.

Voor locaties waar geen gedwongen opname plaatsvindt, maar wel poliklinische behandeling, is sprake van ambulante gedwongen zorg, en gelden de aanvullende regels die zijn opgenomen in het [Besluit zorg en dwang](https://www.dwangindezorg.nl/wzd/documenten/publicaties/implementatie/wzd/diversen/besluit-zorg-en-dwang) en het [Besluit verplichte ggz](https://www.dwangindezorg.nl/wvggz/documenten/publicaties/informatiepunt/documenten/1/besluit-verplichte-ggz). Deze besluiten zijn ook van toepassing als er gedwongen zorg wordt verleend bij een betrokkene thuis.

Deze aanvullende regels bestaan omdat bepaalde randvoorwaarden buiten een accommodatie minder vanzelfsprekend zijn. Zo is, anders dan bij zorg binnen een accommodatie, bij zorg buiten een accommodatie geen sprake van een structuur waarin zorgverleners aanwezig zijn die te allen tijde toegang hebben tot de betrokkene om noodzakelijke zorg te verlenen. Ook is het minder makkelijk om snel assistentie van een collega te krijgen. De regels in de besluiten hebben tot doel om alsnog de juiste randvoorwaarden voor gedwongen zorg te creëren.

In de praktijk kan het dus voorkomen dat op één terrein van een zorgaanbieder een aantal locaties en een aantal accommodaties staan. Voor de locaties gelden de aanvullende regels uit de besluiten. Voor accommodaties gelden de besluiten alleen als óók sprake is van ambulante gedwongen zorg vanuit de accommodatie, dus buiten het gebouw van de accommodatie. Bijvoorbeeld als vanuit een accommodatie verplichte zorg wordt geleverd door een FACT-team in een RIBW of bij mensen thuis. Of als vanuit een accommodatie ook thuiszorg wordt gecoördineerd.

##### Ambulante zorg

In de Wzd en de Wvggz is geregeld dat gedwongen zorg ook ambulant kan worden verleend, bijvoorbeeld bij een betrokkene thuis of in een polikliniek. De locatie die dan moet worden opgenomen is de locatie waarin of van waaruit de zorg wordt verleend door een hulpverlener. Het thuisadres van een betrokkene zelf is nooit een locatie en hoeft dus niet geregistreerd te worden.

Als bijvoorbeeld een FACT-team verplichte zorg verleent bij mensen thuis of in een RIBW, dan is de centrale werkplek van de hulpverleners in het FACT-team (dus van waaruit de zorg wordt gecoördineerd) de locatie die wordt opgenomen in het register. Dat zou bijvoorbeeld een locatie in een ggz-instelling kunnen zijn, of een coördinatiepunt van onvrijwillige thuiszorg op grond van de Wzd.

Het kan ook zijn dat voor een cliënt die verblijft in een Wzd-accommodatie, verplichte zorg onder de Wvggz nodig is. Het kan zijn dat hulpverleners van een GGZ-instelling dan naar de cliënt toe gaan om de Wvggz-zorg te verlenen. In dit geval moet de plek van waaruit de GGZ-hulpverleners ambulant werken in het locatieregister zijn opgenomen als locatie. Net als wanneer de cliënt thuis woont, hoeft de ambulante Wvggz-zorgaanbieder niet de Wzd-accommodatie waar de cliënt verblijft te registreren. Daar gaat de Wzd-zorgaanbieder over.

##### Overgang van de Wet bopz

Alle instellingen waar gedwongen opname op grond van de Wet bijzondere opname psychiatrische ziekenhuizen (bopz) mogelijk was, hebben een bopz-aanmerking. Alle instellingen met een bopz-aanmerking zijn automatisch in het nieuwe locatieregister opgenomen als Wvggz-accommodatie of Wzd-accommodatie. De besturen van deze instellingen hebben daarover een brief ontvangen met het verzoek de gegevens in het locatieregister te controleren en aan te vullen.

##### Gedwongen zorg op grond van Wzd en Wvggz

Als op één locatie gedwongen zorg op grond van zowel de Wzd als de Wvggz wordt verleend, dan moet dit in het register worden opgenomen. Dat kan door bij het aanmelden of wijzigen van een locatie te selecteren onder welke wet(ten) de zorg wordt verleend. Een locatie kan tegelijkertijd Wvggz-accommodatie en Wzd-locatie zijn, zoals bijvoorbeeld een algemeen ziekenhuis of een Borg-instelling.

##### Verplichte vormen van zorg (Wvggz)

Op grond van de Wvggz moet een zorgaanbieder in het locatieregister opnemen welke vormen van verplichte zorg op een locatie worden verleend. De Wzd kent deze verplichting niet.

De vormen van verplichte zorg in de Wvggz zijn:

<ol type="a">
<li>Toedienen van vocht, voeding en medicatie, alsmede het verrichten van medische controles of andere medische handelingen en therapeutische maatregelen, ter behandeling van een psychische stoornis, dan wel vanwege die stoornis, ter behandeling van een somatische aandoening;</li>
<li>Beperken van de bewegingsvrijheid;</li>
<li>Insluiten;</li>
<li>Uitoefenen van toezicht op betrokkene;</li>
<li>Onderzoek aan kleding of lichaam;</li>
<li>Onderzoek van de woon- of verblijfsruimte op gedrag-beïnvloedende middelen en gevaarlijke voorwerpen;</li>
<li>Controleren op de aanwezigheid van gedrag-beïnvloedende middelen;</li>
<li>Aanbrengen van beperkingen in de vrijheid het eigen leven in te richten, die tot gevolg hebben dat betrokkene iets moet doen of nalaten, waaronder het gebruik van communicatiemiddelen;</li>
<li>Beperken van het recht op het ontvangen van bezoek;</li>
<li>Opnemen in een accommodatie;</li>
<li>Ontnemen van de vrijheid van betrokkene door hem over te brengen naar een plaats die geschikt is voor tijdelijk verblijf.</li>
</ol>

Bij alle Wvggz-accommodaties die automatisch zijn opgenomen in het register omdat zij een bopz-aanmerking hadden, zijn de volgende vormen van verplichte zorg in het locatieregister geselecteerd: a, b, c en j. Deze vormen van verplichte zorg corresponderen met de middelen en maatregelen in de bopz. Een zorgaanbieder mag in het register alle vormen van zorg selecteren die hij kan aanbieden op die locatie, ook als deze zorg op dit moment (nog) niet wordt verleend.

<sup>1</sup> Zie artikel 1 van de Regeling verplichte geestelijke gezondheidszorg, artikel 1 van de Regeling zorg en dwang, en artikel 1, eerste lid, onder j, van de Handelsregisterwet 2007.<br>
<sup>2</sup> BAG: Basisregistratie adressen en gebouwen.
`;

export const HelpPage = () => ({
  view: () =>
    m('.row', [
      m(SlimdownView, { md, className: 'normalized' }),
    ]),
});
