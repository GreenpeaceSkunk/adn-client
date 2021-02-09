import React, { memo, useMemo } from 'react';
import { Wrapper, View, Span, Header, Img } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import { H1 } from '../../../components/Elements';
import { TutorialStep2 } from '../../../assets/images';

const TutorialStepTwo: React.FunctionComponent<{}> = () => {
  return useMemo(() => (
    <View>
      <Header
        customCss={css`
          padding: ${pixelToRem(15)} ${pixelToRem(40)};
        `}
      >
        <H1 width='80%'>Una vez completado, analizaremos tus <br/>elecciones y descubrirás tu <Span customCss={css`font-family: ${props => props.theme.font.family.primary.bold};`}>ADN Greenpeace</Span></H1>
      </Header>
      <Wrapper customCss={css`
        min-height: 10rem;
        display: flex;
        justify-content: center;
        padding: 0 0 ${pixelToRem(40)} 0;
      `}>
        <Img src={TutorialStep2} />
      </Wrapper>
    </View>
  ), [
  ]);
};

export default memo(TutorialStepTwo);

