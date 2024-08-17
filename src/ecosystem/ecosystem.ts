import {
  basicRandomizer,
  RandomizerFactory,
  seededRandomizer
} from '../randomizer';
import { Registry } from './registry';

export class Ecosystem {
  private randomizers = new Registry<RandomizerFactory>(
    'randomizer', {
      basic: basicRandomizer,
      seeded: seededRandomizer
    });

}
