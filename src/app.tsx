import { Fragment } from 'preact';
import { Switch, Route } from 'wouter-preact';
import { publicRoutes } from './core/routes';
import DefaultLayout from './Layouts';
import ZoomWarning from './shared/components/ZoomWarning/ZoomWarning';
import { CommentProvider } from './shared/contexts/CommentContext';

function App() {
    const customRoutes = publicRoutes.filter((route) => route.layout !== undefined);
    const defaultRoutes = publicRoutes.filter((route) => route.layout === undefined);

    return (
        <CommentProvider>
            <div className="app">
                <ZoomWarning />
                <Switch>
                    {/* Routes có layout riêng */}
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

                    {/* Routes dùng DefaultLayout chung */}
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
        </CommentProvider>
    );
}

export default App;
