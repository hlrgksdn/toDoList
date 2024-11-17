<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
        <v-list nav>
            <v-list-item
              v-for="(item) in links"
              :key="item.name"
              :to="item.path"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="$t(item.name)"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-btn
        class="ma-2 hidden-sm-and-down"
        v-for="(item) in links"
        :key="item.name"
        :to="item.path"
      >
        <v-icon>{{ item.icon }}</v-icon>
        {{ $t(item.name) }}
      </v-btn>

      <v-btn
        class="mx-2"
        fab
        dark
        small
        color="secondary"
        @click="changeLanguage"
      >
        <v-icon dark>
          mdi-translate
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  data: () => ({ drawer: null }),
  computed: {
    links () {
      return this.$store.state.navLinks
    }
  },
  methods: {
    changeLanguage () {
      this.$i18n.locale = this.$i18n.locale === 'ru' ? 'en' : 'ru'
    }
  }

}
</script>
