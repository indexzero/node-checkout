# checkout

Simple unpacking of repositories to local directories.

## Git Repositories

``` js
checkout({
  type: 'git',
  url: 'git@github.com:bmeck/ruffian',
  destination: 'my-apps/ruffian'
}, function (err) {
  console.error(err)
});
```

## Streams from .tar files

``` js
checkout({
  type: 'tar-stream',
  stream: req,
  destination: 'my-apps/ruffian'
}, function (err) {
  console.error(err)
});
```

## Local directories

``` js
checkout({
  type: 'directory',
  directory: 'my-repos/ruffian',
  destination: 'my-apps/ruffian'
}, function (err) {
  console.error(err)
});
```

## npm packages

``` js
checkout({
  type: 'npm',
  package: 'ruffian',
  version: '0.0.0',
  destination: 'my-apps/ruffian',
  //
  // Optional
  //
  protocol: 'https',
  proxy: 'http://outbound-proxy.com',
  registry: 'registry.npmjs.org',
  'strict-ssl': false,
  headers: {
    // Custom HTTP headers
    'user-agent': 'node-checkout'
  }
}, function (err) {
  console.error(err)
})
```

## Custom Handler

``` js
checkout({
  type: function (description, callback) {
    // PERFORM THE CHECKOUT HERE
    // @description matches the first argument to checkout
  },
}, function (err) {
  console.error(err)
})
```

## Registering a generic handler

``` js
checkout.handlers.myHandler = function (description, callback) {
  // Same as Custom Handler
}
```