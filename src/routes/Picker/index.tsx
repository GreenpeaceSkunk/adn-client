import React, { memo, useEffect, useMemo } from 'react';
import {Route, Switch, withRouter } from 'react-router-dom';
import Wrapper, { A, H1, Span, View } from '@bit/meema.ui-components.elements'
import { css } from 'styled-components';
import { backgroundImage } from '../../styles/mixins';
import { pixelToRem, headerHeightNormal } from 'greenpeace-ui-themes';
import { trackEvent } from '../../utils/facebookPixel';

const Picker: React.FunctionComponent<{}> = () => {
  return useMemo(() => (
    <View>
      Picker
      <Switch>
        <Route path='/dupla/1'>
          Dupla 1
        </Route>
      </Switch>
    </View>
  ), []);
}

export default memo(withRouter(Picker));