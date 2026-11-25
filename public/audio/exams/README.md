# Lokale Prüfungs-Audiodateien (Hören — Goethe & telc)

Dieser Ordner ist für echte, lokal gespeicherte deutsche MP3-Aufnahmen für **Goethe-Zertifikat** und **telc Deutsch** (Niveaus **A1, A2, B1, B2**) vorgesehen.

## Wichtiger Hinweis
DeutschMeister AI simuliert keine künstliche Browser-Sprachausgabe (SpeechSynthesis) als authentisches Prüfungs-Audio und behauptet niemals fälschlich, dass fehlende Aufnahmen vorhanden wären. Solange unter dem erwarteten Pfad keine verifizierte MP3-Datei liegt, zeigt der Player transparent **„Audio nicht verfügbar“** an und entsperrt das Transkript erst nach Abgabe der Antworten.

## Verzeichnisstruktur

```
public/audio/exams/
  goethe/
    a1/
    a2/
    b1/
    b2/
  telc/
    a1/
    a2/
    b1/
    b2/
```

## Batch-Workflow zur Audio-Erstellung

1. Skripte als JSON, SSML (`de-DE`, Sprecherwechsel & Pausen) und Sprecher-Handbuch exportieren:
   ```bash
   npm run audio:export
   ```
2. Echte MP3-Dateien lokal erzeugen (z. B. via `edge-tts` + `ffmpeg`, `piper` oder Studio-Aufnahme):
   ```bash
   npm run audio:generate
   ```
3. Alle MP3-Dateien lokal prüfen und das zentrale Audio-Manifest (`src/data/audioManifest.generated.json`) aktualisieren:
   ```bash
   npm run audio:verify
   ```

Erst nach erfolgreicher Prüfung in `audio:verify` wird `status` im Audio-Manifest auf `"available"` gesetzt.
