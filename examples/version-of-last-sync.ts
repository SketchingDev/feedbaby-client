import {FeedBabyClient, Authentication} from "../lib";

// UPDATE THIS: Update this with your App's sync details
const auth: Authentication = {
    passphrase: '',
    dateOfBirth: new Date(),
};

const feedBaby = new FeedBabyClient();
feedBaby.ping().then(async () => {
    const version = await feedBaby.checkVersion(auth);
    console.log("Details of last sync", version);
});
