Kreiranje aplikacije pomoću Electron-a i React-a je popularna kombinacija za razvoj multiplatformskih desktop aplikacija. Ovaj pristup omogućava programerima da koriste tehnologije web razvoja (HTML, CSS, JavaScript) kako bi pravili desktop aplikacije koje rade na Windows-u, macOS-u i Linux-u.
# Electron Framework
Electron je besplatan alat koji omogućava razvoj desktop aplikacija koje rade na više platformi, a razvila ga je OpenJS fondacija. Ovaj framework koristi web tehnologije poput JavaScript-a, HTML-a i CSS-a, a moguće je integrisati i druge alate, kao što su front-end framework-i. Aplikacije kreirane pomoću Electrona mogu se koristiti na operativnim sistemima poput Windows-a, macOS-a i Linux-a. Ugradnjom Chromium-a i Node.js-a, Electron omogućava da se koristi samo jedan kod za različite platforme, što pojednostavljuje razvoj i distribuciju aplikacija.
# Ključne komponente
### Chromium
Chromium je open-source web pretraživač koji je osnova za Google Chrome, i igra ključnu ulogu u Electron framework-u. Electron koristi Chromium za prikazivanje korisničkog interfejsa aplikacije, omogućavajući programerima da koriste standardne web tehnologije kao što su HTML, CSS i JavaScript za kreiranje UI-a. U suštini, Chromium omogućava da aplikacija izgleda i funkcioniše kao web stranica, ali u desktop okruženju.

### Node.js
Node.js je JavaScript okruženje koje se bazira na Chrome-ovom V8 JavaScript engine-u, a omogućava izvršavanje JavaScript koda na serverskoj strani. Elektron integriše Node.js, što programerima omogućava pristup nativnim funkcijama sistema, kao što su upravljanje datotekama, baza podataka, mrežne konekcije i druge operacije koje bi inače zahtevale korišćenje drugih programskih jezika.

Kombinovanjem Chromium-a i Node.js-a, Electron omogućava razvoj aplikacija koje koriste web tehnologije za korisnički interfejs, ali se mogu ponašati kao nativne desktop aplikacije sa pristupom lokalnim resursima.

# Procesni model
Electron koristi više-procesni (multi-process) arhitektonski model koji potiče iz Chromiuma, što znači da je u tom smislu vrlo sličan modernim web pretraživačima. Ovaj pristup omogućava Electron aplikacijama veću stabilnost i efikasnost. Više-procesni modelu Chromiumu omogućava da svaki tab (stranica) ima svoj proces, što znači da problem u jednom tabu ne utiče na ostatak pretraživača. Electron koristi isti pristup, ali sa dva glavna procesa: glavni proces (main process) i renderer proces (renderer process).
### Glavni proces (Main process)

Glavni proces u Electron-u je odgovoran za nekoliko ključnih funkcionalnosti koje omogućavaju pravilno funkcionisanje desktop aplikacije. On pokreće Node.js okruženje, kreira i upravlja prozorima pomoću BrowserWindow modula i kontroliše životni ciklus aplikacije.
1. Pokreće Node.js okruženje
Glavni proces u Electron-u koristi Node.js kao runtime okruženje, što znači da je u mogućnosti da koristi sve funkcionalnosti koje nudi Node.js. To uključuje pristup lokalnim resursima računara, kao što su fajl sistem, mrežni zahtevi, baze podataka i druge sistemske funkcije.

* Node.js omogućava glavnom procesu da obavlja operacije koje zahtevaju pristup računarskim resursima, kao što su otvaranje fajlova, rad sa direktorijumima, pokretanje eksternih programa, pristup mreži i mnoge druge operacije koje nisu dozvoljene u render procesu (iz sigurnosnih razloga).
* Korišćenjem Node.js u glavnom procesu, Electron aplikacija može da koristi npm pakete i biblioteke koje nisu dostupne u standardnim web okruženjima, čime se omogućava rad sa lokalnim resursima i proširenje funkcionalnosti aplikacije.
