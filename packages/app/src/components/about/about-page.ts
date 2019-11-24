import m from 'mithril';
import { SlimdownView } from 'mithril-ui-form';

const md = `
##### Release notes

**25 november 2019**<br>
Dit is de eerste versie van het locatieregister ten behoeve van de Wvggz en Wzd.
In de komende weken zullen er nog aanpassingen aan dit register worden doorgevoerd. Op deze plek zullen we u hierover informeren.

#### INFORMATIE VOOR ZORGAANBIEDERS

##### Zorgaanbieders met bopz-aanmerking – account aanmaken

Zorgaanbieders met locaties met een bopz-aanmerking zijn automatisch in het locatieregister opgenomen. Besturen van deze instellingen hebben hierover een brief ontvangen. In deze brief staat uitgelegd hoe u een emailadres kunt koppelen aan het account van uw instelling en vervolgens kunt inloggen op het locatieregister.

Stuur hiervoor een email met de naam van uw zorginstelling, het KvK nummer en het emailadres dat u wilt gebruiken voor het beheer naar [locatieregister@minvws.nl](mailto:locatieregister@minvws.nl). Binnen twee werkdagen wordt dit emailadres aan uw account gekoppeld.

##### Nieuwe zorgaanbieders – account aanmaken

Zorgaanbieders die op dit moment niet in het bopz-register staan en een locatie op willen nemen in het register, moeten eerst een account voor hun instelling aanmaken.  Stuur hiervoor een email met de naam van uw zorginstelling, het KvK nummer en het emailadres dat u wilt gebruiken voor het beheer naar [locatieregister@minvws.nl](mailto:locatieregister@minvws.nl). Binnen twee werkdagen wordt uw account aangemaakt.

##### Inloggen op uw account

Klik rechtsboven op inloggen en log in met uw emailadres en wachtwoord.

##### Wachtwoord vergeten

Bent u uw wachtwoord vergeten? Klik in het inlogscherm op “forgot password” en vul het e-mailadres van uw account in. Volg de instructies van de mail om een nieuw wachtwoord in te stellen.

##### Hoe kom ik erachter wie de beheerder van het account van de zorgaanbieder is?

Als uw zorgaanbieder in het locatieregister geregistreerd is, maar u weet niet wie er in uw organisatie beheerder is van het account van uw organisatie, dan kunt u contact opnemen met [locatieregister@minvws.nl](mailto:locatieregister@minvws.nl).

##### Iemand anders machtigen

Het is op dit moment nog niet mogelijk om iemand anders in uw organisatie te machtigen. Hier wordt aan gewerkt. De verwachting is dat het vanaf de eerste helft van december wel mogelijk is.

##### Locatie toevoegen

Klik op “bewerk zorgaanbieder” rechtsboven op de pagina van uw organisatie. Klik vervolgens in het menu links op “locaties”. U voegt een locatie toe aan het register door op “nieuwe locatie” te klikken. Als u het vestigingsnummer van een locatie toevoegt, dan worden de adresgegevens automatisch uit het handelsregister van de KvK opgenomen. U bent verplicht om de velden met een * in te vullen. Sla vervolgens de toevoegingen op.

Let op. Zodra u een locatie heef opgeslagen kan deze niet meer worden verwijderd.

##### Locatie bewerken

Klik op “bewerk zorgaanbieder” rechtsboven op de pagina van uw organisatie. Klik vervolgens in het menu links op “locaties”. U bewerkt een locatie door op de betreffende locatie te klikken. Als u het vestigingsnummer van een locatie toevoegt, dan worden de adresgegevens automatisch uit het handelsregister van de KvK opgenomen. De adresgegevens opgehaald uit het handelsregister kunt u niet in het locatieregister bewerken (zie Koppeling handelsregister KvK). De overige informatie kunt u wel bewerken. Sla vervolgens de wijzigingen op.

##### Locatie op inactief zetten

Klik op “bewerk zorgaanbieder” rechtsboven op de pagina van uw organisatie. Klik vervolgens in het menu links op “locaties”. Zoek de te wijzigen locatie. U kunt op twee manieren de locatie op inactief zetten: zorg dat de vinkjes van zowel de Wvggz als de Wzd uit staan óf vul een einddatum van de locatie in. Sla vervolgens de wijzigingen op.

##### Locatie verwijderen

Klik op uw zorgaanbieder in de lijst. Klik op “bewerk zorgaanbieder” rechtsboven op de pagina van uw organisatie. Klik vervolgens in het menu links op “locaties”. Zoek de te verwijderen locatie op en klik rechts onderaan op de locatiepagina op het rode prullenbakje.

##### Overzicht locaties van één zorgaanbieder

U kunt in het linker menu filteren op adres, naam of nummer.

##### Toevoegen of wijzigen van meerdere locaties

Op dit moment is het niet mogelijk om in het register gegevens van meerdere locaties tegelijkertijd te wijzigen of toe te voegen. Veranderingen kunt per locatie in het register doorvoeren. Mocht u de gegevens van grote hoeveelheden locaties willen toevoegen of wijzigen, dan kunt u een bericht sturen aan [locatieregister@minvws.nl](mailto:locatieregister@minvws.nl) om te bespreken of een andere oplossing mogelijk is.

##### Koppeling handelsregister KvK

U kunt de gegevens die op basis van uw vestigingsnummer zijn opgehaald uit het handelsregister niet wijzigen in het locatieregister om te voorkomen dat er discrepantie bestaat tussen beide registers. Als de gegevens niet juist zijn kunt u deze wijzigen in het handelsregister. Daarvoor verwijs ik u naar [inschrijven vestiging onderneming](https://www.kvk.nl/inschrijven-en-wijzigen/inschrijven-vestiging-onderneming/). Indien een wijziging juist en volledig wordt doorgegeven, wordt het na ontvangst binnen enkele werkdagen in het handelsregister verwerkt. Vervolgens kunt u de gegevens ophalen in het locatieregister.

Mocht er een urgente situatie zijn, waardoor het niet mogelijk is om te wachten tot de wijziging in het handelsregister is verwerkt, dan is er een tijdelijke oplossing in het locatieregister mogelijk. U kunt een nieuwe locatie aanmaken zonder vestigingsnummer. U kunt dan handmatig de (adres)gegevens invoeren en de locatie laten opnemen in het locatieregister.

##### Verwijderen zorgaanbieder

U kunt de zorgaanbieder niet verwijderen, neem hiervoor contact op met het locatieregister.

#### INFORMATIE VOOR RAADPLEGERS

##### Locatie of zorgaanbieder zoeken

U kunt links in het zoekveld een zorgaanbieder of locatie zoeken op naam, adres of KvK nummer. Wanneer u op de naam van de zorgaanbieder klikt kan het zijn dat deze meerdere locaties heeft. U kunt in het linker menu locaties filteren op adres, naam of nummer.

##### Overzicht exporteren

U kunt het complete register downloaden vanaf de [homepage](https://locatieregister.dwangindezorg.nl) door te klikken op de knop “download het register als CSV”.

Indien u een gedeelte van het register wilt downloaden kunt u dit doen door deze via het linker menu te filteren en te klikken op “download selectie als CSV". Dit kan ook na selectie van één zorgaanbieder.

##### Historie van een locatie

De historie van een locatie kunt u inzien door te klikken op de desbetreffende locatie. Hier vindt u de datum van de laatste wijziging van de locatiegegevens. Voor een uitgebreider historisch overzicht van de locatie kunt u contact opnemen met het [locatieregister](mailto:locatieregister@minvws.nl).`;

export const AboutPage = () => ({
  view: () =>
    m('.row', [
      m(SlimdownView, { md, className: 'normalized' }),
    ]),
});
