<template>
    <div>
        <button class="c-site-search-modal__link" v-b-modal="modalId">
            <img :src="searchIcon" alt=""><span class="sr-only">Search</span>
        </button>

        <xc-modal :id="modalId" class="c-site-search-modal" hide-footer lazy @shown="onShown">
            <template slot="modal-header">
                <h2 class="sr-only">Search</h2>
            </template>

            <p class="c-site-search-modal__heading h2">Search XCentium</p>

            <b-btn-close @click="$root.$emit('bv::hide::modal', modalId, $event.target)">×</b-btn-close>

            <form :action="formAction" class="c-site-search-modal__search">
                <label :for="inputId">
                    <input type="text" class="c-site-search-modal__search-input form-control-lg" ref="search" :placeholder="placeholder" :id="inputId" :name="inputName">
                    <span class="sr-only">{{ searchLabel }}</span>

                    <button type="submit" class="c-site-search-modal__search-submit">
                        {{ searchLabel }}
                    </button>
                </label>
            </form>
        </xc-modal>
    </div>
</template>


<script>
    import { idMixin } from 'bootstrap-vue/src/mixins';

    export default {
        mixins: [idMixin],
        data() {
            return {
                inputId: this.safeId() + '__search',
                modalId: this.safeId() + '__modal'
            };
        },
        props: {
            formAction: {
                type: String,
                required: true
            },
            searchLabel: {
                type: String,
                default: 'Search'
            },
            placeholder: {
                type: String,
                default: 'Search'
            },
            inputName: {
                type: String,
                default: 'query'
            },
            searchIcon: {
                type: String,
                default: '/assets/glyphs/search.svg'
            }
        },
        methods: {
            hideModal() {
                this.$refs.locationSelectorModal.hide();
            },
            onShown() {
                this.$nextTick(() => {
                    this.$nextTick(() => {
                        this.$refs.search.focus();
                    });
                });
            }
        }
    }
</script>
