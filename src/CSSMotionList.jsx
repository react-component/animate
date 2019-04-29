import React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import CSSMotion from './CSSMotion';
import { supportTransition } from './util/motion';
import { diffKeys } from './util/diff';

const MOTION_PROP_NAMES = Object.keys(CSSMotion.propTypes);

export function genCSSMotionList(transitionSupport) {
  class CSSMotionList extends React.Component {
    static propTypes = {
      ...CSSMotion.propTypes,
      component: PropTypes.string,
      keys: PropTypes.array,
    };

    static defaultProps = {
      component: 'div',
    };

    state = {
      keyEntities: [],
    };

    static getDerivedStateFromProps({ keys }, { keyEntities }) {
      // Always as keep when motion not support
      if (!transitionSupport) {
        return {
          keyEntities: keys.map((key) => ({ key, keep: true })),
        };
      }

      const prevKeys = keyEntities.map(({ key }) => key);
      const mixedKeyEntities = diffKeys(prevKeys, keys);

      const keyEntitiesLen = keyEntities.length;
      return {
        keyEntities: mixedKeyEntities.filter((entity) => {
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
          if (prevEntity && prevEntity.removed && entity.remove) {
            return false;
          }
          return true;
        }),
      };
    }

    removeKey = (removeKey) => {
      this.setState(({ keyEntities }) => ({
        keyEntities: keyEntities.map((entity) => {
          if (entity.key !== removeKey) return entity;
          return {
            ...entity,
            removed: true,
          };
        }),
      }));
    };

    render() {
      const { keyEntities } = this.state;
      const { component: Component, children, ...restProps } = this.props;

      const motionProps = {};
      MOTION_PROP_NAMES.forEach((prop) => {
        motionProps[prop] = restProps[prop];
        delete restProps[prop];
      });

      return (
        <Component {...restProps}>
          {keyEntities.map(({ key, add, keep }) => {
            const visible = !!(add || keep);
            return (
              <CSSMotion
                {...motionProps}
                key={key}
                visible={visible}
                eventKey={key}
                onLeaveEnd={(...args) => {
                  if (motionProps.onLeaveEnd) {
                    motionProps.onLeaveEnd(...args);
                  }
                  this.removeKey(key);
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

  polyfill(CSSMotionList);

  return CSSMotionList;
}

export default genCSSMotionList(supportTransition);
