import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
import * as express from 'express';
import * as helmet from 'helmet';
import {join} from 'path';
import {ngExpressEngine} from '@nguniversal/express-engine';
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import {AppConfig} from './src/app/configs/app.config';

enableProdMode();

// Because of this https://github.com/angular/angular/issues/18199#issue-243593688
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


const domino = require('domino');
const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(process.cwd(), 'dist', 'browser', 'index.html')).toString();
const win = domino.createWindow(template);

const window = 'window';
const document = 'document';
const DOMTokenList = 'DOMTokenList';
const Node = 'Node';
const Text = 'Text';
const jQuery = 'jQuery';
const HTMLElement = 'HTMLElement';
const Materialize = 'Materialize';
const navigator = 'navigator';

win.process = process;

global[window] = win;
global[document] = win.document;
global[DOMTokenList] = win.DOMTokenList;
global[Node] = win.Node;
global[Text] = win.Text;
global[jQuery] = {};

// global['$'] = require('jquery');
// global['window.$'] = require('jquery');
global[HTMLElement] = win.HTMLElement;
global[Materialize] = win.Materialize;
global[navigator] = win.navigator;





const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const routes = [
  {path: '/es/*', view: 'es/index', bundle: require(join(DIST_FOLDER, 'server', 'es', 'main'))},
  {path: '/*', view: 'index', bundle: require(join(DIST_FOLDER, 'server', 'en', 'main'))}
];

app.use(helmet());
app.use(helmet.referrerPolicy({policy: 'same-origin'}));
app.use(helmet.noCache());
app.use(helmet.featurePolicy({
  features: {
    fullscreen: ['\'self\''],
    payment: ['\'none\''],
    syncXhr: ['\'none\'']
  }
}));

app.use(helmet.contentSecurityPolicy({
  directives: AppConfig.cspDirectives
}));

// Load your engine
app.engine('html', (filePath, options: any, callback) => {
  options.engine(
    filePath,
    {req: options.req, res: options.res},
    callback
  );
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.render(route.view, {
      req, res, engine: ngExpressEngine({
        bootstrap: route.bundle.AppServerModuleNgFactory,
        providers: [provideModuleMap(route.bundle.LAZY_MODULE_MAP)]
      })
    });
  });
});

// app.listen(PORT, () => {
//   console.log(`Node server listening on http://localhost:${PORT}`);
// });

export default app;
