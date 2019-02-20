<template>
    <div class="pdf-pages">
        <div class="thumbs">
            <a :href="'#page_' + i"
               v-for="i in numPages">
                <PDFDocument
                        :key="i"
                        :src="src"
                        :page="i"></PDFDocument>
            </a>
        </div>
        <div class="page">
            <PDFDocument
                    v-for="i in numPages"
                    :id="'page_' + i"
                    :key="i"
                    :src="src"
                    :page="i"></PDFDocument>
        </div>
    </div>
</template>

<script>
    import PDFDocument from 'vue-pdf'

    export default {
        name: "PDF",
        components: {
            PDFDocument
        },
        data() {
            return {
                url: "https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS",
                src: undefined,
                numPages: undefined,
            }
        },
        methods: {
            gotTo (i) {
                alert(i)
            },
        },
        mounted() {
            this.src = PDFDocument.createLoadingTask(this.url)
            this.src.then(pdf => {
                this.numPages = pdf.numPages;
            });
        },
    }
</script>

<style scoped lang="scss">
    .pdf-pages {
        > div {
            max-height: 500px;
            overflow-y: auto;
        }

        > .thumbs {
            width: 19%;
            float: left;
            background: #eee;
            padding: 5px;

            > a{
                margin: 0 0 10px;
                border: 1px solid #999;
                display: block;
                opacity: .6;

                &:hover{
                    opacity: 1;
                }
            }
        }

        > .page {
            width: 79%;
            float: right;

            > div{
                margin: 0 0 20px;
                border: 1px solid #999;
            }
        }
    }
</style>