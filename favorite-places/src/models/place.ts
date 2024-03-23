export class Place {
    public id: string;
    public address: string;
    public location: {
        lat: number;
        lng: number;
    };

    static create(
        title: string,
        imageUri: string,
        location: {
            lat: number;
            lng: number;
            address: string;
        },
        id: string
    ) {
        return new Place(title, imageUri, location, id);
    }
    private constructor(
        public title: string,
        public imageUri: string,
        pickedLocation: {
            lat: number;
            lng: number;
            address: string;
        },
        id: string
    ) {
        this.id = id;
        this.title = title;
        this.address = pickedLocation.address;
        this.imageUri = imageUri;
        this.location = {
            lat: pickedLocation.lat,
            lng: pickedLocation.lng,
        };
    }
}
