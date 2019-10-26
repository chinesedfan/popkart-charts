/**
 * Simple transform scripts to replace
 * https://github.com/ElementUI/babel-plugin-component
 */
const _ = require('lodash');

const names = 'Button, Tooltip, Tabs, TabPane, Row, Col, Icon';
const theme = 'theme-chalk';

names.split(', ')
    .map((name) => {
        const file = _.kebabCase(name);
        console.log(`import ${name} from 'element-ui/lib/${file}';`);
        console.log(`import 'element-ui/lib/${theme}/${file}.css';`);
        console.log(`Vue.use(${name});`);
    });
