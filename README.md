# Frisbee
Frisbee is a small cross-browser data collection library. It incorporates a queue and a HTTP client. You define endpoint to hit and keep adding data to Frisbee. Frisbee takes care of the rest.

todo: WHICH BROWSERS

## Getting started
Load Frisbee
```html
<script src="/frisbee.js"></script>
```

Instantiate Frisbee
```js
var frisbee = new window.Frisbee({
  namespace: 'ns',
  url: 'http://foo/bar'
})
```

Now add some data to it.
```js
frisbee.add(1)
frisbee.add(2)
frisbee.add(3)
frisbee.add(4)
frisbee.add(5)
frisbee.add(6)
```
Frisbee fills the queue with data until `maxItems` is reached (5 by default). At that point, Frisbee removes first 5 items from the queue and POSTs them to the `options.url`.
In this example, Frisbee will POST `http://foo/bar` with the following request payload:
```json
{
  "payload": [1, 2, 3, 4, 5]
  "meta": {
    "namespace": "ns", 
    "id": "instance-specific-uuid"
  } 
}
```
6th item (now 1st) will wait until 4 more are added until another POST. Structure of the request payload can be changed using `getRequestData` function. More info below.

Let's add 1 more item.
```js
frisbee.add(1)
```

Now we have two items waiting. But let's assume that in your app lifecycle at some point(s) you must ensure that the entire queue is drained and POSTed.
We can use
```js
frisbee.sendAll()
```
This will POST `http://foo/bar`
```json
{
  "payload": [6, 1]
  "meta": {
    "namespace": "ns",
    "id": "<instance-specific-uuid>" 
  } 
}
```

Another use-case for `sendAll` method would be setting a timer to periodically POST data regardless of the `maxItems` criteria.

## Options

```js
{
  // Number of items in the queue to reach when the request is made
  // Default: 5
  maxItems: Number, 

  // HTTP verb to use for requests
  // Default: 'POST'
  method: String,

  // URL to hit
  // Default: undefined
  url: String,

  // HTTP headers to include
  // Default: { 'Content-type': 'application/json; charset=utf-8' }
  headers: Object,

  // Namespace
  // Default: undefined
  namespace: [String, Number, Object],

  // Transform request payload before the request.
  // Runs before every request. This method needs to return a truthy value for request to happen.
  // See example in example/scroll.js
  // Default: 
  //   function (data, meta) {
  //     return JSON.stringify({
  //       payload: data,
  //       meta: meta
  //     })
  //   }
  getRequestData: Function
}
```

## Gotchas

### Use `getRequestData` wisely
#### Mutating `data`
Because you have access to data array (of currently emptied queue data), you could append some extra data through this modifier that Frisbee does not know about. Keep in mind that mutating `data` will have no effect on subsequent calls to this function since every request works with a fresh set of (different) data.

#### Mutating `meta`
Mutated `meta` object however will carry on for all subsequent `getRequestData` calls. Use that your (dis)advantage.

#### Must return truthy value
Because request will fire only if this method returns a truthy value, it opens up interesting possibilities.
For example, if you want to bundle multiple namespaces into one request, you could create a main frisbee instance to talk to API and bundle several different namespaces while other Frisbee (namespace-specific) instances would be used as queues and never talk to the API, just to the main API Frisbee instance.