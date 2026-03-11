<template>
  <v-combobox
    class="font-weight-black"
    :value="value"
    :items="items"
    :rules="rules"
    :label="label"
    color="#624fc6"
    outlined
    rounded
    clearable
    lazy-rules
    hide-details="auto"
    @input="$emit('update-value', $event)"></v-combobox>
</template>
<script>
  export default {
    props: {
      label: String,
      value: String,
      rules: {
        type: Array,
        required: true,
      },
      items: {
        type: Array,
        required: true,
      },
    },
    methods: {},
  };
</script>
