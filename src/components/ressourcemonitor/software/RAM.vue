
<template>
    <div>
        <v-card>
            <v-toolbar flat dense >
                <v-toolbar-title>
                    <span class="subheading"><v-icon left>mdi-chart-donut</v-icon>Usage</span>
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="py-1">
                <v-col class="py-0 px-3 equal-width">
                    <v-row>
                        <v-col class="py-0 px-3 pt-3">
                            <line-chart :chart-data="chartdata" :max="(this.$store.state.ressourcemonitor.ram.total/1024/1024/1024).toFixed(0)+1"></line-chart>
                        </v-col>
                    </v-row>
                    <v-row class="py-5">
                        <v-col class="py-0 px-3 equal-width">
                            <v-row>
                                <v-col class="py-1 px-1">
                                    <div v-bind:style="{fontSize:'10px',marginLeft:'auto',marginRight:'auto',width: '130px',height:'40px',backgroundImage:'url('+require('@/assets/ressourcemonitor/partition.png')+')'}">
                                        <div style="color: rgb(76, 76, 76);margin-top: -1px;margin-bottom: -29px;margin-left: 98px;">
                                            RAM
                                        </div>
                                        <div class="pl-2 pt-1 mt-2" style="line-height: 17px;">
                                            <strong>Total: </strong> {{(this.$store.state.ressourcemonitor.ram.total/1024/1024/1024).toFixed(2)}} GB <br>
                                            <strong>Used: </strong> {{(this.$store.state.ressourcemonitor.ram.used/1024/1024/1024).toFixed(2)}} GB<br>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col class="py-1 px-1">
                                    <div v-bind:style="{fontSize:'10px',marginLeft:'auto',marginRight:'auto',width: '130px',height:'40px',backgroundImage:'url('+require('@/assets/ressourcemonitor/partition.png')+')'}">
                                        <div style="color: rgb(76, 76, 76);margin-top: -1px;margin-bottom: -29px;margin-left: 94px;">
                                            Swap
                                        </div>
                                        <div class="pl-2 pt-1 mt-2" style="line-height: 17px;">
                                            <strong>Size:</strong> {{(this.$store.state.ressourcemonitor.ram.totalswap/1024/1024/1024).toFixed(2)}} GB<br>
                                            <strong>Used:</strong> {{(this.$store.state.ressourcemonitor.ram.usedswap/1024/1024/1024).toFixed(2)}} GB<br>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import LineChart from '@/charts/LineChartUsage.js'
    export default {
        components: {
            LineChart
        },
        data: function() {
            return {
                dialogRAM: {
                    show: false,
                    emptySlot: false,
                    module: []
                },
                chartdata: {
                    datasets: []
                },
                chartoptions: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    max: 15
                                }
                            }
                        ]
                    }
                },
            }
        },
        computed: {
            ...mapState ({
                datasets: state => state.ressourcemonitor.ramHistory.datasets,
            }),
            datasets: {
                get () {
                    return this.$store.state.ressourcemonitor.ramHistory.datasets
                }
            },
            ifsoc:function(){
                var socket=this.$store.state.ressourcemonitor.cpu.socket;
                console.log(socket)
                if(socket=="SOC"||socket==""||socket=="Unknown"){
                    return true;
                }
                return false;
            }
        },
        methods: {

        },
        mounted(){
            this.chartdata = {
                datasets: this.datasets
            }

        }
    }
</script>