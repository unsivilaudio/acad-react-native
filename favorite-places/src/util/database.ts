import { Place } from '@/models/place';
import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('places.db');

export function init() {
    const promise = new Promise((res, rej) => {
        database.transaction(tx => {
            tx.executeSql(
                `
                CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                );
            `,
                [],
                () => {
                    res(true);
                },
                (_, error) => {
                    rej(error);
                    return false;
                }
            );
        });
    });

    return promise;
}

export function insertPlace(place: Omit<Place, 'id'>) {
    const promise = new Promise<Place>((res, rej) => {
        database.transaction(tx => {
            tx.executeSql(
                `
                INSERT INTO places (title, imageUri, address, lat, lng)
                VALUES
                    (
                        ?,?,?,?,?
                    )
            `,
                [
                    place.title,
                    place.imageUri,
                    place.address,
                    place.location.lat,
                    place.location.lng,
                ],
                (_, result) => {
                    const addedPlace = Place.create(
                        place.title,
                        place.imageUri,
                        {
                            address: place.address,
                            lat: place.location.lat,
                            lng: place.location.lng,
                        },
                        result.insertId!.toString()
                    );
                    res(addedPlace);
                },
                (_, error) => {
                    rej(error);
                    return true;
                }
            );
        });
    });
    return promise;
}

export function fetchPlaces() {
    const promise = new Promise<Place[]>((res, rej) => {
        database.transaction(tx => {
            tx.executeSql(
                `
                SELECT * FROM places;
            `,
                [],
                (_, result) => {
                    const places: Place[] = [];

                    for (const dp of result.rows._array) {
                        places.push(
                            Place.create(
                                dp.title,
                                dp.imageUri,
                                {
                                    lat: dp.lat,
                                    lng: dp.lng,
                                    address: dp.address,
                                },
                                dp.id
                            )
                        );
                    }

                    return res(result.rows._array);
                },
                (_, error) => {
                    rej(error);
                    return false;
                }
            );
        });
    });
    return promise;
}

export function fetchPlaceDetails(id: string) {
    const promise = new Promise<Place>((res, rej) => {
        database.transaction(tx => {
            tx.executeSql(
                `
                SELECT * FROM places WHERE id = ?;
            `,
                [id],
                (_, result) => {
                    const row = result.rows._array[0];
                    const place = Place.create(
                        row.title,
                        row.imageUri,
                        {
                            address: row.address,
                            lat: row.lat,
                            lng: row.lng,
                        },
                        row.id
                    );
                    res(place);
                },
                (_, error) => {
                    rej(error);
                    return false;
                }
            );
        });
    });
    return promise;
}
