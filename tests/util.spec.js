/* eslint react/no-render-return-value:0, react/prefer-stateless-function:0, react/no-multi-comp:0 */
import expect from 'expect.js';
import { STATUS_ADD, STATUS_KEEP, STATUS_REMOVE, diffKeys } from '../src/util/diff';

import './CSSMotion.spec.css';

describe('util', () => {
  describe('diffKeys', () => {
    it('insert same start & end', () => {
      const prevKeys = [1, 3, 6];
      const currentKeys = [1, 2, 3, 4, 5, 6];

      expect(
        diffKeys(prevKeys, currentKeys)
      ).to.eql([
        { key: 1, status: STATUS_KEEP },
        { key: 2, status: STATUS_ADD },
        { key: 3, status: STATUS_KEEP },
        { key: 4, status: STATUS_ADD },
        { key: 5, status: STATUS_ADD },
        { key: 6, status: STATUS_KEEP },
      ]);
    });

    it('insert different start & end', () => {
      const prevKeys = [3];
      const currentKeys = [1, 2, 3, 4, 5, 6];

      expect(
        diffKeys(prevKeys, currentKeys)
      ).to.eql([
        { key: 1, status: STATUS_ADD },
        { key: 2, status: STATUS_ADD },
        { key: 3, status: STATUS_KEEP },
        { key: 4, status: STATUS_ADD },
        { key: 5, status: STATUS_ADD },
        { key: 6, status: STATUS_ADD },
      ]);
    });

    it('remove', () => {
      const prevKeys = [1, 2, 3, 4, 5, 6];
      const currentKeys = [2, 4, 5];

      expect(
        diffKeys(prevKeys, currentKeys)
      ).to.eql([
        { key: 1, status: STATUS_REMOVE },
        { key: 2, status: STATUS_KEEP },
        { key: 3, status: STATUS_REMOVE },
        { key: 4, status: STATUS_KEEP },
        { key: 5, status: STATUS_KEEP },
        { key: 6, status: STATUS_REMOVE },
      ]);
    });

    // This test is OK to modify but must keep 1~9 in the result
    it('mix', () => {
      const prevKeys = [1, 3, 5, 7, 8, 9];
      const currentKeys = [2, 3, 4, 6, 8];

      expect(
        diffKeys(prevKeys, currentKeys)
      ).to.eql([
        { key: 1, status: STATUS_REMOVE },
        { key: 2, status: STATUS_ADD },
        { key: 3, status: STATUS_KEEP },
        { key: 5, status: STATUS_REMOVE },
        { key: 7, status: STATUS_REMOVE },
        { key: 4, status: STATUS_ADD },
        { key: 6, status: STATUS_ADD },
        { key: 8, status: STATUS_KEEP },
        { key: 9, status: STATUS_REMOVE },
      ]);
    });

    it('should diff keep the key content', () => {
      const prevKeys = [1, { key: 2, test: true }];
      const currentKeys = [{ key: 1, test: true }];

      expect(
        diffKeys(prevKeys, currentKeys)
      ).to.eql([
        { key: 1, status: STATUS_KEEP, test: true },
        { key: 2, status: STATUS_REMOVE, test: true },
      ]);
    });
  });
});