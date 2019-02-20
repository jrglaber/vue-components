<template>
    <div class="box-image">
        <a href="#" class="delete" @click.prevent="$emit('deletar')">x</a>
        <div
            class="image"
            :style="'background-image: url(' + image.url + ')'" />

        <div v-if="info" class="info">
            <input type="text" v-model="image.legend" placeholder="legenda">
            <input type="text" v-model="image.author" placeholder="autor">
            <input type="date" v-model="image.date" placeholder="data">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Box",
        props: {
            image: {
                type: Object,
                required: true,
                default: () => {
                    return {
                        url: null,
                        id: null,
                        legend: null,
                        author: null,
                        date: null,
                        file: null
                    }
                }
            },
            info: {
                type: Boolean,
                default: false
            },
        },
    }
</script>

<style lang="scss" scoped>
    .box-image{
        width: 200px;
        padding: 5px;
        display: inline-block;
        position: relative;

        .delete{
            position: absolute;
            top: 0;
            right: 0;
            color: red;
            border: 2px solid red;
            border-radius: 50%;
            background: #fff;
            padding: 1px 5px;
            text-decoration: none;
            font-weight: 700;
        }

        .image{
            width: 100%;
            height: 200px;
            background-image: none;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        .info{
            padding: 0px 5px;

            input{
                background: #fff;
                border: none;
                width: 100%;
                margin: 5px 0 0;
            }
        }
    }
</style>