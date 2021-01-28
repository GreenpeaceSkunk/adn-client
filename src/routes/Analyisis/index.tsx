import React, { memo, useEffect, useMemo } from 'react';
import {Route, Switch, withRouter } from 'react-router-dom';
import Wrapper, { View } from '@bit/meema.ui-components.elements';

const Analysis: React.FunctionComponent<{}> = () => {
  return useMemo(() => (
    <View>
      Analysis
    </View>
  ), []);
}

export default memo(withRouter(Analysis));