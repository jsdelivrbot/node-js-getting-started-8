export interface Configuration {
    pwdStudent:string;
    pwdTeacher:string;
}

export interface University {
    id:string;
    name:string;
}

export interface Course {
    idUniversity:string;
    name: string;    
}

export interface Student {
    id:string;
    codigo:string;
    email: string;
}

export interface Attendance {

}

export interface Chat {
    id:string;
}