<template>
    <div v-if="layout">
        <header>
            <router-link
                    v-for="item in layout.children"
                    v-if="item.meta.visible"
                    :key="item.name"
                    :to="{name: item.name }">{{ item.meta.title }}</router-link>
        </header>
        <h1>{{ title }}</h1>

        <ul>
            <li v-for="breadcrumb in breadcrumbs">
                <router-link :to="{name: breadcrumb.name }">{{ breadcrumb.title }}</router-link>
            </li>
        </ul>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Layout",
        data() {
            return {
                title: 'Título da página',
                breadcrumbs: [],
                menu: [],
                layout: null,
            }
        },
        watch: {
            "$route": function () {
                this.getTitle()
            }
        },
        methods: {
            getTitle() {
                this.title = this.$route.meta.title
                this.breadcrumbs = []
                _.forEach(this.$route.matched, (obj) => {
                    this.breadcrumbs.push({
                        name: obj.name,
                        title: obj.meta.title,
                    })
                })
            }
        },
        created() {
            this.layout = _.find(this.$router.options.routes, ['meta.layout', true])
            this.getTitle()
        },
    }
</script>

<style lang="scss" scoped>
    header{
        a{
            margin: 0 5px;
            display: inline-block;
            border: 1px solid #000;
            text-decoration: none;
            padding: 5px 10px;
            color: green;

            &.router-link-active{
                background: green;
                color: #fff;
            }
        }
    }

    ul{
        list-style: none;
        padding: 0;

        li{
            display: inline-block;
            margin: 0 5px 0 0;
            font-size: 11px;

           &:after{
                content: ' / ';
                color: #999;
                display: inline-block;
                margin: 0 0 0 5px;
            }

            &:last-child{
                &:after{
                    content: '';
                    margin: 0;
                }

                a{
                    color: #999;
                }
            }

            a{
                text-decoration: none;
                color: orange;
            }
        }
    }

    .container{
        border: 1px dashed #eee;
        max-width: 990px;
        margin: 10px auto;
    }
</style>