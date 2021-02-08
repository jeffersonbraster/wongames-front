import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 3px solid #f231a5;
  border-right: 3px solid #f231a5;
  border-bottom: 3px solid #f231a5;
  border-left: 4px solid #06092b;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
