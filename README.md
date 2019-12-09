# Highcharts WebComponent <img src="https://github.com/ashubham/highcharts-webcomponent/raw/master/assets/highcharts-wc-2.png" align="right" alt="highcharts-wc" />

[![npm version](https://badge.fury.io/js/highcharts-webcomponent.svg)](https://badge.fury.io/js/highcharts-webcomponent)

Highcharts WebComponent wrapper.
- Usable with any Framework.
- Or without any.

## Installing

```
npm install highcharts-webcomponent
```
If Highcharts is not already installed, get the package with Highcharts:
```
npm install highcharts highcharts-webcomponent
```

## Demo

Live Example: https://webcomponents.dev/edit/ObQbCXjw2znEukL93AU3


## Using

### Basic usage example

1. Import into your project:

```js
import 'highcharts-webcomponent';

OR

<script type="module" src="node_modules/highcharts-webcomponent/build/highcharts-wc.js"></script>
```

2. Start using it with any framework
```js
const options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
}
```
- LitHTML
```js
html`
<highcharts-chart .options=${options} @load=${this.onChartLoad}>
</highcharts-chart>`
```

- Vue
```html
<highcharts-chart :options="options" @load="onChartLoad">
</highcharts-chart>
```

- Angular
```html
<highcharts-chart [options]="options" (load)="onChartLoad()">
</highcharts-chart>
```

- React
```js
render() {
    return (
        <highcharts-chart ref="chart"></highcharts-chart>
    );
}

// Notice that we added ref attributes for the component.
// This enables us to reference the components in the next step.

componentDidMount() {
    this.refs.chart.options = options;
    this.refs.chart.addEventListener('load', this.onChartLoad);
}
```

- AngularJS
```html
<highcharts-chart ng-prop-options="options" ng-on-load="onChartLoad">
</highcharts-chart>
```

## Properties & Events

### Properties

| Property           | Attribute          | Type           | Default      | Description                                      |
|----------------|----------------|--------------------|------------|--------------------------------------------------|
| `allowChartUpdate` | `allowChartUpdate` | `boolean`                                        | true         | This wrapper uses chart.update() method to apply new options<br />to the chart when changing the parent component.<br />This option allow to turn off the updating. |
| `constructorType`  | `constructorType`  | `'chart' | 'stockChart' | 'mapChart' | 'ganttChart'`                      | 'chart'      | String for constructor method. Official constructors:<br />  - 'chart' for Highcharts charts<br />  - 'stockChart' for Highstock charts<br />  - 'mapChart' for Highmaps charts<br />  - 'ganttChart' for Gantt charts |
| `highcharts`       |                    | |              | Used to pass the Highcharts instance after modules are initialized.<br />If not set the component will try to get the Highcharts from window. |
| `immutable`        | `immutable`        | `boolean`                                        | false        | Reinitialises the chart on prop update (as oppose to chart.update())<br />useful in some cases but slower than a regular update. |
| `options`          |                    | `Object`                                         | **required** | Highcharts chart configuration object.<br />Please refer to the Highcharts [API documentation](https://api.highcharts.com/highcharts/). |
| `updateArgs`       |                    | `[boolean, boolean, boolean]`                    |     `[true, true, true]`         | Array of update()'s function optional arguments.<br />Parameters should be defined in the same order like in<br />native Highcharts function: [redraw, oneToOne, animation]. <br />[Here](https://api.highcharts.com/class-reference/Highcharts.Chart#update) is a more specific description of the parameters. |

### Events

| Event  | Description                                      |
|--------|--------------------------------------------------|
| `load` | Event fired after the chart is created. The `detail` arg will hold the created chart |

<br/>

#### Copyright
- The Highcharts logo is a property of Highsoft AS, Norway.
- The Webcomponents logo is a property of Webcomponents.org

