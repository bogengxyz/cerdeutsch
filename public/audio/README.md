# DeutschMeister AI — Lokales Audio-Verzeichnis (`public/audio/`)

Dieses Verzeichnis speichert alle echten deutschen MP3-Audiodateien für Prüfungen und reguläre Hörübungen:

```
public/audio/
  exams/
    goethe/{a1,a2,b1,b2}/   # 16 Goethe-Zertifikat Hörteile (Teil 1–2 in Simulationen, Teil 3–4 Übung)
    telc/{a1,a2,b1,b2}/     # 16 telc Deutsch Hörteile (Teil 1–2 in Simulationen, Teil 3–4 Übung)
  practice/
    {a1,a2,b1,b2}/          # Reguläre Hören-Übungseinheiten (A1–B2, eine MP3 pro einzigartigem Hörtext)
```

## Workflow
1. `npm run audio:export` — Exportiert alle Skripte (Prüfung + Praxis) als JSON, W3C SSML (`de-DE`) und Studio-Leitfaden.
2. `npm run audio:generate` — Erstellt MP3-Dateien lokal (z. B. `--scope=exams`, `--scope=practice`, `--level=A1`).
3. `npm run audio:verify` — Prüft alle MP3-Dateien auf Existenz, Header und Dauer und aktualisiert `src/data/audioManifest.generated.json`.
