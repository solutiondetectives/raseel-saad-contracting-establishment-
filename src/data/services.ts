import tileImg from '@/assets/tile-service.jpg';
import marbleImg from '@/assets/marble-service.jpg';
import graniteImg from '@/assets/granite-service.jpg';
import floorImg from '@/assets/floor-service.jpg';
import scratchImg from '@/assets/scratch-service.jpg';
import stairsImg from '@/assets/stairs-service.jpg';

import tileBefore from '@/assets/tile-before.jpg';
import tileAfter from '@/assets/tile-after.jpg';
import marbleBefore from '@/assets/marble-before.jpg';
import marbleAfter from '@/assets/marble-after.jpg';
import graniteBefore from '@/assets/granite-before.jpg';
import graniteAfter from '@/assets/granite-after.jpg';
import beforeAfter1 from '@/assets/before-after-1.jpg';
import beforeAfter2 from '@/assets/before-after-2.jpg';

import floorPair from '@/assets/floor-pair.png';
import scratchPair from '@/assets/scratch-pair.png';
import stairsPair from '@/assets/stairs-pair.png';

export const SERVICE_IMAGES = {
  "tile-polishing": {
    hero: tileImg,
    before: tileBefore,
    after: tileAfter,
    isPair: false
  },
  "marble-polishing": {
    hero: marbleImg,
    before: marbleBefore,
    after: marbleAfter,
    isPair: false
  },
  "machine-work": {
    hero: graniteImg,
    before: graniteBefore,
    after: graniteAfter,
    isPair: false
  },
  "floor-cleaning": {
    hero: floorImg,
    before: floorPair,
    after: floorPair,
    isPair: true
  },
  "scratch-removal": {
    hero: scratchImg,
    before: scratchPair,
    after: scratchPair,
    isPair: true
  },
  "stairs-cleaning": {
    hero: stairsImg,
    before: stairsPair,
    after: stairsPair,
    isPair: true
  },
} as const;
