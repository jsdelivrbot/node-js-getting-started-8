import {
    University, Course
} from '../core/contracts';

import { dataBase } from "../initDatabase";

export namespace Universities {

    export const getAllUniversities = (): Promise<Array<University>> => {

        return dataBase.ref('universidades').once('value')
            .then((snapshot: any) => {

                if (!snapshot.val()) {
                    return null;
                }

                let result = snapshot.val();
                let universitiesList: Array<University> = new Array<University>();

                for (let university in result) {

                    universitiesList.push({
                        id: university,
                        nombre: result[university].nombre,
                        coursesList: []
                    } as University);

                    for (let course in result[university].asignaturas) {

                        universitiesList[parseInt(university) - 1].coursesList.push(
                            {
                                idUniversity: university,
                                name: result[university].asignaturas[course].nombre
                            } as Course
                        );
                    }
                }

                return universitiesList;
            })
            .catch((error: any) => {
                console.log("Universities/getAllUniversities " + error);
            });
    };

}