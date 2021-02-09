import React, { memo, useMemo } from 'react';
import {useRouteMatch, withRouter } from 'react-router-dom';
import { View } from '@bit/meema.ui-components.elements'

const Share: React.FunctionComponent<{}> = () => {
  return useMemo(() => (
    <View>
      Compartí con tus amigos
    </View>
  ), []);
}

export default memo(withRouter(Share));