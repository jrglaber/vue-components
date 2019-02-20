<template>
    <form ref="form">
        <div class="base-image-input" @click.self="chooseImage" ref="chooseImage">
            <span v-if="!hasImages" class="placeholder" @click.self="chooseImage">Escolha uma imagem</span>
            <box v-else
                 v-for="(image,i) in images"
                 :image="image"
                 :info="info"
                 :key="i"
                 @deletar="deletar(i)"/>
            <input
                    type="file"
                    class="file-input"
                    ref="fileInput"
                    @input="onSelectFile"/>
        </div>
    </form>
</template>

<script>
    import Box from './ImageBox.vue'
    export default {
        name: "Builder",
        components: {
            Box
        },
        props: {
            value: {
                type: [Object,Array],
                default: null,
            },
            multiple: {
                type: Boolean,
                default: false
            },
            clear: {
                type: Boolean,
                default: false
            },
            info: {
                type: Boolean,
                default: false
            },
            minWidth: {
                type: Number,
                default: 500,
            },
            minHeight: {
                type: Number,
                default: 300,
            },
        },
        data() {
            return {
                images: [],
            }
        },
        computed: {
            hasImages () {
                return  _.size(this.value) > 0
            },
            isArray () {
                return _.isArray(this.value) || (this.multiple && _.isNull(this.value))
            },
            clearImages () {
                return this.clear || !this.isArray
            },
        },
        methods: {
            chooseImage () {
                let input = this.$refs.fileInput
                if(this.isArray) $(input).attr('multiple','multiple')
                input.click()
            },
            onSelectFile () {
                let input = this.$refs.fileInput
                let files = input.files
                if (files && files[0]) {
                    this.uploadFiles(files)
                    if(this.clearImages)  $(input).val('')
                }
            },
            uploadFiles (files) {
                if(this.clearImages) {
                    this.images = []
                }
                _.forEach(files, (file) =>{
                    if( this.checkImageType(file) ) {
                        let reader = new FileReader
                        reader.onload = e => {
                            this.checkImageDimensions(e.target.result, () => {
                                this.addImage({
                                    url: e.target.result,
                                    id: 0,
                                    legend: null,
                                    author: null,
                                    date: _.now(),
                                }, file)
                            })
                        }
                        reader.readAsDataURL(file)
                    }
                })

                _.delay(() => {
                    this.$emit('input', this.isArray ? this.images : _.first(this.images))
                }, 100)
            },
            checkImageType (file) {
                return file.type.search('image') >= 0
            },
            checkImageDimensions (src, callback) {
                let img = new Image
                img.src = src
                img.onload = () => {
                    if(img.width < this.minWidth || img.height < this.minHeight){
                        alert('A imagem deve ter pelo menos ' + this.minWidth + 'px de largura e ' + this.minHeight + 'px de altura')
                    }
                    else if(_.isFunction(callback)){
                        callback()
                    }
                }
            },
            addImage (info, file) {
                this.images.push({
                    url: info.url,
                    id: info.id,
                    legend: info.legend,
                    author: info.author,
                    date: info.date,
                    file: !_.isUndefined(file) ? file : null
                })
            },
            deletar (index) {
                this.images.splice(index,1)
                let image = this.isArray ? this.images : _.first(this.images)
                this.$emit('input', _.isUndefined(image) ? null : image)
            },
        },
        created () {
            if(this.isArray){
                _.forEach(this.value, (image) => {
                    this.addImage(image)
                })
            }
            else if(_.isObject(this.value)){
                this.addImage(this.value)
            }
        },
        mounted () {
            let drags = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop']
            _.forEach(drags, evt => {
                this.$refs.chooseImage.addEventListener(evt, e => {
                    e.preventDefault()
                    e.stopPropagation()
                }, false)
            })

            this.$refs.chooseImage.addEventListener('drop', e => {
                this.uploadFiles(this.isArray ? e.dataTransfer.files : [e.dataTransfer.files[0]])
                this.$refs.chooseImage.classList.remove('drag-active')
            }, false)

            this.$refs.chooseImage.addEventListener('dragover', e => {
                this.$refs.chooseImage.classList.add('drag-active')
            }, false)

            this.$refs.chooseImage.addEventListener('dragleave', e => {
                this.$refs.chooseImage.classList.remove('drag-active')
            }, false)
        },
    }
</script>

<style lang="scss" scoped>
    .base-image-input {
        display: block;
        cursor: pointer;
        margin: 10px;
        background: rgba(0,0,0,.1);

        &.drag-active{
            border: 3px dashed purple;
        }
    }
    .placeholder {
        background: #F0F0F0;
        width: 200px;
        height: 200px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
        font-size: 18px;
        font-family: Helvetica;
    }
    .placeholder:hover {
        background: #E0E0E0;
    }
    .file-input {
        display: none;
    }
</style>