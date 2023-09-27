class FavoriteYouTubeChannel {
    constructor(subscription) {
        this.subscription = subscription;
    }

    uploadNewVideo(title) {
        this.subscription.notify(`new video: ${title}`);
    }
}

class Subscription {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    notify(message) {
        this.observers.forEach((observer) => {
            observer(message);
        });
    }
}

const subscriber1 = (data) => {
    console.log(data);
}

const subscriber2 = (data) => {
    console.log(data);
}

const subscription = new Subscription();
const favoriteYouTubeChannel = new FavoriteYouTubeChannel(subscription);

// subscribe
subscription.subscribe(subscriber1);
subscription.subscribe(subscriber2);

// event trigger!
favoriteYouTubeChannel.uploadNewVideo('Ultimate Prank Bro!');

// unsubscribe
subscription.unsubscribe(subscriber2);

// event trigger!
favoriteYouTubeChannel.uploadNewVideo('Mukbang Seafood!');

/* output
new video: Ultimate Prank Bro!
new video: Ultimate Prank Bro!
new video: Mukbang Seafood!
*/
