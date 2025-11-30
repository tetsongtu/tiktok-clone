import { Fragment } from 'preact';
import { Switch, Route } from 'wouter-preact';
import { publicRoutes } from './core/routes';
import DefaultLayout from './Layouts';
import ZoomWarning from './shared/components/ZoomWarning/ZoomWarning';

function App() {
    return (
        <div className="app">
            <ZoomWarning />
            <Switch>
                {publicRoutes.map((route, index) => {
                    let Layout: any = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    const Page = route.component;

                    return (
                        <Route key={index} path={route.path}>
                            <Layout>
                                <Page />
                            </Layout>
                        </Route>
                    );
                })}
            </Switch>
        </div>
    );
}

export default App;
