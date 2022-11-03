# expensetracker-frontend



[![CI](https://github.com/anagarlau/expensetracker-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/anagarlau/expensetracker-frontend/actions/workflows/ci.yml)




Routes: /auth, /home, /dashboard

A. /auth

- Funktionalität:

  1. Auth mit Spring Security und JWT Tokens 
  2. Register und Login - Jegliche Kontoupdates sind ausgeschlossen


B. /home:

- Funktionalität:

  1. CRUD für Erstellung von Transaktionen je nach Oberkategorie (income, expense) und Unterkategorien (vom User erstellt, s. unten) im Modal.
     1. Create durch Button rechts
     2. Read durch Klick in der Tabellenzeile
     3. Update durch Klick in der Tabellenzeile, neue Eintraege und Klick auf "Edit" Button
     4. Delete durch Klick in der Tabellenzeile und Klick auf "Delete" Button

  2. Balance fuer alle Transaktionen wird in einer computed property berechnet (total expenses - total incomes)
  3. die vom User erstellten Kategorien werden auch dynamisch im Modal je nach Kategorie aufgelistet
  4. Filterleiste fuer Transaktionsname, Kategoriename und Date Ranges zugleich (Balance wird dynamisch neu berechnet)

C. /dashboard: CRD für Kategorien

- Funktionalität:

    1. Create durch Button links
    2. Read nur als Tabelleneintrag
    3. Delete durch Klick auf das Abfallkorb-Icon in der jeweiligen Zeile + Alert für Bestätigung
	
 
