const util = {
  isAppearSupported(props) {
    return props.transitionName && props.transitionAppear || props.animation.appear;
  },
  isEnterSupported(props) {
    return props.transitionName && props.transitionEnter || props.animation.enter;
  },
  isLeaveSupported(props) {
    return props.transitionName && props.transitionLeave || props.animation.leave;
  },
};
export default util;
