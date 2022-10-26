# REST API Query Parser

Working prototype for a query parser that accepts a JSON
query that is easy to write for consumers, then parses it into
a normalized format, and finally converts it to a MongoDB filter.

``` js
// Filter by a single field
{ name: "Phill" }

// Output
{ "name": { "$eq": "Phill" } }
```

``` js
// Filter by multiple fields using operators different than "equals"
{ name: "Phill", age: { gte: 30 } }

// Output
{
  "$and": [
    { "name": { "$eq": "Phill" } },
    { "age": { "$gte": 30 } }
  ]
}
```

``` js
// Combine queries with AND or OR operators
{ or: [ { name: "Phill" }, { age: { gte: 30, lte: 100 } } ] }

// Output
{
  "$or": [
    { "name": { "$eq": "Phill" } },
    { "age": { "$gte": 30, "$lte": 100 } }
  ]
}
```

``` js
// Multi-level queries
{ { name: "Phill" }, { or: [ { isEnabled: true }, { age: 30 } ] } }

// Output
{
  "$and": [
    { "name": { "$eq": "Phill" } },
    {
      "$or": [
        { "isEnabled": { "$eq": true } },
        { "age": { "$eq": 30 } }
      ]
    }
  ]
}
```

### Supported operators

* **Logical**: and, or
* **General**: equals, notEquals, in, notIn
* **Strings and Arrays**: contains, containsAny, notContains, startsWith, endsWith
* **Numbers and Dates**: greaterThan, greaterThenOrEquals, lessThan, lessThanOrEquals

The consumer can use alternate forms, such as `&&` for `and`, `>=` for `greaterThanOrEquals`, `nin` for `notIn` and so on.

See [operators.ts](https://github.com/phillippelevidad/rest-api-query-parser/blob/main/src/models/operators.ts) for a list of all supported operators and their synonyms.

### Warning ⚠️

This is a prototype. It has not been well tested. Use at your own risk. Feel free to use as a starting point. Contributions are wellcome.

## Scripts

- `yarn build` to lint and build the app
- `yarn dev` to start the app with hot-reload
- `yarn start` to start the app without hot-reload
- `yarn test` to run all test files

---

Created using the template for a [NodeJS Console App with TypeScript, linting and testing](https://phillcode.io/nodejs-console-app-with-typescript-linting-and-testing).

Visit [phillcode.io](https://phillcode.io/) for more articles on software development, management and leadership.
