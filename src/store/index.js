import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navLinks: [
      { name: 'home', path: '/', icon: 'mdi-home' },
      { name: 'settings', path: '/settings', icon: 'mdi-cog' },
      { name: 'statistic', path: '/statistic', icon: 'mdi-chart-timeline-variant-shimmer' },
      { name: 'information', path: '/information', icon: 'mdi-information' }
    ],
    toDo: {
      loading: false,
      error: null,
      data: []
    }
  },
  mutations: {
    setToDoData (state, data) {
      state.toDo.data = data
    },
    setToDoLoading (state, loading) {
      state.toDo.loading = loading
    },
    setToDoError (state, error) {
      state.toDo.error = error
    },
    handleAddTaskToData (state, post) {
      state.toDo.data = [...state.toDo.data, post]
    },
    handleSetNewStatus (state, id) {
      state.toDo.data = state.toDo.data.map(item => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }
        } else {
          return item
        }
      })
    },
    handleDeleteTask (state, id) {
      state.toDo.data = state.toDo.data.filter(item => item.id !== id)
    }
  },
  actions: {
    async fetchToDoList ({ commit }) {
      commit('setToDoLoading', true)
      commit('setToDoError', null)
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.statusText}`)
        }
        const data = await response.json()
        commit('setToDoData', data)
      } catch (error) {
        commit('setToDoError', error.message)
      } finally {
        commit('setToDoLoading', false)
      }
    },
    async addTask ({ commit }, task) {
      commit('setToDoError', null)
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
          method: 'POST',
          body: JSON.stringify({
            title: task,
            userId: 1,
            completed: false
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.statusText}`)
        }
        const data = await response.json()
        commit('handleAddTaskToData', data)
      } catch (error) {
        commit('setToDoError', error.message)
      }
    },
    async changeStatus ({ commit }, id, oldStatus) {
      commit('setToDoError', null)
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            completed: !oldStatus
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.statusText}`)
        }
        commit('handleSetNewStatus', id)
      } catch (error) {
        commit('setToDoError', error.message)
      }
    },
    async removeTask ({ commit }, id) {
      commit('setToDoError', null)
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: 'DELETE'
        })
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.statusText}`)
        }
        commit('handleDeleteTask', id)
      } catch (error) {
        commit('setToDoError', error.message)
      }
    }
  }
})
