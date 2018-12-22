import * as React from 'react';

export interface Props {
  component: string | React.ReactElement<any>,
  componentProps: object,
  animation: object,
  transitionName: string | object,
  transitionEnter: boolean,
  transitionAppear: boolean,
  exclusive: boolean,
  transitionLeave: boolean,
  onEnd: (key: string, exists: boolean) => void,
  onEnter: (key: string) => void,
  onLeave: (key: string) => void,
  onAppear: (key: string) => void,
  showProp: string,
  children: React.ReactChild,
}

export default class Animate extends React.Component<Props> {};