import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
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
        filter: 'all',
    },
    getters: {
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length
        },
        anyRemaining(state, getters) {
            return getters.remaining != 0
        },
        todosFilter(state) {
            if (state.filter === 'all') {
                return state.todos
            }
            else if (state.filter == 'active') {
                return state.todos.filter(todo => !todo.completed)
            }
            else {
                return state.todos.filter(todo => todo.completed)
            }
        },
        showClear(state) {
            return state.todos.filter(todo => todo.completed).length > 0
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing: todo.editing,
            })
        },

        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed)
        },

        changeFilter(state, filter) {
            state.filter = filter
        },

        checkAll(state, isChecked) {
            state.todos.forEach((todo) => todo.completed = isChecked)
        },

        deleteTodo(state, id) {
            const index = state.todos.findIndex(item => item.id == id)
            state.todos.splice(index, 1)
        },

        updateTodo(state, data) {
            const index = state.todos.findIndex(item => item.id == data.id)
            state.todos.splice(index, 1, {
                id: data.id,
                title: data.title,
                editing: data.editing,
                completed: data.completed,
            })
        }
    },
    actions: {
        addTodo(context, todo) {
            context.commit('addTodo', todo)
        },

        clearCompleted(context) {
            context.commit('clearCompleted')
        },

        changeFilter(context, filter) {
            context.commit('changeFilter', filter)
        },

        checkAll(context, isChecked) {
            context.commit('checkAll', isChecked)
        },

        deleteTodo(context, id) {
            context.commit('deleteTodo', id)
        },

        updateTodo(context, data) {
            context.commit('updateTodo', data)
        }
    }
})