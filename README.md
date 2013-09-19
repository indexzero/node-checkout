# checkout

Simple unpacking of repositories to local directories.

## Git Repositories

```javascript
checkout({
    type: 'git',
    url: 'git@github.com:bmeck/ruffian',
    destination: 'my-apps/ruffian'
}, function (err) {
    console.error(err)
});
```

## Streams from .tar files

```javascript
checkout({
    type: 'tar-stream',
    stream: req,
    destination: 'my-apps/ruffian'
}, function (err) {
    console.error(err)
});
```

## Local directories

```javascript
checkout({
    type: 'directory',
    directory: 'my-repos/ruffian',
    destination: 'my-apps/ruffian'
}, function (err) {
    console.error(err)
});
```

## Custom Handler

```javascript
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

```javascript
checkout.handlers.myHandler = function (description, callback) {
  // Same as Custom Handler
}
```