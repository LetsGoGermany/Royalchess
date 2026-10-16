import { Prisma } from "@prisma/client";
export default function errorHandling(err, req, res, next) {
    console.log('Fehler: ' + err.message)
    if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
    ) {
        return res.status(409).json({
            success: false,
            message: "Benutzername oder E-Mail-Adresse bereits vergeben"
        });
    }



    return res.status(500).json({
        success: false,
        message: err.message
    });
}
