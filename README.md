# expensetracker-frontend

https://expensetracker22-frontend.herokuapp.com/

[![CI](https://github.com/anagarlau/expensetracker-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/anagarlau/expensetracker-frontend/actions/workflows/ci.yml)




Routes: /auth, /home, /dashboard

A. /auth
Funktionalität:
Auth mit Spring Security und JWT Tokens [hab's schnell und immer wieder bereut... ]
Register und Login - Jegliche Kontoupdates sind ausgeschlossen


B. /home:
Funktionalität:
- CRUD für Erstellung von Transaktionen je nach Oberkategorie (income, expense) und Unterkategorien (vom User erstellt, s. unten) im Modal.
    1. Create durch Button rechts
    2. Read durch Klick in der Tabellenzeile
    3. Update durch Klick in der Tabellenzeile, neue Eintraege und Klick auf "Edit" Button
    4. Delete durch Klick in der Tabellenzeile und Klick auf "Delete" Button

- Balance fuer alle Transaktionen wird in einer computed property berechnet (total expenses - total incomes)
- die vom User erstellten Kategorien werden auch dynamisch im Modal je nach Kategorie aufgelistet
- Filterleiste fuer Transaktionsname, Kategoriename und Date Ranges zugleich (Balance wird dynamisch neu berechnet)

C. /dashboard: CRD für Kategorien
Funktionalität:
1. Create durch Button links
2. Read nur als Tabelleneintrag
3. Delete durch Klick auf das Abfallkorb-Icon in der jeweiligen Zeile + Alert für Bestätigung
	
 
