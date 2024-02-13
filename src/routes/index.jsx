import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Suspense } from "react";
import Home from "../views/Home";
import Detail from "../views/Detail";
import Error404 from "../views/Error404";
import Profile from "../views/Profile";


import LikedEvents from "../views/Profile/components/LikedEvents";
import MyInfo from "../views/Profile/components/MyInfo";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error404></Error404>
    },
    {
        path: '/detail/:eventId',
        element: (
            <Suspense fallback={<div>Cargando...</div>}>
                <Detail></Detail>
            </Suspense>
        )
    },
    {
        path: '/profile',
        element: <Profile></Profile>,
        children: [
            {
                path: 'my-info',
                element: <MyInfo></MyInfo>
            },
            {
                path: 'liked-events',
                element: <LikedEvents></LikedEvents>
            }

        ]
    }
]);

const MyRoutes = () => {
    return (
        <RouterProvider router={router}></RouterProvider>
    );
};

export default MyRoutes;