# PKI Certificaten aanmaken

De gevolgde procedure om PKIo certificaten aan te maken is gebaseerd op de beschrijving van het SP, die [hier](https://git.overheid.standaardplatform.rijksapps.nl/ienw/sp/apps/spri-pkio-cert) te vinden is.

We hebben 4 certificaten nodig: 1 voor de app in de productieomgeving en 1 voor keycloak. Idem voor de testomgeving.

Locatieregister.dwangindezorg.nl met san:
Login.locatieregister.dwangindezorg.nl

Test.locatieregister.dwangindezorg.nl met san:
Login-test.locatieregister.dwangindezorg.nl

## Stap 1

Genereer de keypairs:

```bash
mkdir -p ./generated

openssl genrsa 4096 > ./generated/locatieregister_dwangindezorg_nl.key
openssl genrsa 4096 > ./generated/login_locatieregister_dwangindezorg_nl.key
openssl genrsa 4096 > ./generated/test_locatieregister_dwangindezorg_nl.key
openssl genrsa 4096 > ./generated/login-test_locatieregister_dwangindezorg_nl.key
```

## Stap 2

Voor een CSR (Certificate Service Request) heb je een aantal gegevens nodig:

- CN: CommonName (deze wordt voor client certificaten gebruikt om de machine (hier: de namespace) te identificeren): vws-locr-tst en vws-locr-prd. In dit geval heb ik echter gekozen voor de FQDN.
- OU: OrganizationalUnit: Curatieve Zorg
- O: Organization: Ministerie van Volksgezondheid, Welzijn en Sport
- L: Locality: Den Haag
- S: StateOrProvinceName, Zuid-Holland
- C: CountryName: NL

```bash
cd generated

openssl req -new -sha256 -key locatieregister_dwangindezorg_nl.key \
  -subj "/C=NL/ST=Zuid-Holland/L=Den Haag/O=Ministerie van Volksgezondheid, Welzijn en Sport/OU=Curatieve Zorg/CN=locatieregister.dwangindezorg.nl" \
    > locatieregister_dwangindezorg_nl.csr
openssl req -new -sha256 -key login_locatieregister_dwangindezorg_nl.key \
  -subj "/C=NL/ST=Zuid-Holland/L=Den Haag/O=Ministerie van Volksgezondheid, Welzijn en Sport/OU=Curatieve Zorg/CN=login.locatieregister.dwangindezorg.nl" \
    > login_locatieregister_dwangindezorg_nl.csr
openssl req -new -sha256 -key test_locatieregister_dwangindezorg_nl.key \
  -subj "/C=NL/ST=Zuid-Holland/L=Den Haag/O=Ministerie van Volksgezondheid, Welzijn en Sport/OU=Curatieve Zorg/CN=test.locatieregister.dwangindezorg.nl" \
    > test_locatieregister_dwangindezorg_nl.csr
openssl req -new -sha256 -key login-test_locatieregister_dwangindezorg_nl.key \
  -subj "/C=NL/ST=Zuid-Holland/L=Den Haag/O=Ministerie van Volksgezondheid, Welzijn en Sport/OU=Curatieve Zorg/CN=login-test.locatieregister.dwangindezorg.nl" \
    > login-test_locatieregister_dwangindezorg_nl.csr
```
