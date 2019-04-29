import React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import { diffKeys } from './util/diff';
import CSSMotion from './CSSMotion';

const MOTION_PROP_NAMES = Object.keys(CSSMotion.propTypes);

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
    const prevKeys = keyEntities.map(({ key }) => key);
    const mixedKeyEntities = diffKeys(prevKeys, keys);

    return {
      keyEntities: mixedKeyEntities.filter((entity) => {
        const prevEntity = keyEntities.find(({ key }) => key === entity.key);

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
      keyEntities: keyEntities.map(entity => {
        if (entity.key !== removeKey) return entity;
        return {
          ...entity,
          removed: true,
        }
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

export default CSSMotionList;
