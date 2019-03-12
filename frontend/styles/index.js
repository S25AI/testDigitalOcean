import {css} from 'linaria';

export const globals = css`
  :global() {
    * {
      box-sizing: border-box;
    }
  
    html {
      font-size: 62.5%;
      max-height: 100%;
    }
  
    html, body {
      height: 100%;
    }
  
    body {
      font: 1.6rem/1 Arial, Tahoma, sans-serif;
      color: #232122;
      margin: 0;
    }

    h1 {
      margin: 1.4rem;
    }

    h2 {
      margin: 1.3rem;
    }
  
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .wrapper {
      width: 1140px;
      max-width: 95%;
      margin: 0 auto;
    }
  }
`;