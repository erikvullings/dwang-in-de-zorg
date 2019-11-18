import m from 'mithril';
import { SlimdownView } from 'mithril-ui-form';

const md = `#### PRAKTISCHE HANDLEIDING ZORGAANBIEDERS

De initiële beheerder van een zorgaanbieder's registratie wordt uitgenodigd per brief naar een bij de KvK geregistreerd adres. In de brief bevinden zich een gebruikersnaam (KvK nummer) en een wachtwoord. Hiermee kan men inloggen op deze website, en wijzigingen doorvoeren. Ook is het mogelijk om iemand anders te machtigen die een account heeft. Zie daartoe hieronder.

##### Account aanmaken

Klik rechtsboven op het icoon om in te loggen. U wordt doorverwezen naar een nieuwe pagina. Klik op “register". Vul uw gegevens in en klik weer op “register”. U krijgt een mail om uw account te bevestigen.

##### Inloggen

Klik rechtsboven op inloggen en log in met uw emailadres en wachtwoord.

##### Wachtwoord vergeten

Bent u uw wachtwoord vergeten? Klik in het inlogscherm op “forgot password” en vul het e-mailadres van uw account in. Volg de instructies van de mail om een nieuw wachtwoord in te stellen.

##### Iemand anders machtigen

De initiële beheerder, oftewel eigenaar, kan anderen machtigen om wijzigingen in de registratie door te voeren. Ga daartoe naar het register, log in, en selecteer uw eigen zorgaanbieder. Kies “Bewerk registratie”, en voeg de gebruikersnaam (niet de email, aangezien het hier een openbaar register betreft) van de nieuwe administrator toe bij  “Eigenaar(s)” of “Wijzigingen toestaan van”. Eigenaren kunnen, net als gewone gemachtigden, de registratie wijzigen. Zij zijn echter de enigen die ook anderen kunnen machtigen.

##### Locatie toevoegen

U voegt een locatie toe aan het register door op ‘Nieuwe locatie toevoegen’ te klikken. Als u het vestigingsnummer van een locatie toevoegt, dan worden de adresgegevens automatisch uit het handelsregister van de KvK opgenomen.

U bent verplicht om de velden met een * in te vullen.

##### Locatie op inactief zetten

Klik op “bewerk zorgaanbieder” rechtsboven op de pagina van uw organisatie. Klik vervolgens in het menu links op “locaties”. Zoek de te wijzigen locatie. U kunt op twee manieren de locatie op inactief zetten: zorg dat de vinkjes van zowel de WVGGZ als de WZD uit staan óf vul een einddatum van de locatie in. Sla vervolgens de wijzigingen op.

##### Locatie verwijderen

Klik op “bewerk zorgaanbieder” rechtsboven op de pagina van uw organisatie. Klik vervolgens in het menu links op “locaties”. Zoek de te verwijderen locatie op en klik rechtsonderaan op de locatiepagina op het rode prullenbakje.

##### Overzicht locaties van één zorgaanbieder

U kunt in het linker menu filteren op adres, naam of nummer.

##### Toevoegen of wijzigen van meerdere locaties

Op dit moment is het niet mogelijk om in het register gegevens van meerdere locaties tegelijkertijd te wijzigen of toe te voegen. Veranderingen kunt per locatie in het register doorvoeren. Mocht u de gegevens van grote hoeveelheden locaties willen toevoegen of wijzigen, dan kunt u een bericht sturen aan emailadres ??? om te bespreken of een andere oplossing mogelijk is.

##### Koppeling handelsregister KvK

U kunt de gegevens die op basis van uw vestigingsnummer zijn opgehaald uit het handelsregister niet wijzigen in het locatieregister om te voorkomen dat er discrepantie bestaat tussen beide registers. Als de gegevens niet juist zijn kunt u deze wijzigen in het handelsregister. Daarvoor verwijs ik u naar [inschrijven vestiging onderneming](https://www.kvk.nl/inschrijven-en-wijzigen/inschrijven-vestiging-onderneming/). Indien een wijziging juist en volledig wordt doorgegeven, wordt het na ontvangst binnen enkele werkdagen in het handelsregister verwerkt. Vervolgens kunt u de gegevens ophalen in het locatieregister.

Mocht er een urgente situatie zijn, waardoor het niet mogelijk is om te wachten tot de wijziging in het handelsregister is verwerkt, dan is er een tijdelijke oplossing in het locatieregister mogelijk. U kunt een nieuwe locatie aanmaken zonder vestigingsnummer. U kunt dan handmatig de (adres)gegevens invoeren en de locatie laten opnemen in het locatieregister.

##### Verwijderen zorgaanbieder

U kunt de zorgaanbieder niet verwijderen, neem hiervoor contact op met het locatieregister.

#### PRAKTISCHE HANDLEIDING RAADPLEGERS

##### Locatie of zorgaanbieder zoeken

U kunt links in het zoekveld een zorgaanbieder of locatie zoeken op naam, adres of KvK nummer. Wanneer u op de naam van de zorgaanbieder klikt kan het zijn dat deze meerdere locaties heeft. U kunt in het linker menu locaties filteren op adres, naam of nummer.

##### Waarom staat hetzelfde adres meerdere keren in het register?

Soms verschilt het bij een instelling per afdeling welke verplichte zorg geleverd wordt, daarom staat hetzelfde adres meerdere keren vermeld in het register.

##### Overzicht exporteren

U kunt het complete register downloaden vanaf de [homepage](https://locatieregister.dwangindezorg.nl) door te klikken op de knop “download het register als CSV”.

Indien u een gedeelte van het register wilt downloaden kunt u dit doen door deze via het linker menu te filteren en te klikken op “download selectie als CSV". Dit kan ook na selectie van één zorgaanbieder.

##### Historie van een locatie

De historie van een locatie kunt u inzien door te klikken op de desbetreffende locatie. Hier vindt u de datum van de laatste wijziging van de locatiegegevens. Voor een uitgebreider historisch overzicht van de locatie kunt u contact opnemen met het locatieregister.`;

export const AboutPage = () => ({
  view: () =>
    m('.row', [
      m(SlimdownView, { md, className: 'normalized' }),
    ]),
});
