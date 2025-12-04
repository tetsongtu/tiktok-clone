import { Fragment } from 'preact';
import { Switch, Route } from 'wouter-preact';
import { publicRoutes } from './core/routes';
import DefaultLayout from './Layouts';
import ZoomWarning from './shared/components/ZoomWarning/ZoomWarning';

function App() {
    return (
        <div className="app">
            <ZoomWarning />
            <DefaultLayout>
                <Switch>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        // Nếu route có layout riêng hoặc không có layout
                        if (route.layout !== undefined) {
                            let Layout: any =
                                route.layout === null ? Fragment : route.layout;
                            return (
                                <Route key={index} path={route.path}>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </Route>
                            );
                        }

                        // Dùng DefaultLayout (đã wrap bên ngoài)
                        return (
                            <Route key={index} path={route.path}>
                                <Page />
                            </Route>
                        );
                    })}
                </Switch>
            </DefaultLayout>
        </div>
    );
}

export default App;
