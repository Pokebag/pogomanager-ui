# Contributing Guidelines

## All pull requests should be made against `develop`

Pokebag admins will approve your PR once it receives requisite scrutiny, then merge to master when it's ready for production.

## Maintain the code style

Everybody has their own style of writing code, and that's totally cool. If you're going to make a PR, you need to at least follow these basic guidelines:

1. **No semicolons.** This is 2016, not 1996.

1. **Avoid callbacks.** This isn't *always* possible, but most of the time a `Promise` will be more appropriate.

1. **Use class section comment headers.** I prefer the headers `Private methods`, `Public methods`, `Getters`, and `Setters`, but I'm open to other things that are also appropriate. Just make sure to maintain a theme within your code.

1. **Avoid cleverness for the sake of cleverness.** This is an open source project. If it's not easy to understand, what's the point of it being open source?

1. **Use expressive function and variable names.** `error` over `err`, basically.
