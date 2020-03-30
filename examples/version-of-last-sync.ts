import {FeedBabyClient, SyncAuth} from "../lib";

// UPDATE WITH YOUR SYNC DETAILS
const auth: SyncAuth = {
    passphrase: '',
    dateOfBirth: new Date(),
};

const feedBaby = new FeedBabyClient();
feedBaby.ping().then(async () => {
    const version = await feedBaby.checkVersion(auth);
    console.log("Details of last sync", version);
});
