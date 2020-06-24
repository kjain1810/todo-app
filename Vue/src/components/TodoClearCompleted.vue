<template>
     <div>
        <button v-if="showClear" @click="clearCompleted()">Clear Compeleted</button>
    </div>
</template>

<script>
export default {
    name: "todo-clear-completed",
    computed: {
        showClear() {
            return this.$store.getters.showClear
        }
    },
    methods: {
        clearCompleted() {
            this.$store.commit('clearCompleted')
        }
    }
}
</script>