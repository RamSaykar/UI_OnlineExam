import React, {  lazy,Suspense, Component } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import store from "./data/store";
const HomePage = lazy(() => import("./components/home/HomePage"));
const Header = lazy(() => import("./components/sub_parts/Header"));
const Footer = lazy(() => import("./components/sub_parts/Footer"));
const SignIn = lazy(() => import("./components/sub_parts/SignIn"));
const GetMyScore = lazy(() => import("./components/home/GetMyScore"));
const history = createBrowserHistory();

class RouterConfig extends Component {
  render() {

    const loading = () => (
      <div className="animated fadeIn pt-3 text-center">Loading...</div>
    );

    return (
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Suspense fallback={loading()}>
            <Header />
               <Switch>
               <Route exact path="/" render={props => <SignIn {...props} />} />
               <Route exact path="/home" render={props => <HomePage {...props} />} />
               <Route exact path="/get-my-score" render={props => <GetMyScore {...props} />} />

           </Switch>
           <Footer />
          </Suspense>
        </BrowserRouter>
      </Provider>
       );
      }
   }
export default RouterConfig;