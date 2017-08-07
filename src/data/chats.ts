import {
    Chat
} from '../core/contracts';

export namespace Chats {

    export const getById = (id:string) : Chat|null  => {

        if(1 == 1){
            return {
                id:"df"
            } as Chat;
        }

        return null;

    };

}