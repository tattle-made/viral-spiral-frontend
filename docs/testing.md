# Testing

## Notes on Mock Server

### Code Organization

the `core.js` file contains the code to setup a mock server that mimics the
backend server for viral spiral. It has websocket and REST APIs

Instructions on how to test the frontend logic using a mock-server.

## Testing Room Logic

```
nodemon mock-server/rooms.js
node mock-server/room.test.js
```

## Testing Special Powers

```
nodemon mock-server/special-powers.js
node mock-server/special-powers.test.js
```
