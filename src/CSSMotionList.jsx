/* eslint react/prop-types: 0 */
import React from 'react';
import OriginCSSMotion, { MotionPropTypes } from './CSSMotion';
import { supportTransition } from './util/motion';
import {
  STATUS_ADD,
  STATUS_KEEP,
  STATUS_REMOVE,
  STATUS_REMOVED,
  diffKeys,
  parseKeys,
} from './util/diff';

const MOTION_PROP_NAMES = Object.keys(MotionPropTypes);

export function genCSSMotionList(transitionSupport, CSSMotion = OriginCSSMotion) {
  class CSSMotionList extends React.Component {
    static defaultProps = {
      component: 'div',
    };

    state = {
      keyEntities: [],
    };

    static getDerivedStateFromProps({ keys }, { keyEntities }) {
      const parsedKeyObjects = parseKeys(keys);

      // Always as keep when motion not support
      if (!transitionSupport) {
        return {
          keyEntities: parsedKeyObjects.map(obj => ({ ...obj, status: STATUS_KEEP })),
        };
      }

      const mixedKeyEntities = diffKeys(keyEntities, parsedKeyObjects);

      const keyEntitiesLen = keyEntities.length;
      return {
        keyEntities: mixedKeyEntities.filter(entity => {
          // IE 9 not support Array.prototype.find
          let prevEntity = null;
          for (let i = 0; i < keyEntitiesLen; i += 1) {
            const currentEntity = keyEntities[i];
            if (currentEntity.key === entity.key) {
              prevEntity = currentEntity;
              break;
            }
          }

          // Remove if already mark as removed
          if (
            prevEntity &&
            prevEntity.status === STATUS_REMOVED &&
            entity.status === STATUS_REMOVE
          ) {
            return false;
          }
          return true;
        }),
      };
    }

    removeKey = removeKey => {
      this.setState(({ keyEntities }) => ({
        keyEntities: keyEntities.map(entity => {
          if (entity.key !== removeKey) return entity;
          return {
            ...entity,
            status: STATUS_REMOVED,
          };
        }),
      }));
    };

    render() {
      const { keyEntities } = this.state;
      const { component, children, ...restProps } = this.props;

      const Component = component || React.Fragment;

      const motionProps = {};
      MOTION_PROP_NAMES.forEach(prop => {
        motionProps[prop] = restProps[prop];
        delete restProps[prop];
      });
      delete restProps.keys;

      return (
        <Component {...restProps}>
          {keyEntities.map(({ status, ...eventProps }) => {
            const visible = status === STATUS_ADD || status === STATUS_KEEP;
            return (
              <CSSMotion
                {...motionProps}
                key={eventProps.key}
                visible={visible}
                eventProps={eventProps}
                onLeaveEnd={(...args) => {
                  if (motionProps.onLeaveEnd) {
                    motionProps.onLeaveEnd(...args);
                  }
                  this.removeKey(eventProps.key);
                }}
              >
                {children}
              </CSSMotion>
            );
          })}
        </Component>
      );
    }
  }

  return CSSMotionList;
}

export default genCSSMotionList(supportTransition);
