<style>
    @import './assets/styles/fonts.css';
    @import './assets/styles/toastr.css';
    @import './assets/styles/keyboard.css';
    @import './assets/styles/misc.css';
    @import './assets/styles/scrollbar.css';

    .button-min-width-auto {
        min-width: auto !important;
    }

    #page-container {
        max-width: 1400px;
    }
</style>

<template>
    <v-app>
        <vue-headful title="HS Info" />
        <v-navigation-drawer
            class="sidebar-wrapper" disable-resize-watcher persistent v-model="drawer" fixed app
            :src="require('./assets/bg-navi.png')"
            
        >
            <div id="nav-header">
                <img :src="require('./assets/logo.svg')" />
                <v-toolbar-title>
                    HS Info <p class="mb-0 text-body-2 pl-0 pb-2" style="font-size: 11px!important;line-height: 2px;">v{{ getVersion }}</p>
                </v-toolbar-title>
            </div>
            <v-list nav dense>
                <v-list-item link v-for="server in this.$store.state.ressourcemonitor.servers" v-bind:key="server.url" @click="changeServer(server)">
                    <v-list-item-icon>
                        <v-icon>mdi-{{server.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{server.label}}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        
        <v-app-bar app elevate-on-scroll color="#212121CC">
            
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-main id="content" v-bind:style="{backgroundImage:'url('+require('@/assets/background.jpg')+')',backgroundAttachment:'fixed',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}">
            
            <v-scroll-y-transition>
                <v-container fluid id="page-container" class="container px-sm-6 px-3 mx-auto">
                    <keep-alive>
                        <ressourcemonitor></ressourcemonitor>
                    </keep-alive>
                </v-container>
            </v-scroll-y-transition>
        </v-main>
    </v-app>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    import Ressourcemonitor from './pages/Ressourcemonitor.vue'

export default {
    props: {
        source: String,
    },
    components: {
        Ressourcemonitor
    },
    data: () => ({
        drawer: false,
        activeClass: 'active',
        selectedServer: null
    }),
    created () {
        this.$vuetify.theme.dark = true;
        this.$store.state.ressourcemonitor.selectedserver=this.$store.state.ressourcemonitor.servers[0]
    },
    computed: {
        ...mapState({
            
        }),
        ...mapGetters([
            'getTitle',
            'getVersion'
        ]),
    },
    mounted() {

    },
    methods: {
        changeServer(server){
            this.$store.state.ressourcemonitor.selectedserver=server
        },
        drawFavicon(val) {
            let favicon16 = document.querySelector("link[rel*='icon'][sizes='16x16']")
            let favicon32 = document.querySelector("link[rel*='icon'][sizes='32x32']")

            if (val > 0 && val < 100) {
                let faviconSize = 64;

                let canvas = document.createElement('canvas');
                canvas.width = faviconSize;
                canvas.height = faviconSize;
                let context = canvas.getContext('2d');
                let centerX = canvas.width / 2;
                let centerY = canvas.height / 2;
                let radius = 32;
                let percent = val * 100;

                /* draw the grey circle */
                context.beginPath();
                context.moveTo(centerX, centerY);
                context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                context.closePath();
                context.fillStyle = "#ddd";
                context.fill();
                context.strokeStyle = "rgba(200, 208, 218, 0.66)";
                context.stroke();

                /* draw the green circle based on percentage */
                let startAngle = 1.5 * Math.PI;
                let endAngle = 0;
                let unitValue = (Math.PI - 0.5 * Math.PI) / 25;
                if (percent >= 0 && percent <= 25) endAngle = startAngle + (percent * unitValue);
                else if (percent > 25 && percent <= 50) endAngle = startAngle + (percent * unitValue);
                else if (percent > 50 && percent <= 75) endAngle = startAngle + (percent * unitValue);
                else if (percent > 75 && percent <= 100) endAngle = startAngle + (percent * unitValue);

                context.beginPath();
                context.moveTo(centerX, centerY);
                context.arc(centerX, centerY, radius, startAngle, endAngle, false);
                context.closePath();
                context.fillStyle = "#e41313";
                context.fill();

                favicon16.href = canvas.toDataURL('image/png')
                favicon32.href = canvas.toDataURL('image/png')
            } else {
                favicon16.href = "/img/icons/favicon-16x16.png"
                favicon32.href = "/img/icons/favicon-32x32.png"
            }
        }
    },
    watch: {
        
    },
}
</script>

<style>
    body {
      background: #121212;
    }
    /*.sidebar-wrapper:before {
        position: absolute;
        content: ' ';
        top: 0; right: 0; bottom: 0; left: 0;
        background: #000;
        opacity: .5;
    }*/

    #nav-header {
        text-align: center;
        border-bottom: 1px solid #ffffff40;
        margin-bottom: 1em;
        padding: .75em 0 .75em 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #nav-header img {
        height: 40px;
        margin-right: 1em;
    }

    #nav-header .v-toolbar__title {
        font-size: 24px;
        vertical-align: middle;
    }

    .v-navigation-drawer__content {
        z-index: 10;
    }

    nav ul.navi {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    nav ul.navi li.nav-item {
        padding: 0;
        margin: 0;
    }

    nav ul.navi a.nav-link {
        display: block;
        color: white;
        border-radius: .5em;
        line-height: 30px;
        font-size: 14px;
        font-weight: 600;
        padding: 10px 15px;
        opacity: .85;
        transition: all .15s ease-in;
        text-decoration: none;
        margin: 0.5em 1em;
    }

    nav ul.navi a.nav-link>i.v-icon {
        color: white;
        font-size: 1.7em;
        margin-right: .5em;
    }

    nav ul.navi a.nav-link>span.nav-title {
        line-height: 30px;
        font-weight: 600;
        text-transform: uppercase;
        white-space: nowrap;
        letter-spacing: 1px;
    }

    nav ul.navi a.nav-link>i.nav-arrow {
        float: right;
        margin-top: 5px;
        margin-right: 0;
        transform: rotate(90deg);
    }

    nav ul.navi>li>ul.child {
        display: none;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    nav ul.navi>li>ul.child a.nav-link {
        padding: 5px 15px 5px 15px;
    }

    nav ul.navi>li>ul.child a.nav-link>span.nav-title {
        text-transform: capitalize;
        font-weight: 400;
        font-size: 14px;
    }

    .v-btn--absolute.v-btn--bottom, .v-btn--fixed.v-btn--bottom {
        bottom: 52px;
    }


</style>
