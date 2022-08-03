<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="og_price"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>商品列</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card style="width: 800px">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card class="mx-auto my-12" max-width="374">
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img height="200" :src="editedItem.image"></v-img>

              <v-card-title>
                <v-text-field v-model="editedItem.name"></v-text-field>
              </v-card-title>

              <v-row class="px-4">
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    v-model="editedItem.og_price"
                    label="原價"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    v-model="editedItem.og_price"
                    label="特價"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-divider class="mx-4"></v-divider>

              <v-col class="px-4">
                <v-text-field
                  v-model="editedItem.short_intro"
                  label="簡介"
                ></v-text-field>
                <!-- <v-text-field
                  v-model="editedItem.description"
                  label="描述"
                ></v-text-field> -->
                <v-textarea
                  v-model="editedItem.description"
                  outlined
                  name="input-7-4"
                  label="描述"
                ></v-textarea>
                <v-file-input
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="上傳圖片"
                  prepend-icon="mdi-camera"
                  label="上傳圖片"
                ></v-file-input>
              </v-col>
            </v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.image`]="{ item }">
      <v-img
        :lazy-src="item.image"
        max-height="60"
        max-width="60"
        :src="item.image"
      ></v-img>
    </template>
    <template v-slot:[`item.description`]="{ item }">
      <div class="overflow-x-hidden" style="width: 50px">
        {{ item.description }}
      </div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ProductsPage',
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        'Avatar size should be less than 2 MB!',
    ],
    headers: [
      { text: 'Id', value: 'id' },
      { text: '圖片', value: 'image' },
      {
        text: '商品名稱',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '原價', value: 'og_price' },
      { text: '特價', value: 'price' },
      { text: '簡介', value: 'short_intro' },
      { text: '描述', value: 'description' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: '',
      og_price: 0,
      price: 0,
      short_intro: 0,
      description: 0,
    },
    defaultItem: {
      id: 0,
      name: '',
      og_price: 0,
      price: 0,
      short_intro: 0,
      description: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          id: 1,
          name: 'Frozen Yogurt',
          og_price: 159,
          price: 6.0,
          short_intro: 24,
          description: 4.0,
          image: 'https://picsum.photos/id/11/500/300',
        },
        {
          id: 2,
          name: 'Ice cream sandwich',
          og_price: 237,
          price: 9.0,
          short_intro: 37,
          description: 4.3,
          image: 'https://picsum.photos/id/12/500/300',
        },
        {
          id: 3,
          name: 'Eclair',
          og_price: 262,
          price: 16.0,
          short_intro: 23,
          description: 6.0,
          image: 'https://picsum.photos/id/13/500/300',
        },
        {
          id: 4,
          name: 'Cupcake',
          og_price: 305,
          price: 3.7,
          short_intro: 67,
          description: 4.3,
          image: 'https://picsum.photos/id/14/500/300',
        },
        {
          id: 5,
          name: 'Gingerbread',
          og_price: 356,
          price: 16.0,
          short_intro: 49,
          description: 3.9,
          image: 'https://picsum.photos/id/15/500/300',
        },
        {
          id: 6,
          name: 'Jelly bean',
          og_price: 375,
          price: 0.0,
          short_intro: 94,
          description: 0.0,
          image: 'https://picsum.photos/id/16/500/300',
        },
        {
          id: 7,
          name: 'Lollipop',
          og_price: 392,
          price: 0.2,
          short_intro: 98,
          description: 0,
          image: 'https://picsum.photos/id/17/500/300',
        },
        {
          id: 8,
          name: 'Honeycomb',
          og_price: 408,
          price: 3.2,
          short_intro: 87,
          description: 6.5,
          image: 'https://picsum.photos/id/18/500/300',
        },
        {
          id: 9,
          name: 'Donut',
          og_price: 452,
          price: 25.0,
          short_intro: 51,
          description: 4.9,
          image: 'https://picsum.photos/id/19/500/300',
        },
        {
          id: 10,
          name: 'KitKat',
          og_price: 518,
          price: 26.0,
          short_intro: 65,
          description: 7,
          image: 'https://picsum.photos/id/20/500/300',
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
