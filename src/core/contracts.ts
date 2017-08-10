export interface Configuration {
    pwdStudent: string;
    pwdTeacher: string;
}

export interface University {
    id: string;
    nombre: string;
    coursesList: Array<Course>;
}

export interface Course {
    idUniversity: string;
    name: string;
}

export interface Student {
    id: string;
    codigo: string;
    email: string;
}

export interface Attendance {

}

export interface Chat {
    state: string;
    command: string;
}