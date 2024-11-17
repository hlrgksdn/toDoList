<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
          >
            {{ $t('newTask') }}
          </v-btn>
        </template>

        <v-card class="pa-2">
          <v-textarea
                solo
                name="input-7-1"
                :label="$t('textareaLabel')"
                v-model="text"
          ></v-textarea>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="addTask(text)"
            >
              {{ $t('btn.addTask') }}
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              {{ $t('btn.close') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Add',
  data: () => ({ text: '', dialog: false }),
  methods: {
    ...mapActions(['addTask'])
  }
}
</script>
