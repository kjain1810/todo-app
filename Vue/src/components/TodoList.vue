<template>
    <div>
        <input type="text" class="todo-input" placeholder="What needs to be done?" 
        v-model="newTodo" @keyup.enter="addTodo">
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <todo-item v-for="(todo, index) in todosFilter" :key="todo.id"
            :todo="todo" :index="index" @removedTodo="removeItem" @finishedEdit="finishedEdit"
            :checkAll="!anyRemaining">
            </todo-item>
        </transition-group>
        <div class="extra-container">
            <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAll">Check All</label></div>
            <div> {{ remaining }} items left </div>
        </div>
        <div class="extra-component">
            <div>
                <button :class="{active: filter=='all'}" @click="filter = 'all'"> All </button>
                <button :class="{active: filter=='active'}" @click="filter = 'active'"> Active </button>
                <button :class="{active: filter=='completed'}" @click="filter = 'completed'"> Completed </button>
            </div>
            <div>
                <transition name="fade"><button v-if="showClear" @click="clearCompleted()">Clear Compeleted</button></transition>
            </div>
        </div>
    </div>
</template>

<script>

import TodoItem from "./TodoItem";

export default {
  name: 'todo-list',
  components: {
      TodoItem,
  },
  data () {
    return {
        newTodo: '',
        beforeEditCache: '',
        todos: [
            {
                'id': 1,
                'title': 'Learn vue',
                'completed': false,
                'editing': false,
            },
            {
                'id': 2,
                'title': 'Learn vuex',
                'completed': false,
                'editing': false,
            },
        ],
        idForTodo: 3,
        filter: 'all'
    }
  },
  computed: {
    remaining() {
        return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining() {
        return this.remaining != 0
    },
    todosFilter() {
        if(this.filter === 'all') {
            return this.todos
        }
        else if(this.filter == 'active') {
            return this.todos.filter(todo => !todo.completed)
        }
        else {
            return this.todos.filter(todo => todo.completed)
        }
    },
    showClear() {
        return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  methods: {
    addTodo() {
        if(this.newTodo.length === 0) {
            return
        }
        this.todos.push({
            id: this.idForTodo,
            title: this.newTodo,
            completed: false,
            editing: false,
        })
        this.idForTodo += 1
        this.newTodo=""
    },

    removeItem(index) {
        this.todos.splice(index, 1)
    },

    checkAll() {
        this.todos.forEach((todo) => todo.completed = event.target.checked)
    },

    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed)
    },

    finishedEdit(data) {
        this.todos.splice(data.index, 1, data.todo)
    }
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
