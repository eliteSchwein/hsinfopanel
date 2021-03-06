//import store from '../store'
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;

//const sampleInterval = 1000;			// ms
const defaultMaxTemperature = 300;	// degC
const maxSampleTime = 600000;		// 10min (in ms)

export default {
    extends: Line,
    mixins: [reactiveProp],
    props: ['chartData'],
    data() {
        return {
            timer: '',
            options: {
                events: [],
                animation: {
                    duration: 0					// general animation time
                },
                elements: {
                    line: {
                        tension: 0,
                        borderWidth: 1,
                    },
                    point: {
                        radius: 0,
                    }
                },
                showLines: true,
                legend: {
                    labels: {
                        pointBackgroundColor:'rgba(203, 203, 203,0)',
                        fontColor: 'rgb(203, 203, 203)',
                        fontFamily: 'Roboto,sans-serif',
                        filter: function(item) {
                            if (item && item.text) return !item.text.includes('_target');
                        }
                    },
                    onClick: function(e, legendItem) {
                        window.console.log(e)
                        window.console.log(legendItem)

                        let ci = this.chart;
                        let index = legendItem.datasetIndex;
                        let index_target = ci.data.datasets.findIndex(dataset => dataset.label === legendItem.text+'_target');
                        let meta = ci.getDatasetMeta(index);

                        // See controller.isDatasetVisible comment
                        meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
                        if (index_target !== -1) {
                            let meta_target = ci.getDatasetMeta(index_target);
                            meta_target.hidden = meta.hidden;
                        }

                        //store.dispatch('gui/setHeaterChartVisibility', { name: legendItem.text, hidden: meta.hidden });

                        ci.update();
                    }
                },
                tooltips: {
                    enabled: false
                },
                hover: {
                    mode:undefined
                },
                /*tooltips: {
                    enabled: false,
                    mode: 'nearest',
                    caretPadding: 20,
                    intersect: false,
                    callbacks: {
                        title: function (tooltipItem) {
                            let date = new Date(tooltipItem[0].label);
                            return date.getHours()+":"+(date.getMinutes() < 10 ? "0" : "")+date.getMinutes()+":"+(date.getSeconds() < 10 ? "0" : "")+date.getSeconds();
                        },
                        label: function (tooltipItem/!*, data*!/) {
                            /!*let label_target = data['datasets'][tooltipItem.datasetIndex].label+"_target";
                            let target_dataset = data['datasets'].find(dataset => dataset.label === label_target);

                            if (target_dataset !== undefined && target_dataset.data[tooltipItem.index] !== undefined) return tooltipItem.value+" / "+target_dataset.data[tooltipItem.index].y;*!/
                            return tooltipItem.value;
                        },
                    }
                },*/
                maintainAspectRatio: false,
                responsive: true,
                responsiveAnimationDuration: 0, // animation duration after a resize
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'minute',
                            displayFormats: {
                                second: 'HH:mm:ss',
                                minute: 'HH:mm'
                            }
                        },
                        ticks: {
                            minor: {
                                fontColor: 'rgb(203, 203, 203)',
                                fontFamily: 'Roboto,sans-serif'
                            },
                            min: new Date() - maxSampleTime,
                            max: new Date(),
                        },
                        gridLines: {
                            color: 'rgba(203,203,203,0.1)',
                        },
                    }],
                    yAxes: [
                        {
                            gridLines: {
                                color: 'rgb(203, 203, 203)',
                                zeroLineColor: 'rgb(203, 203, 203)',
                                display: true
                            },
                            ticks: {
                                minor: {
                                    fontColor: 'rgb(203, 203, 203)',
                                    fontFamily: 'Roboto,sans-serif'
                                },
                                major: {
                                    fontColor: 'rgb(203, 203, 203)',
                                    fontFamily: 'Roboto,sans-serif'
                                },
                                min: 0,
                                max: defaultMaxTemperature,
                                stepSize: 50
                            }
                        }
                    ]
                }
            }
        }
    },
    created () {
        this.timer = setInterval(() => {
            this.$data._chart.config.options.scales.xAxes[0].ticks.min = new Date() - maxSampleTime
            this.$data._chart.config.options.scales.xAxes[0].ticks.max = new Date()
            this.$data._chart.update()
        }, 1000)
    },
    mounted () {
        this.renderChart(this.chartData, this.options)
    },
}