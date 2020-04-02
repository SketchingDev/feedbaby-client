import {Device, FeedBabyClient, Authentication} from "../lib";

// UPDATE THIS: Update this with your App's sync details
const auth: Authentication = {
    passphrase: '',
    dateOfBirth: new Date(),
};

const feedBaby = new FeedBabyClient();
feedBaby.ping().then(async () => {
    // 1. Create a new device, and perform the initial merge to get current state
    const device = Device.create();
    const initialData = await feedBaby.merge(auth, device);

    // 2. We can use the initial data with the next merge, then use the result of this merge for with the next merge, and so on...
    const mergeTwo = await feedBaby.merge(auth, device, initialData.getBuffer());

    // 3. Then use the result of this merge for with the next merge, and so on...
    const mergeThree = await feedBaby.merge(auth, device, mergeTwo.getBuffer());

    const medicines = await mergeThree.getMedicines();
    console.log("Medicines", medicines);
});
