# Basic Concepts

## Write the code clearly

### Managed Global Variables

Many universal application samples of React and Redux are using the global variable like `__CLIENT__`, `__SERVER__`. But in common, global variables are not recommended. Because they make it difficult to find and maintain.
So Reduxible contains default configurations that needed in global when initialization.

### Avoid the Huge Switch Statement & Calling a same thing with other names

Commonly large switch statements are considered as the anti-pattern. But basic flux/redux patterns are using the switch statement to find actions by type. Also, actions are defined and called with camelCase and snake_case, and repeated many times. It makes application code too verbose.
Reduxible provides some [utility functions](#utility-functions) that makes these cases simpler. (or you can also use [redux-actions](https://github.com/acdlite/redux-actions) for same purpose.)

For detail, see below links.

* [Ways to eliminate switch in code](http://stackoverflow.com/questions/126409/ways-to-eliminate-switch-in-code)
* [Large Switch statements: Bad OOP?](http://stackoverflow.com/questions/505454/large-switch-statements-bad-oop)
* [Deprecating the switch statement for object literals](https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/)
* And you could find many results about it from google.


## Repeat simple work to build a service

There are many libraries to make a redux application short and simpler. But short codes without understanding are not a good choice for many cases. Developers have to write and make it simpler themselves to maintain it. Thus, when you build your app with Reduxible, we recommend that just write similar code repeatedly. Then, when if there will a lot of similar codes, they can make something like middlewares to make those simpler.

## Framework for nowadays

Considerable related things with React and Redux are not compatible with legacy environments like low versions of Internet Explorer. But many enterprise and services can't ignore them. Therefore, Reduxible is focusing to compatibility for support Internet Explorer 8 at least with some shims. And it also can be easily integrated with spring that one of the most popular platform. (please refer the [example project](https://github.com/reduxible/reduxible-example).)
