<template>
    <div>
        <image-builder
                v-model="images"></image-builder>
        <button v-if="hasImages" type="button" @click="send">Enviar</button>
    </div>
</template>

<script>
    import ImageBuilder from './../components/Image/ImageBuilder.vue'
    export default {
        name: "ImagePreview",
        components: {
            ImageBuilder
        },
        data() {
            return {
//                images:[
//                    {
//                        url: 'https://image.freepik.com/fotos-gratis/campo-com-grama-e-nuvens_1112-621.jpg',
//                        id: 1,
//                        legend: 'Campo bonito',
//                        author: 'Google',
//                        date: '2019-01-30',
//                    }
//                ],
                images: null,
            }
        },
        computed: {
            hasImages () {
                return _.size(this.images) > 0
            },
        },
        methods: {
            send () {
                console.dir(this.images)
                let formData = new FormData()
                if(_.isArray(this.images)) {
                    _.forEach(this.images, (file, i) => {
                        this.prepareFile(formData, file, i)
                    })
                }
                else if(_.isObject(this.images)){
                    this.prepareFile(formData, this.images)
                }

                for (var value of formData.values()) {
                    console.dir(value);
                }
            },
            prepareFile (formData, file, i) {
                i = _.isUndefined(i) ? 0 : i
                formData.append('file[' + i + '][id]', file.id)
                formData.append('file[' + i + '][legend]', file.legend)
                formData.append('file[' + i + '][author]', file.author)
                formData.append('file[' + i + '][date]', file.date)
                formData.append('file[' + i + '][file]', file.file)
            },
        },
    }
</script>

<style lang="scss" scoped>
    button{
        margin-bottom: 10px;
    }
</style>