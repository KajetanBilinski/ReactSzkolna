# React Szkolna 
Jest to oparty na REACT projekt współpracujący z bazą danych. Na stronie obowiązują role wyznaczają różne funkcjonalności między innymi :
modyfikowanie dodawanie jak i usuwanie danych - mogą robić tylko zarejestrowani użytkownicy. Admin inaczej Szef Szkolniaków ma dostęp do dodatkowych podstron i ich funkcji. Zawartość i tematyka strony jest nawiązaniem do popularnego uniwersum szkolnej 17 w którym to główną i najbardziej rozpoznawalną postacią jest Krzysztof Kononowicz. 
### Instalacja

Zainstalowanie Node.js
Zainstalowanie Dockera.

Zainstalowanie odpowiednich komponentów za pomocą npm i react-router-dom,  w kliencie jak i po stronie serwera npm i cors , npm i jsonwebtoken

Uruchomienie:

Po stronie serwera uruchomić npm start w projekcie oraz w folderze docker uruchomić go komendą docker-compose up

Po stronie klienta uruchomić npm start w projekcie

### Instrukcja instalacji

#### 1.  Docker

Zainstalowanie dockera.
Przejście do ścieżki “config/mysql2/db.js” następnie sprawdzenie czy wartość database: ‘SzkolnaBase2’ jest poprawna
Wejście przez terminal do folderu “Docker” oraz wprowadzenie komendy “docker-compose up”
Przez dowolną przeglądarkę wejść na adres “http://localhost:8183”. 
Serwer : mysql
Użytkownik : root 
Hasło : root
Utworzenie nowej bazy danych o nazwie ‘SzkolnaBase2’
Przejście do zakładki SQL i wprowadzenie kodu do utworzenia przykładowych danych oraz tabel.

#### 2.	Node.js

Zainstalowanie Node.js
Uruchomienie “Node.js Command Prompt”
Zainstalowanie potrzebnych bibliotek komendą “npm i”
Po instalacji wszystkiego uruchomienie komendy “npm start”


### Instrukcja obsługi
	Wejście na “http://localhost:3000/Index”.


### Funkcjonalności


Slownik:
Przechowuje słowa oraz tłumaczenia słów, które są niezrozumiałe dla osób nieznających bombaskiego.

Potrawy
Jest to tabela jeden do wiele połączona z tabelą szkolniak (Jeden szkolniak może mieć wiele potraw kuchni bombaskiej)
Przechowuje ono nazwe, opis, składniki, czas przygotowania oraz wartość energetyczną.

Dodatkowe funkcjonalności "Szefa szkolniaków"
Ma on dwie nie nowe zakładki:

Choroszcz:
Zakładka ułatwiająca napisanie wezwania na badania do zakładu Choroszcz, poprzez widoczny schemat 
wraz z mapą pokazującą lokalizację szpitala.

Donos:
Zakładka przekierowująca automatycznie na stronę znanej "Trójki", Komisariatu policji  nr 3 w Białymstoku.

Dodatkowy nadprogramowy język J00R.

Role użytkowników :
Niezalogowany, Zalogowany, Szef Szkolniaków
Tylko Zalogowani mogą modyfikować wszystkie tabele.
Tylko Szef Szkolniaków może mieć dostęp do dodatkowych zakładek.
