import { render as HeaderRender } from './header';
import { render as ContentRender } from './content';

// const buttonEl = document.getElementById('button');
// buttonEl.addEventListener('click', (e) => {
//   import('app2/Footer').then(({ render: FooterRender }) => {
//     const el = document.getElementById('root')
  
//     HeaderRender(el)
//     ContentRender(el);
//     FooterRender(el);
//   })
// });

import('app2/Footer').then(({ render: FooterRender }) => {
  const el = document.getElementById('root')

  HeaderRender(el)
  ContentRender(el);
  FooterRender(el);
})
