import { CEFRLevel } from '../types/learning';

export type LandmarkImageKey =
  | 'berlin_brandenburg'
  | 'koelner_dom'
  | 'schloss_neuschwanstein'
  | 'hamburg_elbphilharmonie';

export interface GermanLandmarkMeta {
  level: CEFRLevel;
  name: string;
  city: string;
  region: string;
  alt: string;
  objectPositionClass: string;
  imageKey: LandmarkImageKey;
}

export const GERMAN_LANDMARKS_BY_LEVEL: Record<CEFRLevel, GermanLandmarkMeta> = {
  A1: {
    level: 'A1',
    name: 'Brandenburger Tor',
    city: 'Berlin',
    region: 'Berlin',
    alt: 'Brandenburger Tor in Berlin mit deutscher Flagge im warmen Tageslicht',
    objectPositionClass: 'object-right',
    imageKey: 'berlin_brandenburg',
  },
  A2: {
    level: 'A2',
    name: 'Kölner Dom',
    city: 'Köln',
    region: 'Nordrhein-Westfalen',
    alt: 'Kölner Dom und Hohenzollernbrücke am Rhein im warmen Morgenlicht',
    objectPositionClass: 'object-[65%_38%] sm:object-right',
    imageKey: 'koelner_dom',
  },
  B1: {
    level: 'B1',
    name: 'Schloss Neuschwanstein',
    city: 'Schwangau',
    region: 'Bayern',
    alt: 'Schloss Neuschwanstein in den bayerischen Alpen umgeben von Bergwäldern',
    objectPositionClass: 'object-right',
    imageKey: 'schloss_neuschwanstein',
  },
  B2: {
    level: 'B2',
    name: 'Elbphilharmonie & Speicherstadt',
    city: 'Hamburg',
    region: 'Hamburg',
    alt: 'Elbphilharmonie und historische Backstein-Speicherstadt am Hamburger Hafen bei Sonnenuntergang',
    objectPositionClass: 'object-right',
    imageKey: 'hamburg_elbphilharmonie',
  },
};

export function isValidCEFRLevel(value: unknown): value is CEFRLevel {
  return value === 'A1' || value === 'A2' || value === 'B1' || value === 'B2';
}

export function getLandmarkForLevel(level?: CEFRLevel | string | null): GermanLandmarkMeta {
  if (isValidCEFRLevel(level)) {
    return GERMAN_LANDMARKS_BY_LEVEL[level];
  }
  return GERMAN_LANDMARKS_BY_LEVEL.A1;
}
