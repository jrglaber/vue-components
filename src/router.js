import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'layout',
            component: () => import('./views/Layout.vue'),
            redirect: {
                name: 'about'
            },
            meta: {
                title: 'Sistema de Teste',
                layout: true,
            },
            children: [
                {
                    path: 'about',
                    name: 'about',
                    component: () => import('./views/About.vue'),
                    meta: {
                        title: 'Sobre',
                        visible: true,
                    },
                },
                {
                    path: 'pdf',
                    name: 'pdf',
                    component: () => import('./views/Pdf.vue'),
                    meta: {
                        title: 'PDF',
                        visible: true,
                    },
                },
                {
                    path: 'image-preview',
                    name: 'image',
                    component: () => import('./views/ImagePreview.vue'),
                    meta: {
                        title: 'Imagem',
                        visible: true,
                    },
                },
            ],
        },
    ]
})
