# React Szkolna 
Jest to oparta na react'cie projekt współpracujący z bazą danych

### Instalacja

Zainstalowanie Node.js
Zainstalowanie Dockera.

Zainstalowanie odpowiednich komponentów za pomocą npm i react-router-dom,  w kliencie jak i po stronie serwera npm i cors , npm i jsonwebtoken

Uruchomienie:

Po stronie serwera uruchomić npm start w projekcie oraz w folderze docker uruchomić go komendą docker-compose up

Po stronie klienta uruchomić npm start w projekcie

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
