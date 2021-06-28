import styled from 'styled-components';
import { colorsPalette } from 'constant/colors';

export const WrapForm = styled.form`
  background: ${({ theme }) => theme.colors.authBackground};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 100px 90px;
  /* TO-DO: send screen sizes to its own const file */
  @media (max-width: 768px) {
    padding: 40px 50px;
  }

  .app-icon-container {
    position: relative;
    margin-bottom: 40px;

    .app-logo {
      width: 170px;
      height: 170px;
    }
    .form-title {
      width: 100%;
      margin: 0;
      position: absolute;
      top: 110px;
      left: 0;
      text-align: center;
    }
  }

  .form-container {
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  };

  .input-container {
    margin-bottom: 40px;
    display: flex;
    min-width: 190px;
    width: 100%;
    max-width: 400px;
    flex-direction: column;
    align-items: center;
  }

  .form-title {
    color: ${colorsPalette.white};
    margin-bottom: 60px;
  }

  .create-account-divider {
    margin: 30px 0;
    color: ${({theme}) => theme.commonProps.color.primary};
  }

  .create-account-link {
    color: ${({theme}) => theme.commonProps.color.primary};
    text-decoration: none;
  }
`
