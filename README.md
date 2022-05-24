# vue-add CLI helper

```
npm install -g @gregor-dzierzon/vue-add
```

## File Structure

The VUE components and views created by this CLI helper use an opinionated folder structure which separates the HTML, JavaScript and CSS into their own files as follows.

``` text
src/components/component-name/component-name.css
src/components/component-name/component-name.js
src/components/component-name/ComponentName.vue
```

This approach resembles the separation of concerns approach taken by Angular, but in this case the .vue file is what links the files together.

### Example

By executing the following command the cli will create the following commands in your VUE project.

``` bash
vue-add ProductList -c
```

ProductList.vue

``` html
<script src="./product-list.js"></script>
<style src="./product-list.css" scoped></style>

<template>
    <div id="product-list">
    
    </div>
</template>
```

product-list.js

``` javascript
export default {
  name: "product-list",
  components: {},
  data() {
      return {}
  },
  created() {},
  computed: {},
  methods: {}
}
```

product-list.css

``` css
/* 
  empty file
*/
```

## Create Components

Creating components adds the component to the ```src/components``` directory

``` bash
# -c, --component
vue-add ProductList -c
vue-add ProductList --component

# no identifier defaults to a component
vue-add ProductList

# you can create sub directories
vue-add products/ProductList -c
```

## Create Views

View files structures follow the same pattern as the component structure. The only difference is that they are placed in the ```src/views``` directory.

``` bash
# -v, --view
vue-add ProductPage -v
vue-add ProductPage --view

# you can create sub directories
vue-add products/ProductPage -v
```

## Create Services

Creating a service only creates a single service file in the ```src/services``` directory.

``` bash
# -s, --service
vue-add AuthenticationService -s
vue-add AuthenticationSerivce --service

# you can create sub directories
vue-add security/AuthenticationService -s
```

The following ```src/services/authentication-service.js``` file is created.

``` javascript
import axios from "axios"

class AuthenticationService
{
    get(id)
    {
        return axios.get(`/${id}`)
    }
}

export default new AuthenticationService()

```
