const Koa = require('koa')
const app = new Koa()
const path = require('path')
const fs = require('node:fs')
const crypto = require('crypto')

// 定义资源请求类型
const mimes = {
  css: 'text/css',
  less: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  png: 'image/png',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tiff: 'image/tiff',
  txt: 'text/plain',
  wav: 'audio/x-wav',
  wma: 'audio/x-ms-wma',
  wmv: 'video/x-ms-wmv',
  xml: 'text/xml',
}

// 解析资源请求类型
function parseMime(url) {
  // path.extname获取路径中文件的后缀名
  let extName = path.extname(url)
  extName = extName ? extName.slice(1) : 'unknown'
  return mimes[extName]
}

// fs读取文件
const parseStatic = (dir) => {
  return new Promise((resolve) => {
    resolve(fs.readFileSync(dir), 'binary')
  })
}

function getFileStat(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, function (err, stats) {
      if (stats) {
        resolve(stats)
      } else {
        reject(err)
      }
    })
  })
}

app.use(async (ctx) => {
  // ctx.body = 'hello koa'
  const url = ctx.request.url
  if (url === '/') {
    // 访问根路径返回index.html
    ctx.set('Content-Type', 'text/html')
    ctx.body = await parseStatic('./index.html')
  } else {
    const filePath = path.resolve(__dirname, `.${url}`)
    ctx.set('Content-Type', parseMime(url))
    // 强缓存
    // 设置过期时间在30000毫秒，也就是30秒后 强缓存Expires
    // ctx.set('Expires', new Date(Date.now() + 60000).toUTCString()) // 这样之后再请求emo.png会显示memory cache 而index.css会显示disk cache
    // ctx.set('Cache-Control', 'max-age=300')
    // ctx.body = await parseStatic(filePath)


    // 协商缓存 last-modified/if-modified-since

    // HTTP1.0协商缓存关键点就是根据客户端请求带的ifModifiedSince字段的时间和请求的资源对应的修改时间来判断资源是否有更新。
    // 首先设置Cache-Control：no-cache, 使客户端不走强缓存，
    // 再判断客户端请求是否有带ifModifiedSince字段，没有就设置Last-Modified字段，并返回资源文件。
    // 如果有就用fs.stat读取资源文件的修改时间，并进行对比，如果时间一样，则返回状态码304。

    // ctx.set('Cache-Control', 'no-cache') // 避免强缓存
    // const ifModifiedSince = ctx.request.header['if-modified-since']
    // const fileStat = await getFileStat(filePath)
    // console.log(fileStat, 'fileStat')
    // console.log(ifModifiedSince, fileStat.mtime.toGMTString())
    // if (ifModifiedSince === fileStat.mtime.toGMTString()) {
    //   ctx.status = 304
    // } else {
    //   ctx.set('Last-Modified', fileStat.mtime.toGMTString())
    //   ctx.body = await parseStatic(filePath)
    // }

    // 第二次请求浏览器会带上If-None-Match，服务器计算文件的hash值再次比较，相同则返回304，
    // 不同再返回新的文件。而如果修改了文件，文件的hash值也就变了，这时候两个hash不匹配，服务器则返回新的文件并带上新文件的hash值作为etag。

    ctx.set('Cache-Control', 'no-cache')
    const fileBuffer = await parseStatic(filePath)
    const ifNoneMatch = ctx.request.headers['if-none-match']
    const hash = crypto.createHash('md5')
    hash.update(fileBuffer)
    const etag = `"${hash.digest('hex')}"`
    if (ifNoneMatch === etag) {
      ctx.status = 304
    } else {
      ctx.set('etag', etag)
      ctx.body = fileBuffer
    }
  }
})

app.listen(3000, () => {
  console.log('starting at port 3000')
})