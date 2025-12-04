import { Fragment } from 'preact';
import { Switch, Route } from 'wouter-preact';
import { publicRoutes } from './core/routes';
import DefaultLayout from './Layouts';
import ZoomWarning from './shared/components/ZoomWarning/ZoomWarning';

function App() {
    const [customRoutes, defaultRoutes] = publicRoutes.reduce(
        (acc, route) => {
            route.layout !== undefined ? acc[0].push(route) : acc[1].push(route);
            return acc;
        },
        [[], []] as [typeof publicRoutes, typeof publicRoutes],
    );

    return (
        <div className="app">
            <ZoomWarning />
            <Switch>
                {customRoutes.map((route, i) => {
                    const Layout: any = route.layout || Fragment;
                    return (
                        <Route key={i} path={route.path}>
                            <Layout>
                                <route.component />
                            </Layout>
                        </Route>
                    );
                })}
                <Route>
                    <DefaultLayout>
                        <Switch>
                            {defaultRoutes.map((route, i) => (
                                <Route key={i} path={route.path}>
                                    <route.component />
                                </Route>
                            ))}
                        </Switch>
                    </DefaultLayout>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
