<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :search="search"
    sort-by=""
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>

        <!-- Nav區域 -->
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

        <!-- 新增/修改pop -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <form @submit.stop.prevent="save">
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
                  <v-text-field v-model="editedItem.title" name="title" label="商品名稱"></v-text-field>
                  <v-select
                    v-model="editedItem.categoryId"
                    name="categoryId"
                    :items="categories"
                    item-text="name"
                    item-value="id"
                    label="類別"
                  ></v-select>
                  <v-row class="px-4">
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.og_price"
                        name="og_price"
                        label="原價"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.price"
                        name="price"
                        label="特價"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-divider class="mx-4"></v-divider>

                <v-col class="px-4">
                  <v-text-field
                    v-model="editedItem.short_intro"
                    name="short_intro"
                    label="簡介"
                  ></v-text-field>
                  <v-textarea
                    v-model="editedItem.description"
                    name="description"
                    label="描述"
                  ></v-textarea>
                  <v-file-input
                    type="file"
                    name="image"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="上傳圖片"
                    prepend-icon="mdi-camera"
                    label="上傳圖片"
                    @change="changeCover"
                  ></v-file-input>
                </v-col>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text type="submit" > Save </v-btn>
              </v-card-actions>
            </v-card>
          </form>
        </v-dialog>

        <!-- 確認刪除pop -->
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

    <!-- 自訂區域 -->
    <template v-slot:[`item.image`]="{ item }">
      <v-img
        :lazy-src="item.image"
        max-height="60"
        max-width="60"
        :src="item.image"
      ></v-img>
    </template>
    <template v-slot:[`item.categoryId`]="{ item }">
      <div v-for="cate in categories" :key="cate.id">
        <span v-if="cate.id === item.categoryId">{{cate.name}}</span>
      </div>
    </template>
    <template v-slot:[`item.short_intro`]="{ item }">
      <div class="overflow-x-hidden" style="width: 200px; max-height: 50px">
        {{ item.short_intro }}
      </div>
    </template>
    <template v-slot:[`item.description`]="{ item }">
      <div class="overflow-x-hidden" style="width: 300px; max-height: 50px">
        {{ item.description }}
      </div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div style="width: 50px">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </div>
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
      { text: '商品名稱', value: 'title' },
      { text: '原價', value: 'og_price' },
      { text: '特價', value: 'price' },
      { text: '類別', value: 'categoryId' },
      { text: '簡介', value: 'short_intro' },
      { text: '描述', value: 'description' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    products: [],
    categories: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      og_price: 0,
      price: 0,
      categoryId: '',
      short_intro: '',
      description: '',
      image: '',
    },
    defaultItem: {
      title: '',
      og_price: 0,
      price: 0,
      categoryId: '',
      short_intro: '',
      description: '',
      image: ''
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新增商品' : '修改商品'
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
    // this.getCategories()
  },

  methods: {
    async initialize() {
      const { data } = await this.$rpos.product.getProducts()
      this.products = data.products
      this.categories = data.categories
      console.log(data)
    },

    async getCategories() {
      const { data } = await this.$rpos.category.getCategories()
      this.categories = data.categories
    },

    changeCover(e) {
      const files = e;
      if (files.length === 0) return;
      const imageURL = window.URL.createObjectURL(files);
      this.editedItem.image = imageURL;
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const data = await this.$rpos.product.deleteProduct(this.editedItem .id)
      console.log(data)
      this.products.splice(this.editedIndex, 1)
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

    async save(e) {
      if (this.editedIndex > -1) {
        const form = e.target;
        console.log(form)
        const formData = new FormData(form);

        const data = await this.$rpos.product.putProduct(this.editedItem.id, formData)
        console.log(data)

        Object.assign(this.products[this.editedIndex], this.editedItem)
      } else {
        const form = e.target;
        const formData = new FormData(form);

        const data = await this.$rpos.product.postProduct(formData)
        console.log(data)
      }
      this.close()
    },
  },
}
</script>
