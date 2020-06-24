<template>
    <div>
        <input type="text" class="todo-input" placeholder="What needs to be done?" 
        v-model="newTodo" @keyup.enter="addTodo">
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <todo-item v-for="(todo, index) in todosFilter" :key="todo.id"
            :todo="todo" :index="index" :checkAll="!anyRemaining">
            </todo-item>
        </transition-group>
        <div class="extra-container">
            <todo-check-all></todo-check-all>
            <todo-items-remaining></todo-items-remaining>
        </div>
        <div class="extra-component">
            <todo-filtered></todo-filtered>
            <transition name="fade"><todo-clear-completed></todo-clear-completed></transition>
        </div>
    </div>
</template>

<script>

import TodoItem from "./TodoItem"
import TodoItemsRemaining from "./TodoItemsRemaining"
import TodoCheckAll from "./TodoCheckAll"
import TodoFiltered from "./TodoFiltered"
import TodoClearCompleted from "./TodoClearCompleted"

export default {
  name: 'todo-list',
  components: {
      TodoItem, 
      TodoItemsRemaining,
      TodoCheckAll,
      TodoFiltered,
      TodoClearCompleted,
  },
  data () {
    return {
        newTodo: '',
        idForTodo: 3,
    }
  },
  computed: {
    anyRemaining() {
        return this.$store.getters.anyRemaining
    },
    todosFilter(state) {
        return this.$store.getters.todosFilter
    },
  },
  methods: {
    addTodo() {
        if(this.newTodo.length === 0) {
            return
        }
        this.$store.commit('addTodo', {
            id: this.idForTodo,
            title: this.newTodo,
            completed: false,
            editing: false,
        })
        this.idForTodo += 1
        this.newTodo=""
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .todo-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
    }
    .todo-input:focus{
        outline:0;
    }

    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;
    }
    
    .remove-item {
        cursor: pointer;
        margin-left: 14px;
        color: grey
    }
    .remove-item:hover {
        color: black;
    }

    .todo-item-left {
        display: flex;
        align-items: center;
    }
    .todo-item-label {
        padding: 10px;
        border: 1px solid white;
        margin-left: 12px;
    }
    .todo-item-edit {
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
    .todo-item-edit:focus {
        outline: none;
    }
    .completed {
        text-decoration: line-through;
        color: grey;
    }
    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 14px;
        margin-bottom: 14px;
    }
    button {
        font-size: 14px;
        background-color: white;
        appearance: none;
    }
    button:hover {
        background: lightgreen;
    }
    button:focus {
        outline: none;
    }
    .active {
        background: lightgreen;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }


</style>
