import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { AuthRoute } from "../modules/auth/auth.route";
import { FolderRoute } from "../modules/folder/folder.route";
import { FilesRoutes } from "../modules/files/files.route";
import { PDFRoutes } from "../modules/pdf/pdf.route";
import { NoteRoute } from "../modules/note/note.route";
import { storageRoute } from "../modules/storage/storage.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path: "/folder",
    route: FolderRoute,
  },
  {
    path: "/image",
    route: FilesRoutes,
  },
  {
    path: "/pdf",
    route: PDFRoutes,
  },
  {
    path: "/note",
    route: NoteRoute,
  },
  {
    path: "/storage",
    route: storageRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
