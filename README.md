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

2. Kreiranje i upravljanje prozorima pomoću `BrowserWindow` modula

U Electron aplikacijama, svaki prozor predstavlja instancu klase `BrowserWindow`. Glavni proces koristi ovaj modul za kreiranje i upravljanje prozorima koji čine korisnički interfejs aplikacije.

* Kreiranje prozora
Klasa `BrowserWindow` omogućava definisanje i otvaranje novih prozora. Prilikom kreiranja mogu se podesiti različite opcije, kao što su dimenzije, pozicija, naslov prozora, kao i ponašanje prilikom minimizacije i zatvaranja.

* Prikaz sadržaja
Prozor učitava i prikazuje HTML, CSS i JavaScript/Typescript sadržaj koji se izvršava u render procesu. Sadržaj može biti lokalna HTML stranica ili dinamički generisan interfejs koji koristi podatke sa API-ja i drugih servisa.

* Upravljanje prozorima
Glavni proces može u svakom trenutku kontrolisati otvorene prozore. Omogućene su operacije poput promene veličine, minimizacije, zatvaranja, prikaza u System Tray-u, kao i dodavanja menija, notifikacija i drugih funkcionalnosti.

### Primer kreiranja prozora
```ts
import { app, BrowserWindow } from 'electron'
import path from 'path'

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000') // Load dev server in development mode
  } else {
    mainWindow.loadFile(path.join(__dirname, 'index.html')) // Load built files in production
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

 3. Upravljanje životnim ciklusom aplikacije

Glavni proces u Electron-u ima ključnu ulogu u upravljanju celokupnim životnim ciklusom aplikacije, od njenog pokretanja pa sve do gašenja.

### Pokretanje aplikacije

* Prilikom startovanja aplikacije, prvo se izvršava glavni proces. Njegov zadatak je da obavi početnu konfiguraciju, inicijalizuje potrebne resurse i kreira početne prozore koji će biti prikazani korisniku.

### Praćenje stanja aplikacije

* Tokom rada aplikacije, glavni proces nadgleda otvorene prozore i reaguje na različite događaje sistema. Kada se svi prozori zatvore, aplikacija se u većini operativnih sistema automatski gasi. Na pojedinim platformama, kao što je macOS, aplikacija može ostati aktivna i bez otvorenih prozora, dok glavni proces i dalje upravlja njenim stanjem.

### Izvršavanje završnih operacija

* Pre potpunog gašenja aplikacije moguće je izvršiti dodatne zadatke, kao što su čuvanje korisničkih podataka, oslobađanje zauzetih resursa ili završavanje pozadinskih procesa. Na ovaj način se obezbeđuje pravilno zatvaranje aplikacije bez gubitka podataka.

### Primer upravljanja životnim ciklusom aplikacije u glavnom procesu
```javascript
// Nakon inicijalizacije aplikacije kreira se glavni prozor
app.whenReady().then(createWindow);

// Prati događaj zatvaranja svih otvorenih prozora
app.on("window-all-closed", () => {
  // Zatvara aplikaciju i oslobađa referencu na prozor
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

// Aktivira se kada aplikacija ponovo dobije fokus
app.on("activate", () => {
  // Kreira novi prozor ukoliko nijedan nije otvoren
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```
## Renderer proces u Electron aplikaciji

Renderer proces u Electron aplikaciji zadužen je za prikaz i izvršavanje web sadržaja (HTML, CSS i JavaScript) unutar prozora aplikacije. Svaki prozor aplikacije ima svoj zaseban renderer proces, što znači da više prozora može raditi nezavisno, dok se komunikacija sa glavnim procesom odvija putem IPC (Inter-Process Communication) mehanizma.



### 1. Prikaz web sadržaja

### Renderovanje HTML, CSS i JavaScript-a
Renderer proces koristi Chromium engine za prikaz sadržaja, slično kao web pregledač. Njegova uloga je da renderuje korisnički interfejs, koji može biti statički (HTML + CSS) ili dinamički, gde JavaScript omogućava interakciju sa serverom ili backend logikom.

### Izolacija i sigurnost
Renderer proces radi u izolovanom okruženju radi veće sigurnosti aplikacije. Zbog toga nema direktan pristup Node.js API-jima niti operativnom sistemu. Umesto toga, koristi preload skripte ili IPC mehanizme za bezbednu komunikaciju sa glavnim procesom i razmenu podataka.

### Context Isolation
Electron implementira context isolation koji sprečava direktno menjanje globalnih objekata i pristup glavnom procesu bez kontrole. Ova zaštita značajno smanjuje rizik od napada poput Cross-Site Scripting (XSS). Preload skripte služe kao siguran način da se eksplicitno izlože API funkcionalnosti renderer procesu.

### 2. Komunikacija sa glavnim procesom

IPC (Inter-Process Communication) u Electron aplikaciji omogućava komunikaciju između renderer procesa i glavnog procesa. Renderer proces koristi ovu komunikaciju za slanje zahteva glavnom procesu, na primer za čitanje i upis u konfiguracioni fajl ili za izvršavanje operacija koje nisu dostupne u renderer okruženju.

U ovoj aplikaciji renderer proces nema direktan pristup `ipcRenderer` modulu. Umesto toga, komunikacija se ostvaruje kroz `preload` fajl pomoću `contextBridge` API-ja.



 Preload (bridge sloj)

```ts
import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args),
    );
  },

  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },

  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },

  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
});

contextBridge.exposeInMainWorld("electronAPI", {
  readFile: async () => {
    return await ipcRenderer.invoke("read-file");
  },

  writeFile: async (data: {
    TimeToSleep: number | string;
    SleepCycle: number | string;
    ThemeColor: string;
  }) => {
    return await ipcRenderer.invoke("write-file", data);
  },
});
```
 Main process (ipcMain handlers)

```ts
import { ipcMain } from "electron";
import fs from "fs/promises";


//Read config file
ipcMain.handle("read-file", async () => {
  const filePath = getConfigFilePath();

  try {
    await ensureConfigFile();
    const data = await fs.readFile(filePath, "utf8");

    return { content: data };
  } catch (err) {
    return { error: "Failed to read file", content: "" };
  }
});

//Write config file
ipcMain.handle(
  "write-file",
  async (_event, { TimeToSleep, SleepCycle, ThemeColor }) => {
    if (TimeToSleep == null || SleepCycle == null || !ThemeColor) {
      return {
        error: "Please provide TimeToSleep, SleepCycle, and ThemeColor",
      };
    }

    const filePath = getConfigFilePath();

    const content =
      `TimeToSleep: ${TimeToSleep}\nSleepCycle: ${SleepCycle}\nThemeColor: ${ThemeColor}`;

    try {
      await fs.writeFile(filePath, content, "utf8");
      return { message: "File created/updated successfully" };
    } catch (err) {
      return { error: "Failed to write file" };
    }
  }
);
```

### 3. Sigurnosni most: Preload skripte

#### Koncept
Kao što je navedeno u prethodnom segmentu, Renderer proces ima strogu zabranu direktnog pozivanja Node.js API-ja iz bezbednosnih razloga. Tu na scenu stupa preload skripta koja deluje kao kontrolisani posrednik. Ona omogućava veb stranici da koristi specifične Node.js funkcionalnosti, ali isključivo u strogo definisanom i izolovanom okruženju.

#### Kako radi
Ove skripte se izvršavaju prve – pre nego što se učita bilo koji deo korisničkog interfejsa ili veb sadržaja. Na taj način se kreira siguran kanal za komunikaciju (API) koji Renderer može da koristi bez izlaganja celog sistema riziku.

#### Primer preload skripte (`preload.ts`)

U Electronu se bezbedno izlaganje funkcionalnosti obavlja pomoću `contextBridge` modula. Putem metode `ipcRenderer.invoke` aplikacija asinhrono komunicira sa glavnim procesom, vraćajući Promise objekt nazad rendereru. Primer prikazuje implementaciju sa strogo tipiziranim parametrima u TypeScript-u:

```ts
const { contextBridge, ipcRenderer } = require('electron');

// Bezbedno izlaganje API-ja Renderer procesu putem globalnog objekta 'window.electronAPI'
contextBridge.exposeInMainWorld("electronAPI", {
  // Asinhrono čitanje konfiguracionog fajla
  readFile: async () => {
    try {
      const result = await ipcRenderer.invoke("read-file");
      return result;
    } catch (err) {
      console.error("readFile failed:", err);
      return { content: "", error: "Failed to read file" };
    }
  },

  // Asinhrono pisanje u konfiguracioni fajl sa definisanim TypeScript tipovima
  writeFile: async (data: {
    TimeToSleep: number | string;
    SleepCycle: number | string;
    ThemeColor: string;
  }) => {
    try {
      const result = await ipcRenderer.invoke("write-file", data);
      return result;
    } catch (err) {
      console.error("writeFile failed:", err);
      return { error: "Failed to write file" };
    }
  },
});
```

### 4. Sigurnost i izolacija procesa

#### Kontekstna izolacija (Context Isolation)
Sa uključenom kontekstnom izolacijom, koja predstavlja podrazumevani bezbednosni standard u savremenim verzijama Electron-a, Renderer proces je u potpunosti odvojen od Main procesa i operativnog sistema. To znači da klijentski kod ne može direktno da manipuliše globalnim varijablama niti da pristupi Node.js API-jima, osim ukoliko mu te funkcionalnosti nisu eksplicitno i bezbedno delegirane putem preload skripte. 

Ovakav bezbednosni model drastično smanjuje površinu za napad, jer efikasno sprečava potencijalno zlonamerni JavaScript kod unutar korisničkog interfejsa da ostvari direktan pristup kritičnim sistemskim resursima.

#### Integracija Node.js okruženja (nodeIntegration)
Iz bezbednosnih razloga, stroga je preporuka da opcija `nodeIntegration` ostane isključena (`false`) unutar Renderer procesa. Ukoliko bi se ova opcija omogućila, veb stranica bi dobila punu slobodu da direktno poziva Node.js module (poput `fs` ili `child_process`). To predstavlja ogroman bezbednosni rizik, naročito ukoliko aplikacija u nekom trenutku renderuje eksterni ili potencijalno neprovereni veb sadržaj.

#### Primer bezbedne konfiguracije prozora (`main.ts`)

Prilikom kreiranja glavnog prozora aplikacije u Main procesu, ove bezbednosne smernice se implementiraju kroz `webPreferences` konfiguraciju, čime se obezbeđuje puna izolacija koda:

```typescript
import { BrowserWindow } from 'electron';
import * as path from 'path';

let win: BrowserWindow;

win = new BrowserWindow({
  icon: iconPath,
  minHeight: 800,
  minWidth: 600,
  // autoHideMenuBar: true,
  webPreferences: {
    // Učitavanje preload skripte sa .mjs ekstenzijom (ES modul)
    preload: path.join(__dirname, "preload.mjs"),
    
    // Eksplicitno uključivanje izolacije konteksta radi bezbednosti
    contextIsolation: true,
    
    // Onemogućavanje direktne Node.js integracije u rendereru
    nodeIntegration: false,
  },
});
```

### 5. Životni ciklus Renderer procesa

#### Pokretanje i zatvaranje prozora
Vek trajanja Renderer procesa je direktno vezan za instancu prozora u kojem se izvršava. Renderer proces se inicijalizuje u trenutku kada Main proces kreira novi prozor pomoću klase `BrowserWindow`. Između prozora i procesa postoji relacija jedan-prema-jedan: svaki prozor pokreće sopstveni, izolovani renderer proces. Onog trenutka kada korisnik zatvori prozor (ili kada se on programski zatvori), pripadajući renderer proces se uništava, što dovodi do automatskog oslobađanja svih sistemskih resursa i memorije koje je taj prozor zauzimao.

#### Rad sa više prozora i performanse
Electron arhitektura podržava kreiranje neograničenog broja prozora unutar jedne aplikacije. S obzirom na to da svaki prozor operiše u okviru svog nezavisnog renderer procesa, eventualno rušenje ili blokiranje koda u jednom prozoru (npr. zbog zahtevne operacije) neće uticati na stabilnost i rad ostalih delova aplikacije. Ovaj višenitni pristup (multi-process architecture) značajno poboljšava performanse, stabilnost i fleksibilnost aplikacije, jer efikasno raspoređuje opterećenje na nivou operativnog sistema.

# Prednosti i mane Electron platforme

Prilikom razvoja desktop aplikacija pomoću Electron-a, neophodno je napraviti balans između brzine razvoja i performansi same aplikacije. Ispod je detaljan pregled ključnih prednosti i nedostataka ovog tehnološkog stoga.

#### Prednosti

| Stavka | Opis |
| :--- | :--- |
| **Unificirana kodna baza** | Razvoj se vrši jednom, a aplikacija nativno radi na Windows, macOS i Linux operativnim sistemima. Ovo eliminiše potrebu za održavanjem tri različita tima i tehnologije. |
| **Ubrzan razvojni ciklus** | Oslanjanje na standardne veb tehnologije omogućava direktnu integraciju modernih radnih okvira i biblioteka kao što su React, Vue.js, Redux i Axios. |
| **Pristup sistemskim resursima** | Zahvaljujući integraciji Node.js okruženja, aplikacija ima direktan i jednostavan pristup lokalnom fajl sistemu, bazama podataka i hardverskim funkcionalnostima uređaja. |
| **Pojednostavljena distribucija** | Electron pruža robusne alate za pakovanje aplikacije u izvršne fajlove (poput `.exe`, `.dmg` ili `.deb`), što krajnjim korisnicima maksimalno olakšava proces instalacije. |
| **Efikasna prototipizacija** | Programeri sa iskustvom u veb razvoju mogu u izuzetno kratkom roku kreirati funkcionalan i stabilan prototip kompleksne desktop aplikacije. |

#### Mane

| Stavka | Opis |
| :--- | :--- |
| **Značajna veličina paketa** | S obzirom na to da svaka Electron aplikacija u sebi mora da sadrži kompletan Chromium endžin i Node.js runtime, čak i najjednostavnije aplikacije u startu zauzimaju preko 100 MB disk prostora. |
| **Visoka potrošnja resursa** | Zbog paralelnog rada Chromium-a i Node.js procesa, ove aplikacije zahtevaju znatno više RAM memorije i CPU resursa u poređenju sa nativnim rešenjima, što je posebno primetno na slabijim uređajima. |
| **Odsustvo nativnog osećaja** | Iako interfejs može precizno da simulira desktop okruženje, renderovanje kroz Chromium može rezultovati time da UI deluje manje fluidno, "teže" ili neprirodno u poređenju sa nativnim aplikacijama operativnog sistema. |
| **Zavisnost od ažuriranja** | Praćenje najnovijih verzija Electrona zahteva redovno usklađivanje sa novim verzijama Chromium-a i Node.js-a, što sa sobom nosi rizik od narušavanja kompatibilnosti sa starijim eksternim bibliotekama. |
| **Kompleksniji bezbednosni model** | Istovremeno izvršavanje veb koda i Node.js komandi unutar iste aplikacije otvara prostor za ozbiljne bezbednosne propuste ukoliko se striktno ne implementiraju izolacija konteksta i restriktivne IPC dozvole. |


# Preduslovi za rad

Pre nego što započnete sa razvojem Electron aplikacije, neophodno je da na svom računaru imate instalirane sledeće alate i razvojna okruženja:

### 1. Node.js i npm
**Node.js** je JavaScript runtime okruženje koje omogućava izvršavanje JavaScript koda van veb pregledača (na serverskoj ili lokalnoj strani), dok je **npm** (Node Package Manager) podrazumevani menadžer paketa koji služi za instalaciju i upravljanje bibliotekama unutar projekta.

Da biste proverili da li su ovi alati već instalirani na vašem sistemu, otvorite terminal ili komandnu liniju (Terminal / Command Prompt) i pokrenite sledeće komande:

```bash
# Provera instalirane verzije Node.js-a
node -v

# Provera instalirane verzije npm-a
npm -v
```

### 2. Pretraga i instalacija Electron-a
Nakon što uspešno podesite Node.js i npm okruženje, prelazite na instalaciju samog Electron-a. Kako biste imali slobodu da ga pokrenete unutar bilo kog direktorijuma na vašem računaru, preporučuje se globalna instalacija. Ovaj proces pokrećete izvršavanjem sledeće naredbe u terminalu:

```bash
npm install -g electron
```
# Kreiranje i podešavanje Electron + React aplikacije (Vite)

Pošto je osnova aplikacije kreirana pomoću modernog alata **Vite**, proces inicijalizacije se sastoji od generisanja React šablona, a zatim integracije Electron okruženja u zajednički projekat.

#### Korak 1: Kreiranje React aplikacije preko Vite-a
Prvo pokrenite zvanični Vite generator koji postavlja celokupnu strukturu za React aplikaciju:

```bash
npm create vite@latest my-react-app -- --template react
```
#### Korak 2: Instalacija Electron platforme i dodataka
Za optimalno povezivanje Vite razvojnog servera i Electron procesa koristi se dodatak `vite-plugin-electron`. Ovaj dodatak potpuno automatizuje prevođenje (build) Electron fajlova i omogućava im da se neometano izvršavaju uporedo sa Vite okruženjem.

Instalirajte Electron i pripadajući Vite dodatak kao razvojne zavisnosti (`devDependencies`) unutar projekta:

```bash
npm install electron vite-plugin-electron --save-dev
```
Korak 3: Konfiguracija Vite-a za Electron (TypeScript)

Vite je inicijalno podešen da pokreće aplikaciju u veb pretraživaču. Da bismo mu rekli da radimo na desktop aplikaciji i da treba da obradi naš TypeScript kod za Electron, moramo povezati instalirani dodatak u konfiguracionom fajlu.

Otvorite fajl `vite.config.ts` (nalazi se u korenu projekta) i izmenite ga tako da izgleda ovako:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    react(),
    electron({
      // Ukazujemo Vite-u na glavnu TypeScript datoteku Electron procesa
      entry: 'electron/main.ts',
    }),
  ],
})
```
Korak 4: Kreiranje glavnog procesa Electron-a u TypeScript-u

Vite je kroz svoj šablon automatski kreirao sve fajlove potrebne za React interfejs (`index.html`, `src/App.tsx`, `src/main.tsx`...). Sada moramo kreirati fajl koji upravlja samim desktop prozorom, njegovim dimenzijama i ponašanjem, koristeći TypeScript.

1. U korenu vašeg projekta napravite novi folder sa imenom `electron`.
2. Unutar tog foldera kreirajte fajl `main.ts` (obratite pažnju na `.ts` ekstenziju).

U novokreirani fajl `electron/main.ts` dodajte sledeći kod:

```ts
import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { spawn } from "node:child_process"; // (trenutno se ne koristi, može se obrisati ako ne treba)

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Root folder aplikacije
process.env.APP_ROOT = path.join(__dirname, "..");

// Putanje za dev i build okruženje
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

// Public folder zavisi da li je dev ili production
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

// Kreiranje glavnog prozora aplikacije
function createWindow() {
  // Ikonica zavisi od okruženja (dev/prod)
  const iconPath = VITE_DEV_SERVER_URL
    ? path.join(process.env.VITE_PUBLIC, "logo.png")
    : path.join(RENDERER_DIST, "logo.png");

  win = new BrowserWindow({
    icon: iconPath,
    minHeight: 800,
    minWidth: 600,
    autoHideMenuBar: true, // sakriva meni
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // preload skripta
      nodeIntegration: false, 
    },
  });

  // U dev modu koristi Vite server, inače učitava build fajl
  win.loadURL("http://localhost:3000");

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  // Kada se stranica učita, šalje poruku u renderer proces
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send(
      "main-process-message",
      new Date().toLocaleString()
    );
  });
}

// Kada je Electron spreman, pokreni aplikaciju
app.whenReady().then(() => {
  createWindow();
});
```

## Pokretanje aplikacije

Funkcija `createWindow()` se izvršava odmah nakon inicijalizacije Electron-a, zahvaljujući `app.whenReady()` promisu koji signalizira da je aplikacija spremna za podizanje GUI-ja. To je ujedno i najbolje mesto u kodu za kreiranje početnog prozora.
```ts
app.whenReady().then(createWindow);
```
## Zatvaranje aplikacije
```ts
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
     app.quit()
   }
 })
```
Ovaj event se aktivira kada se zatvore svi prozori aplikacije. Kada se to desi, pokreće se funkcija koja zatvara cijelu aplikaciju pomoću app.quit(). Time se osigurava da se proces aplikacije ne nastavlja raditi u pozadini nakon što korisnik zatvori sve prozore, već da se aplikacija uredno i potpuno ugasi.

Korak 5: Pošto koristimo Vite šablon za React aplikaciju uz integraciju Electron-a, u `package.json` fajlu se nalaze automatski generisane skripte. Ključna komanda za pokretanje razvojnog okruženja je `dev`, koja pokreće Vite razvojni server, dok se Electron proces automatski povezuje i izvršava putem `vite-plugin-electron` konfiguracije.

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build && electron-builder",
  "vitebuild": "vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "start": "concurrently \"npm run dev\" \"npm run electron\""
}
```
Pokretanje kompletnog razvojnog procesa vrši se jednostavnim izvršavanjem sledeće naredbe u terminalu:

```bash
npm run dev
```

## Pakovanje Electron aplikacije (Vite + React)

Da bi se Electron aplikacija upakovala u distributivni format (npr. `.exe` za Windows, `.dmg` za macOS ili `.AppImage` za Linux), koristi se alat `electron-builder`.

Pošto je projekat zasnovan na Vite + React + Electron integraciji, build proces uključuje i frontend (Vite) i Electron desktop deo.

### 1. Instalacija electron-builder-a

Sledeća komanda instalira `electron-builder` kao razvojnu zavisnost:

```bash
npm install electron-builder --save-dev
```

### 2. Konfiguracija electron-builder-a

U `package.json` se dodaje konfiguracija za pakovanje aplikacije:

```json
 "build": {
    "appId": "com.ASEP.id",
    "productName": "ASEP",
    "directories": {
      "output": "dist/build"
    },
    "files": [
      "dist/**/*",
      "dist-electron/**/*",
      "backend/**/*",
      "package.json",
      "node_modules/**/*",
      "public/**/*"
    ],
    "extraResources": [
      {
        "from": "backend",
        "to": "backend",
        "filter": [
          "**/*"
        ]
      }
    ],
    "win": {
      "icon": "public/logo.ico",
      "target": "nsis"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true
    },
    "mac": {
      "icon": "public//logo.ico",
      "category": "public.app-category.utilities"
    },
    "linux": {
      "target": "AppImage"
    }
  }
```
**Objašnjenje:**
* `dist/**/*` → build-ovana React (Vite) aplikacija
* `electron/**/*` → Electron main i preload proces
* `output` → gde se čuva finalni installer
* `targets` → formati za različite operativne sisteme

### 3. Pakovanje Electron aplikacije
Nakon što je konfigurisan `electron-builder`, proces pakovanja aplikacije se pokreće kroz već definisanu `build` skriptu u `package.json` fajlu.

Ova skripta obuhvata:
* kompilaciju TypeScript koda
* build React (Vite) aplikacije
* pakovanje Electron aplikacije u instalacioni format

```bash
npm run build
```
Ova komanda izvršava sledeće:

```bash
tsc && vite build && electron-builder
```
### 4. Distribucija aplikacije

Nakon uspešnog pakovanja, instalacioni fajlovi se nalaze u `release` (ili `dist`) direktorijumu.

U zavisnosti od operativnog sistema, generišu se:
* `.exe` (Windows)
* `.dmg` (macOS)
* `.AppImage` (Linux)
