<template>
  <section class="todoapp">
    <header class="header">
      <input
        class="new-todo"
        autocomplete="off"
        placeholder="Todo List"
        @keyup.enter="addTodo"
      />
    </header>
    <section v-show="todos.length" class="main">
      <input
        id="toggle-all"
        :checked="allChecked"
        class="toggle-all"
        type="checkbox"
        @change="toggleAll({ done: !allChecked })"
      />
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ newPluralize }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in newCapitalize" :key="key">
          <a
            :class="{ selected: visibility === key }"
            @click.prevent="visibility = key"
            >{{ val.keys }}</a
          >
        </li>
      </ul>
    </footer>
  </section>
</template>

<script>
import { ref, reactive, computed, toRefs } from 'vue'
import Todo from './Todo.vue'
import { localStorageHandle } from '/@/utils/storages.js'

const TODO_LIST_KEY = 'todos'
const defaultTodo = [
  { text : 'star this repository', done : false },
  { text : 'fork this repository', done : false },
  { text : 'follow author', done : false },
  { text : 'element-plus-vite-admin', done : true },
  { text : 'vite', done : true },
  { text : 'vue', done : true },
  { text : 'Vuex', done : true },
  { text : 'Vue Router', done : true },
  { text : 'React', done : true },
  { text : 'element-plus', done : true }
]

export default {
  components : { Todo },
  setup() {
    const visibility = ref( 'all' )
    const filters = ref( {
      all : ( todos ) => todos,
      active : ( todos ) => todos.filter( ( todo ) => !todo.done ),
      completed : ( todos ) => todos.filter( ( todo ) => todo.done )
    } )
    const todos = ref( localStorageHandle.get( TODO_LIST_KEY ) || defaultTodo )

    const set = reactive( {
      newPluralize : computed( () => {
        return set.remaining == 1 ? 'item' : 'items'
      } ),

      newCapitalize : computed( () => {
        for ( const key in filters['value'] ) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          filters['value'][key]['keys'] =
            key.charAt( 0 ).toUpperCase() + key.slice( 1 )
        }
        return filters['value']
      } ),

      allChecked : computed( () => {
        return todos.value.every( ( todo ) => todo.done )
      } ),

      filteredTodos : computed( () => {
        return filters.value[visibility.value]( todos.value )
      } ),

      remaining : computed( () => {
        return todos.value.filter( ( todo ) => !todo.done ).length
      } )
    } )

    const setLocalStorage = () => {
      localStorageHandle.set( TODO_LIST_KEY, todos.value )
    }

    const addTodo = ( e ) => {
      const text = e.target.value
      if ( text.trim() ) {
        todos.value.push( {
          text,
          done : false
        } )
        setLocalStorage()
      }
      e.target.value = ''
    }

    const toggleTodo = ( val ) => {
      val.done = !val.done
      setLocalStorage()
    }

    const deleteTodo = ( val ) => {
      todos.value.splice( todos.value.indexOf( val ), 1 )
      setLocalStorage()
    }

    const editTodo = ( { todo, value } ) => {
      todo.text = value
      setLocalStorage()
    }

    const clearCompleted = () => {
      todos.value = todos.value.filter( ( todo ) => !todo.done )
      setLocalStorage()
    }

    const toggleAll = ( { done } ) => {
      todos.value.forEach( ( todo ) => {
        todo.done = done
        setLocalStorage()
      } )
    }
    return {
      visibility : 'all',
      filters,
      todos,

      ...toRefs( set ),
      setLocalStorage,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
      toggleAll
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
