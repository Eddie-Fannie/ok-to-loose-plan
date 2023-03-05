import { render as footerRender } from './footer';
import { render as contentRender } from './content';

// const el = document.getElementById('root')

// contentRender(el);
// footerRender(el)

// 引入远程模块app1 异步
import('app1/Header').then(({ render: HeaderRender } )=> { // app1 header的render函数
  const el = document.getElementById('root')
  HeaderRender(el);
  contentRender(el);
  footerRender(el)
})