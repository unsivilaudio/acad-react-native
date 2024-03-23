export type RootStackParamsList = {
    AllPlaces: undefined;
    AddPlace:
        | {
              pickedLat: number;
              pickedLng: number;
          }
        | undefined;
    Map:
        | {
              initialLat: number;
              initialLng: number;
          }
        | undefined;
    PlaceDetails: {
        placeId: string;
    };
};
