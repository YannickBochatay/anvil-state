# Buildless Vanilla JS : web components, proxy, typescript checking • [TodoMVC](http://todomvc.com)

Inspired by [EMOORE methodology](https://boavizta.org/en/eroom/the-genesis), reversing Moore’s Law :

> “If we optimized software by a factor of two every two years, we’d free up half of the computing power for new uses.”

## Resources

- [Vanilla JS](http://vanilla-js.com/)

### Articles

- [EROOM - Moore in reverse](https://boavizta.org/en/eroom)
- [Going buildless](https://modern-web.dev/guides/going-buildless/getting-started/)
- [Web development complexity is increasing, but is UX getting any better ?](https://qase.io/blog/web-development-complexity/)

### Support

*Let us [know](https://github.com/tastejs/todomvc/issues) if you discover anything worth sharing.*


## Implementation

This version of the todo app was born out of frustration with the complexity and power required for web development today. Gigabytes of RAM, gigabytes of files, for apps that are no more satisfying than they were twenty years ago, when all you needed was a notepad to code.

This app strives to regain this simplicity without compromising on robustness, thanks to web standards and minimalist tools.

Tools :
- [Visual Studio Code](https://code.visualstudio.com/) with native [typescript checking based on JSDOC](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) ;
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension to serve files with auto-reload.

Libraries :
- [@ungap/custom-elements](https://www.npmjs.com/package/@ungap/custom-elements) : polyfill for Safari which does not support customized built-in elements
- [QUnit](https://qunitjs.com/) : unit testing in browser with no configuration.

Web standard technologies :
- [Custom Elements](https://html.spec.whatwg.org/dev/custom-elements.html#custom-elements)
- [Proxy](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Proxy) for reactivity.

And that's all ! No build tool, no node commands, 132Ko of node_modules files. Just open `index.html` with Live Server for the app and `tests/index.html` to run tests.


## Credit

Created by [Yannick Bochatay](https://github.com/YannickBochatay)
