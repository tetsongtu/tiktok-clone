import { Fragment } from 'preact';
import { Router, Switch, Route } from 'wouter-preact';
import { publicRoutes } from './routes';
import DefaultLayout from './Layouts';
import ZoomWarning from './components/ZoomWarning';

function App() {
    return (
        <Router>
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
        </Router>
    );
}

export default App;
