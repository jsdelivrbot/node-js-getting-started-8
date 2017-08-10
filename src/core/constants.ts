export namespace Constants {

    export namespace Chat {

        export namespace Status {
            export namespace StudentRegistration {
                export const Student = 'StudentRegistration/Student';
                export const MisDatos = 'StudentRegistration/MisDatos';
            }
        }

        export namespace Command {
            export namespace StudentRegistration {
                export namespace Student {
                    export const MostrarMenu = 'MostrarMenu';
                }
                export namespace MisDatos {
                    export const ActualizarMiCodigo = 'ActualizarMiCodigo';
                    export const ActualizarMiEmail = 'ActualizarMiEmail';
                }
            }
        }
    }
}

export const Status = Constants.Chat.Status;
export const Commands = Constants.Chat.Command;