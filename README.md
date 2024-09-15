# Falbricate

Falbricate (combination of words *falsum* and *fabrication*) is a simple tool 
for making rich, real-looking data items (*falsa*) for various testing purposes, 
for creating real-looking demos or application prototypes, and to ease the whole
data model mocking process while enabling versioning of it.

## Example

In this example, you can see how easy it is to create a somewhat real-looking
payment data object generator - with just a tip of the Falbricate features:

```javascript
// Start with creating predefined ecosystem with preregistered Core plugin 
const ecosystem = getDefaultEcosystem();

// Define your own schema
const paymentSchema: SchemaInput = {
  // Use profiles to share values in between multiple fields; you can easily
  // refer to them from any other field using `!ref-<path>` notation
  profiles: {
    currency: {
      // Feel free to comment the purpose
      comment: 'Currency in which the payment was made',
      type: 'pick',
      config: {
        options: ['USD', 'EUR', 'JPY', 'CAD', 'CNY']
      }
    },
  },

  // Define the actual fields to be populated by the given field definitions
  fields: {
    // For simple declarations, use in-line definitions
    paymentId: 'uuid?version=4',

    // For some advanced types, you can use object definition
    accountId: {
      // Sometimes its hard to figure out what the result might look like...
      // Make sure to include examples!
      examples: ['UK-123456-7A8F-1f2d', 'FR-812596-0BC3-182e'],
      type: 'template',
      config: {
        template: 'state-$D$d$d$d$d$d-$H$H$H$H-$h$h$h$h',
        variables: {
          state: '!ref-clientContext.userState'
        }
      }
    },

    // Use relative timestamps
    paymentDate: 'past30Minutes',

    // Randomly pick from the listed options
    direction: 'pick?options=["INCOMING","OUTGOING"]',
    status: 'pick?options=["COMPLETED","FAILED","PENDING"]',
    paymentType: 'pick?options=["CREDIT_CARD","BANK_TRANSFER","PAYPAL"]',

    // Define your desired float within a range
    amount: 'float?min=0.01&max=500&decimalDigits=2',

    // Refer to a profile - by a generation context being passed internally
    currency: '!ref-profiles.currency',

    // Imagination has no boundaries!
    some_field: {
      comment: 'Always null - because why not :)',
      type: 'null'
    }
  },
};

// Create a falbricator instance by compiling the schema
const falbricator: Falbricator = ecosystem.compile(paymentSchema);

// Generate your item with given clientContext
const falsum = falbricator.generate({ userState: 'UK' });
console.log(JSON.stringify(falsum, undefined, 2));
```

And here's the result:
```json
{
  "paymentId": "36a2b78a-509d-454d-5c49-cfb1ae53ed20",
  "accountId": "UK-175064-460A-6b01",
  "paymentDate": "2024-09-15T15:34:24.292Z",
  "direction": "INCOMING",
  "status": "PENDING",
  "paymentType": "CREDIT_CARD",
  "amount": 78.23,
  "currency": "JPY",
  "some_field": null
}
```

Similarly, you can generate anything you want!
