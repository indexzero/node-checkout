# Repositron

Simple unpacking of repositories to local directories.

```javascript
checkout({
    type: 'git',
    url: 'git@github.com:bmeck/ruffian',
    destination: 'my-apps/ruffian'
}, function (err) {
    console.error(err)
});
```

```javascript
checkout({
    type: 'tar-stream',
    stream: req,
    destination: 'my-apps/ruffian'
}, function (err) {
    console.error(err)
});
```

```javascript
checkout({
    type: 'directory',
    directory: 'my-repos/ruffian',
    destination: 'my-apps/ruffian'
}, function (err) {
    console.error(err)
});
```