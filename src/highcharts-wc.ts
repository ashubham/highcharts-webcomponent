import {
    LitElement,
    property,
    html,
    customElement,
    query
} from "lit-element";
import Highcharts from "highcharts";

export type HighchartsConstructorType =
    | "chart"
    | "stockChart"
    | "mapChart"
    | "ganttChart";

/**
 * @element highcharts-chart
 * 
 * @fires load - Event fired after the chart is created. The `detail` arg will hold the created chart
 */
@customElement("highcharts-chart")
export default class HighchartsWebComponent extends LitElement {
    /**
     * String for constructor method. Official constructors:
     *  - 'chart' for Highcharts charts
     *  - 'stockChart' for Highstock charts
     *  - 'mapChart' for Highmaps charts
     *  - 'ganttChart' for Gantt charts
     */
    @property({ type: String }) constructorType: HighchartsConstructorType =
        "chart";
    
    /**
     * Used to pass the Highcharts instance after modules are initialized.
     * If not set the component will try to get the Highcharts from window.
     */
    @property({ attribute: false }) highcharts = Highcharts;
    
    /**
     * Highcharts chart configuration object.
     * Please refer to the Highcharts (API documentation)[https://api.highcharts.com/highcharts/].
     */
    @property({ attribute: false }) options: Object;
    
    /**
     * This wrapper uses chart.update() method to apply new options
     * to the chart when changing the parent component.
     * This option allow to turn off the updating.
     */
    @property({ type: Boolean }) allowChartUpdate: boolean = true;
    
    /**
     * Reinitialises the chart on prop update (as oppose to chart.update())
     * useful in some cases but slower than a regular update.
     */
    @property({ type: Boolean }) immutable: boolean = false;

    /**
     * Array of update()'s function optional arguments.
     * Parameters should be defined in the same order like in
     * native Highcharts function: [redraw, oneToOne, animation]. 
     * (Here)[https://api.highcharts.com/class-reference/Highcharts.Chart#update] is a more specific description of the parameters.
     */
    @property({ attribute: false }) updateArgs: [boolean, boolean, boolean] = [
        true,
        true,
        true
    ];

    @query("div")
    private chartContainer;
    private chart;

    firstUpdated() {
        this.createChart();
    }

    updated() {
        if (this.allowChartUpdate !== false) {
            if (!this.immutable && this.chart) {
                this.chart.update(this.options, ...(this.updateArgs || [true, true]));
            } else {
                this.createChart();
            }
        }
    }

    render() {
        return html`
        <div></div>
      `;
    }

    private createChart() {
        const H = this.highcharts;
        const constructorType = this.constructorType;

        if (!H) {
            console.warn('The "highcharts" property was not passed.');
        } else if (!H[constructorType]) {
            console.warn(
                'The "constructorType" property is incorrect or some ' +
                "required module is not imported."
            );
        } else if (!this.options) {
            console.warn('The "options" property was not passed.');
        } else {
            // Create a chart
            this.chart = H[constructorType](
                this.chartContainer,
                this.options,
                this.chartCreated.bind(this)
            );
        }
    }

    private chartCreated(chart) {
        let e = new CustomEvent('load', {
            detail: chart
        });
        this.dispatchEvent(e);
    }

    disconnectedCallback() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}
