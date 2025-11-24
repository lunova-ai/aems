# IEMS – Vollständige Datenstruktur (Grundlage für Produktivsystem)

Dieses Dokument stellt die vollständige, modular aufgebaute Datenstruktur des IEMS dar – gegliedert nach drei Kernschichten (physische Realität, IEMS-Logik, antifragiles Lernen). Es dient als zentrale Architekturgrundlage für spätere Implementierung, Erweiterung und Anbindung realer Datenquellen.

---

# 1. Organisations- & Standortstruktur

## 1.1 Organisation
- org_id (PK)
- name
- branche
- land
- adresse
- kontaktinfos
- aktiv (bool)

## 1.2 Standort (Site)
- site_id (PK)
- org_id (FK)
- name
- typ (Therme, Werk, Bauhof, Büro …)
- adresse
- koordinaten
- flaeche_m2
- bauart (optional)
- aktiv (bool)

## 1.3 Abteilungen & Rollen
- department_id (PK)
- org_id (FK)
- name (Finanz, Technik, Einkauf, ESG, CEnO …)
- sichtbarkeitseinstellungen (JSON)

## 1.4 Benutzer
- user_id (PK)
- org_id (FK)
- department_id (FK)
- name
- email
- rolle (CEO, CFO, Technik …)
- rechteprofil (JSON)

---

# 2. Energiearten, CO₂ & technische Klassifikationen

## 2.1 EnergyMedium
- energy_medium_id (PK)
- name (Strom, Erdgas, Fernwärme, Diesel …)
- kategorie (Elektrisch / Wärme / Gas / Mobil / Wasser / Kälte / Speicher)
- unit (kWh, m³, Liter …)
- conversion_factor_kWh
- is_storage_medium (bool)
- is_convertible_medium (bool)

## 2.2 CO₂-Faktoren
- co2_factor_id (PK)
- energy_medium_id (FK)
- faktor_kg_co2_pro_kWh
- methode (market-based / location-based)
- gültig_von
- gültig_bis

---

# 3. Infrastruktur, Anlagen & Messpunkte

## 3.1 Asset (Anlage)
- asset_id (PK)
- site_id (FK)
- name
- asset_typ (Erzeuger, Verbraucher, Speicher, Konverter)
- energy_medium_id (FK)
- leistung_kw
- baujahr
- hersteller
- status (aktiv, stillgelegt)
- metadata_json

## 3.2 Meter (Zähler)
- meter_id (PK)
- site_id (FK)
- name
- typ (Hauptzähler, Unterzähler, Wärmemengenzähler …)
- lieferant
- netzbetreiber
- geraetenummer
- aktiv (bool)

## 3.3 MeterChannel (Messkanal)
- channel_id (PK)
- meter_id (FK)
- energy_medium_id (FK)
- richtung (Bezug, Erzeugung, Rückspeisung, Speicherung)
- aggregationsebene (Asset / Gebäude / Standort)
- metadata_json

---

# 4. Zeitreihen & Messwerte

## 4.1 TimeSeriesMeasurement
- measurement_id (PK)
- channel_id (FK)
- timestamp
- wert
- unit
- is_estimated (bool)
- is_anomal (bool)
- quality_code

## 4.2 Prognostizierte Zeitreihen (ForecastPoint)
- forecast_point_id (PK)
- forecast_id (FK)
- timestamp
- wert
- confidence_low
- confidence_high

---

# 5. Kostenstruktur, Tarife & Preisbestandteile

## 5.1 CostComponentType
- cost_component_type_id (PK)
- name (Arbeitspreis, Leistungspreis, Netzentgelt …)
- energy_medium_id (FK)
- ebene (fix, variabel, indexbasiert)
- beschreibung

## 5.2 Tariff (Vertrag)
- tariff_id (PK)
- org_id (FK)
- site_id (FK)
- energy_medium_id (FK)
- lieferant
- gültig_von
- gültig_bis
- metadata_json

## 5.3 TariffCostComponent
- tariff_id (FK)
- cost_component_type_id (FK)
- wert (€/kWh, €/kW, €/Monat …)
- indexierung (optional)

## 5.4 CostTimeSeries
- cost_ts_id (PK)
- tariff_id (FK)
- timestamp
- arbeitspreis
- co2_kosten
- netzkosten
- grundpreis

---

# 6. Ziele, Strategien, Modulstrukturen (IEMS)

## 6.1 IEMSModule
- module_id (1–8)
- name
- beschreibung
- aktiv (bool)

## 6.2 Zielbilder (Zielbild)
- zielbild_id (PK)
- org_id (FK)
- zeithorizont
- beschreibung
- prio_wirtschaftlichkeit
- prio_effizienz
- prio_nachhaltigkeit

## 6.3 Strategische Räume (StrategicSpace)
- space_id (PK)
- name
- beschreibung

## 6.4 OrgStrategicPosition
- org_id / site_id
- space_id
- gueltig_von
- gueltig_bis

## 6.5 KPIs
- kpi_id (PK)
- name
- beschreibung
- modul_id (FK)
- berechnungslogik
- einheit

## 6.6 KPIValue
- kpi_value_id (PK)
- kpi_id (FK)
- org_id / site_id
- timestamp
- wert

---

# 7. Szenarien, Prognosen & Simulationen

## 7.1 Scenario
- scenario_id (PK)
- org_id / site_id
- name
- typ (Markt, Verbrauch, Regulierung, Technik …)
- annahmen_json
- beschreibung

## 7.2 Forecast
- forecast_id (PK)
- scenario_id (FK)
- channel_id (FK, optional)
- modell_typ
- forecast_horizont

## 7.3 SimulationRun
- simulation_id (PK)
- scenario_id (FK)
- name
- input_parameter_json
- created_by_user_id (FK)
- timestamp

## 7.4 SimulationResult
- simulation_result_id (PK)
- simulation_id (FK)
- metric
- wert
- vergleich_basis
- einheit

---

# 8. Maßnahmen, Bewertungen & Entscheidungen

## 8.1 Measure
- measure_id (PK)
- org_id / site_id
- name
- beschreibung
- maßnahme_typ
- status
- metadata_json

## 8.2 MeasureEvaluation
- evaluation_id (PK)
- measure_id (FK)
- bewertungsdatum
- wirtschaftlichkeit_score
- effizienz_score
- nachhaltigkeit_score
- qualitative_einschaetzung

## 8.3 Decision
- decision_id (PK)
- measure_id (FK)
- entscheidungsdatum
- ergebnis (bewilligt / abgelehnt / verschoben)
- begruendung
- entscheider_rolle

## 8.4 BudgetItem
- budget_item_id (PK)
- measure_id (FK)
- jahr
- capex
- opex
- foerdermittel
- npv
- roi
- amortisation

---

# 9. Reporting & Spiegel

## 9.1 Report
- report_id (PK)
- org_id
- period_start
- period_end
- report_typ (Management, ESG, Systemspiegel)
- ampel_status
- zusammenfassung

---

# 10. Antifragilität: Events, Trigger, Lernsystem

## 10.1 Event
- event_id (PK)
- org_id / site_id
- timestamp
- event_typ
- beschreibung
- referenzen (JSON)

## 10.2 TriggerHit
- trigger_id (PK)
- event_id (FK)
- indikator_name
- schwellenwert
- ist_wert

## 10.3 Assumption
- assumption_id (PK)
- bereich (Preis, Technik, Verbrauch …)
- beschreibung
- gueltig_von
- gueltig_bis

## 10.4 LearningCase
- learning_id (PK)
- event_id (FK)
- assumption_id (FK)
- modul_betroffen
- beobachtung
- ursache
- anpassung
- lerneffekt

## 10.5 SystemReview
- review_id (PK)
- org_id
- datum
- review_typ
- ampel_module_json
- kurskorrekturen

---

# 11. Erweiterungsmodule

## 11.1 Schnittstellen
- api_connection_id (PK)
- typ (Smart Meter, Netzbetreiber, Wetter …)
- auth_info_json
- status

## 11.2 Datenqualitäts-Monitor
- dq_issue_id (PK)
- entity
- timestamp
- severity
- beschreibung
- geloest (bool)

## 11.3 Audit & Logging
- audit_id (PK)
- user_id (FK)
- aktion
- entity
- timestamp
- details_json

---

# 12. Ende – Datenstruktur vollständig

Diese Struktur ist modular, erweiterbar und orientiert sich an eurem IEMS-Playbook, dem antifragilen Denkmodell und einem modernen Energiesystem-Datenstack. Sie ist so gestaltet, dass sie über Jahre wachsen und AI-, Simulations- und Echtzeitdaten problemlos aufnehmen kann.