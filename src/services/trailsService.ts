import trailsData from '../../scrapper/db.json';
import type { Trail } from '../types';

const typedTrailsData: Trail[] = trailsData.walks;

export default {
  obtainRandomTrails(num: number): Trail[] {
    const selected: Trail[] = [];
    const usedIndices = new Set<number>();

    while (selected.length < num && usedIndices.size < typedTrailsData.length) {
      const randomIndex: number = Math.floor(Math.random() * typedTrailsData.length);
      if (!usedIndices.has(randomIndex)) {
        selected.push(typedTrailsData[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    return selected;
  }
};
