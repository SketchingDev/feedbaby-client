# FeedBaby Client

![](https://github.com/SketchingDev/feedbaby-client/workflows/On%20Push/badge.svg)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/SketchingDev/feedbaby-client.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/SketchingDev/feedbaby-client/context:javascript)

FeedBaby is an exceptionally useful app for tracking aspects of raising a child, such as time and duration of feeds.
I've found it so useful in fact that I've created this client library to allow you to communicate with its API.

## Features

 * Ping the server
 * Register a new device
 * Retrieve/Upload Baby's data (incomplete, see below)
 * Determine the version of the synchronised data
  
_The library will currently only let you download the data the first time you provide a new device ID. I'm yet to
determine why subsequent calls with a known device ID fail._

## Warning!

**Backup your Baby's data before using this library**.

Unfortunately FeedBaby's API doesn't make it possible to read your data without potentially modifying it. This is 
because the endpoint for downloading your baby's data also requires you to upload it - except for the first
time a new device downloads the data.

## Usage

Examples can be found in [./examples](./examples).

```ts
const auth: Authentication = {
    passphrase: 'example',
    dateOfBirth: new Date('10-10-2019'),
};

const feedBaby = new FeedBabyClient();
feedBaby.ping().then(async () => {
    const newDevice = Device.create();
    const mergedData = await feedBaby.merge(auth, newDevice);

    const medicines = await mergedData.getMedicines();
    console.log("Medicines", medicines);
});
```

## Development

### How to publish a release

1. Merge functionality to master along with an increase in the package's version
2. Create a release in GitHub - the version will be the package's version prefixed with 'v'

Creating the release with trigger the [GitHub workflow](./.github/workflows/on-release.yml) that will publish to npmjs.com
