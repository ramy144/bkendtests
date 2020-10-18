import { UserInterface } from "../../user/interfaces/user.interface";
import { IPrincipal } from "../interfaces/principal.interface";

export class Principal implements IPrincipal {
    constructor(public user: UserInterface) { }
}