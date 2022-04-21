# UEI Validation

Any entity doing business with the federal government must create and use a Unique Entity ID (UEI) created in SAM.gov. The standard for the UEI is defined [here](https://www.gsa.gov/about-us/organization/federal-acquisition-service/office-of-systems-management/integrated-award-environment-iae/iae-systems-information-kit/uei-technical-specifications-and-api-information).

This library exists to allow for client-side validation of UEIs to enable better form validation.

## Usage

This can be used in the browser by loading the javascript file.

```html
<script src="uei.min.js"></script>
<script>
  uei.validUEI("VN1AJFAD19J9"); //Should be true
</script>
```

Or you can use it as a node module.

```js
const uei = require("uei.js");
uei.validUEI("VN1AJFAD19J9"); // Should be true
```

## Testing

The library uses [mocha](https://mochajs.org/) for unit testing. To run tests locally, run:

`npm test`
