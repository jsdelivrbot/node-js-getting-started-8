import {
    University
} from '../core/contracts';

import { dataBase } from "../initDatabase";

export namespace Universities {

    export const getAllUniversities = (): Promise<Array<University>> => {

        return dataBase.ref('universidades').once('value')
            .then((snapshot: any) => {
                return snapshot.val() ? snapshot.val() : null;
            })
            .catch((error: any) => {
                console.log("Universities/getAllUniversities " + error);
            });
    };

}