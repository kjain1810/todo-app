<template>
     <div>
        <button v-if="showClear" @click="clearCompleted()">Clear Compeleted</button>
    </div>
</template>

<script>
export default {
    name: "todo-clear-completed",
    props: {
        showClear: {
            type: Boolean,
            require: true,
        }
    },
    methods: {
        clearCompleted() {
            eventBus.$emit("clearCompleted")
        }
    }
}
</script>