import heroBerlinImg from '../assets/images/hero_berlin_brandenburg_1795411466434.jpg';
import heroKoelnImg from '../assets/images/hero_koelner_dom_1795412749808.jpg';
import heroNeuschwansteinImg from '../assets/images/hero_schloss_neuschwanstein_1795412749345.jpg';
import heroHamburgImg from '../assets/images/hero_hamburg_elbphilharmonie_1795412749514.jpg';
import { LandmarkImageKey } from './landmarkRegistry';

export const LANDMARK_IMAGE_URLS: Record<LandmarkImageKey, string> = {
  berlin_brandenburg: heroBerlinImg,
  koelner_dom: heroKoelnImg,
  schloss_neuschwanstein: heroNeuschwansteinImg,
  hamburg_elbphilharmonie: heroHamburgImg,
};

export function getLandmarkImageUrl(imageKey: LandmarkImageKey): string {
  return LANDMARK_IMAGE_URLS[imageKey];
}
