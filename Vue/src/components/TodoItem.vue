<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="changeStat">
            <div class="todo-item-label" v-if="!editing" @dblclick="edit" :class="{ completed : completed }">
                {{title}}
            </div>
            <div class="todo-item-edit" v-if="editing">
                <input type="text" v-model="title" @keyup.enter="edit"
                @keyup.esc="cancelEdit" v-focus>
            </div>
        </div>
    <div class="remove-item" @click="removeItem(index)">&times;</div>
    </div>
</template>

<script>
export default {
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true,
        },
        index: {
            type: Number, 
            required: true,
        },
        checkAll: {
            type: Boolean,
            required: true,
        }
    },
    data() { 
        return { 
            'id': this.todo.id,
            'title': this.todo.title,
            'completed': this.todo.completed,
            'editing': this.todo.editing,
            'beforeEditCache': '',
        }
    },
    directives: {
        focus: {
        inserted: function (el) {
            el.focus()
        }
        }
    },
    watch: {
        checkAll() {
            if(this.checkAll) {
                this.completed = true
            } else {
                this.completed = this.todo.completed
            }
        }
    },
    methods: {
        removeItem(index) {
            this.$emit('removedTodo', index)
        },
        
        edit() {
            console.log("here")
            console.log(this.editing)
            if(this.editing == false) {
                this.editing = true
            }
            else {
                this.editing = false
            }
            if(this.editing) {
                this.beforeEditCache = this.title
            }
            else {
                if(this.title.length === 0) {
                    this.title = this.beforeEditCache
                }
                this.$emit('finishedEdit', {
                    'index': this.index,
                    'todo': {
                        'id': this.id,
                        'title': this.title,
                        'editing': this.editing,
                        'completed': this.completed,
                    }
                })
            }
        },
        
        cancelEdit() {
            this.editing = false
            this.title = this.beforeEditCache
        },

        changeStat() {
            this.$emit('finishedEdit', {
                    'index': this.index,
                    'todo': {
                        'id': this.id,
                        'title': this.title,
                        'editing': this.editing,
                        'completed': this.completed,
                    }
                }
            )
        }
    },
}
</script>