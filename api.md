# highcharts-chart
## Properties

| Property           | Attribute          | Type                                             | Default      | Description                                      |
|--------------------|--------------------|--------------------------------------------------|--------------|--------------------------------------------------|
| `allowChartUpdate` | `allowChartUpdate` | `boolean`                                        | true         | This wrapper uses chart.update() method to apply new options<br />to the chart when changing the parent component.<br />This option allow to turn off the updating. |
| `constructorType`  | `constructorType`  | `HighchartsConstructorType`                      | "chart"      | String for constructor method. Official constructors:<br />  - 'chart' for Highcharts charts<br />  - 'stockChart' for Highstock charts<br />  - 'mapChart' for Highmaps charts<br />  - 'ganttChart' for Gantt charts |
| `highcharts`       |                    | `typeof import("/Users/ashish.shubham/hack/highcharts-webcomponent/node_modules/highcharts/highcharts")` |              | Used to pass the Highcharts instance after modules are initialized.<br />If not set the component will try to get the Highcharts from window. |
| `immutable`        | `immutable`        | `boolean`                                        | false        | Reinitialises the chart on prop update (as oppose to chart.update())<br />useful in some cases but slower than a regular update. |
| `options`          |                    | `Object`                                         | **required** | Highcharts chart configuration object.<br />Please refer to the Highcharts (API documentation)[https://api.highcharts.com/highcharts/]. |
| `updateArgs`       |                    | `[boolean, boolean, boolean]`                    |              | Array of update()'s function optional arguments.<br />Parameters should be defined in the same order like in<br />native Highcharts function: [redraw, oneToOne, animation]. <br />(Here)[https://api.highcharts.com/class-reference/Highcharts.Chart#update] is a more specific description of the parameters. |

## Events

| Event  | Description                                      |
|--------|--------------------------------------------------|
| `load` | Event fired after the chart is created. The `detail` arg will hold the created chart |
