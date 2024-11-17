<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-toolbar
      color="secondary"
      dark
    >

      <v-toolbar-title>{{ $t('taskList') }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <app-add-task></app-add-task>

    </v-toolbar>

    <v-list two-line>
      <v-list-item-group
      >
        <template v-for="(item) in toDo.data">
          <v-list-item :key="item.id" @click="changeStatus(item.id, item.completed)">
            <template>
              <v-list-item-action>

                <v-icon
                  v-if="!item.completed"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-3"
                >
                  mdi-star
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>

              </v-list-item-content>
              <v-list-item-action>

                <v-icon
                  color="grey lighten-1"
                  @click.stop="removeTask(item.id)"
                >
                  mdi-trash-can-outline
                </v-icon>

              </v-list-item-action>

            </template>
          </v-list-item>

        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddTask from './AddTask.vue'
export default {
  name: 'Home',

  computed: {
    ...mapState(['toDo'])
  },
  methods: {
    ...mapActions(['fetchToDoList', 'changeStatus', 'removeTask'])
  },
  created () {
    this.fetchToDoList()
  },
  components: {
    'app-add-task': AddTask
  }
}
</script>
