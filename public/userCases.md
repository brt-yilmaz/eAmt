1. Sign Up mit vollständiger Verifizierung
   User klickt auf den Button Sign-In, das Sign-In Formular öffet sich und danach klickt der User auf 'Registrieren'
   Danach muss er die unten stehende Daten ***alle*** eingeben
-Vorname
-Name
- Strasse
- Hausnummer
- PLZ
- Ort
- Land
-Geburtsdatum (Verifikation im Frontend und Backend)
- Steuer-ID (Verifikation im Frontend und Backend)
- Email-Adresse (Verifikation im Frontend und Backend)
- nur wenn alle Daten eingegeben sind, dann aktiviert sich der Button 'Registrieren'
- nach Eingabe all dieser Daten und erfolgter Validierung im Frontend klickt der User den Button 'Registrieren' und diese Daten werden an das Backend gesendet
- das Backend erzeugt nun einen Token (hochverschlüsselt) und einen Aktivierungscode
- danach wird der Aktivierungscode mit der Post per Einschreiben an die hinterlegte Postadresse in Deutschland gesendet
- wenn die Post angekommen ist, dann kann sich der User mit seiner SteuerID und dem Aktivierungscode sein Konto freischalten (Aktivierungslink im Login Formular)
- SteuerID und Aktivierungscode werden an das Backend gesendet
- das Backend prüft das Vorhandensein von  SteuerID und Aktivierungscode in der Datenbank
- der Einfachheit halber gehen wir von der Richtigkeit der Daten aus
- das Backend erzeugt nun ein zufälliges Passwort und sendet dieses an die Emailadresse des Users
- der User kann sich nun mit dem zufälligen Passwort und seiner SteuerID im System anmelden
- damit ist der User registriert und gleichzeitig auch angemeldet
  

2. Sign-In Prozess
- User klickt auf Anmelden
- Log In Formular öffnet sich
- User gibt im Feld Steuer-ID seine Steuer-ID ein, die Anzahl und das format der Eingabefelder ist vorgegeben, der User kann den Sendebutton nur klicken, wenn das Format korrekt ist
- sobald die Steuer-ID korrekt eingegeben wurde, muss er ein Passwort eingeben
- nach Eingabe von korrekter Steuer-ID und Passwort wird der Sendebutton aktiviert
- der Benutzer muss nun den Sendebutton anklicken
- die Daten werden an das Backend gesendet
- dort findet zunächst nochmals eine Validierung des Formats der Steuer-ID statt
- danach wird geprüft ob die Steuer-ID in der Datenbank (mongodb) bereits vorhanden ist
- ist die Steuer-ID nicht vorhanden, dann sendet das Backend eine Message an das Frontend, bspw: "Benutername oder Passwort falsch. Bitte registrieren Sie sich oder nutzen Sie die Funktion "Passwort vergessen"
  
- ist die Steuer-ID in der Datenbank vorhanden, dann wird das Passwort validiert, d.h. das vom User eingegebene Passwort  wird im Backend verschlüsselt und danach mit dem in der Datenbank hinterlegten und bereits verschlüsselten Passwort verglichen
- stimmen die Passwörter nicht überein, dann sendet das Backend eine Message an das Frontend, bspw: "Benutername oder Passwort falsch. Bitte registrieren Sie sich oder nutzen Sie die Funktion "Passwort vergessen"
- stimmen die Passwörter überein, dann erstellt das Backend einen einmaligen Token mit dem Ablaufdatum nach zehn-minütiger Inaktivität
- dieser Token wird an das Frontend gesendet und dort entweder im Local Storage oder als Cookie gespeichert
- der User ist damit im System angemeldet und der Linktext 'Sign In' ändert sich in 'Sign Out'
Danach ist der Benutzer angemeldet und kann die digitalen Dienstleistungen abrufen.



3. Nach dem ersten Login sieht der angemeldete Benutzer alle für ihn erstellten Dokumente in digitaler Form
