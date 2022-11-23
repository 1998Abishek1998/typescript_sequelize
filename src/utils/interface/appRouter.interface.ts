import { Router } from "express";

export default interface AppRouter {
    path: string,
    router: Router
}