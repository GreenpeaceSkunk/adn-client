import { css } from "styled-components";

export const backgroundImage = (
  src: any,
  size?: any,
  position?: string,
  repeat?: string,
) => css`
  background-image: url(${src});
  background-size: ${size || 'cover'};
  background-position: ${position || 'center'};
  background-repeat: ${repeat || 'no-repeat'};
`;

export const alignMiddle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;