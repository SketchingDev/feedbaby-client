import {FeedBabyClient, Authentication, Device} from "../lib";

// UPDATE THIS: Update this with your App's sync details
const auth: Authentication = {
    passphrase: '',
    dateOfBirth: new Date(),
};

const feedBaby = new FeedBabyClient();
feedBaby.ping().then(async () => {
    const newDevice = Device.create();

    // WARNING! Be careful with merge, it can be destructive. See method's JS Docs for more info
    const mergedData = await feedBaby.merge(auth, newDevice);

    const medicines = await mergedData.getMedicines();
    console.log("Medicines", medicines);
});


