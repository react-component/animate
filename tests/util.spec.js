/* eslint react/no-render-return-value:0, react/prefer-stateless-function:0, react/no-multi-comp:0 */
import expect from 'expect.js';
import { diffKeys } from '../src/util/diff';

import './CSSMotion.spec.css';

describe('util', () => {
  describe('diffKeys', () => {
    it('insert same start & end', () => {
      const prevKeys = [1, 3, 6];
      const currentKeys = [1, 2, 3, 4, 5, 6];

      expect(
        diffKeys(prevKeys, currentKeys)
      ).to.eql([
        { key: 1, keep: true },
        { key: 2, add: true },
        { key: 3, keep: true },
        { key: 4, add: true },
        { key: 5, add: true },
        { key: 6, keep: true },
      ]);
    });

    it('insert different start & end', () => {
      const prevKeys = [3];
      const currentKeys = [1, 2, 3, 4, 5, 6];

      expect(
        diffKeys(prevKeys, currentKeys)
      ).to.eql([
        { key: 1, add: true },
        { key: 2, add: true },
        { key: 3, keep: true },
        { key: 4, add: true },
        { key: 5, add: true },
        { key: 6, add: true },
      ]);
    });

    it('remove', () => {
      const prevKeys = [1, 2, 3, 4, 5, 6];
      const currentKeys = [2, 4, 5];

      expect(
        diffKeys(prevKeys, currentKeys)
      ).to.eql([
        { key: 1, remove: true },
        { key: 2, keep: true },
        { key: 3, remove: true },
        { key: 4, keep: true },
        { key: 5, keep: true },
        { key: 6, remove: true },
      ]);
    });

    // This test is OK to modify but must keep 1~9 in the result
    it('mix', () => {
      const prevKeys = [1, 3, 5, 7, 8, 9];
      const currentKeys = [2, 3, 4, 6, 8];

      expect(
        diffKeys(prevKeys, currentKeys)
      ).to.eql([
        { key: 1, remove: true },
        { key: 2, add: true },
        { key: 3, keep: true },
        { key: 5, remove: true },
        { key: 7, remove: true },
        { key: 4, add: true },
        { key: 6, add: true },
        { key: 8, keep: true },
        { key: 9, remove: true },
      ]);
    });
  });
});