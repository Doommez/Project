<template>
  <div class="base-filter">
    <v-select
      v-model="model"
      v-click-outside="{
        handler: onClickOutside,
        include
      }"
      class="ma-2 included"
      :items="filteredOptions"
      :label="optionLabelProp"
      item-title="state"
      density="comfortable"
      variant="solo"
      hide-selected
    >
      <template #prepend-item>
        <v-text-field
          v-model="searchFilter"
          class="ma-2 included"
        />
      </template>

      <template #item="{item}">
        <div
          class="ma-2 included"
          @click="checkIfOptionSelected(item.raw)"
        >
          <slot
            :option="item.raw"
            name="option"
          >
            adfadsfasdf
          </slot>
        </div>
      </template>
    </v-select>
    <v-chip
      v-for="select in props.modelValue"
      :key="select.id"
    >
      <slot
        name="selected"
        :remove="checkIfOptionSelected"
        :option="select"
      />
    </v-chip>
  </div>
</template>

<script setup>
  import {computed, ref} from 'vue';

  const emit = defineEmits([
    'update:modelValue',
  ]);
  const props = defineProps({
    options: {
      type: Array,
      required: true,
    },
    optionLabelProp: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
  });

  const searchFilter = ref(null);

  const model = computed({
    get: () => props.modelValue,
    set(value) {
      emit('update:modelValue', value);
    },
  });
  const checkIfOptionSelected = (value) => {
    console.log(value);
    if (model.value.includes(value)) {
      const newModelValue = [...props.modelValue];
      newModelValue.splice(newModelValue.indexOf(value), 1);
      model.value = newModelValue;
    } else {
      model.value = [...props.modelValue, value];
    }
  };
  // const model = computed({
  //   get: () => {
  //     console.log(props.modelValue);
  //     props.modelValue;
  //   },
  //   set(value) {
  //     console.log(...value);
  //     const newModelValue = [...props.modelValue];
  //     console.log(newModelValue);
  //     if (newModelValue.includes(...value)) {
  //       newModelValue.splice(newModelValue.indexOf(...value), 1);
  //     } else {
  //       newModelValue.push(...value);
  //     }
  //     emit('update:modelValue', newModelValue);
  //   },
  // });

  const filteredOptions = computed(() => {
    if (searchFilter.value) {
      return props.options.filter((option) => option[props.optionLabelProp].toLowerCase().includes(searchFilter.value.toLowerCase()));
    }
    return props.options;
  });

  const include = () => [document.querySelector('.included')];

  const onClickOutside = () => {
    searchFilter.value = '';
  };


</script>

<style lang="scss" scoped>
  .v-select{
    height: 100%;
    .v-input__control{
      background-color: red;
    }
  }


</style>
