<template>
  <div class="table">
    <div
      :style="{'grid-template-columns': `${sizeColumns}`}"
      class="table__head row"
    >
      <div
        v-for="column in columns"
        :key="column.key"
        class="row__column"
      >
        <slot
          :name="`${column.label}`"
          :columns="{column: column.label, key: column.key}"
        >
          {{ column.label }}
        </slot>
      </div>
    </div>
    <slot name="prepend" />
    <div class="table__body">
      <div
        v-for="(row, indexRow) in rows"
        :key="row.id"
        class="row"
        :class="{clickable: isRowClickable}"
        :style="{'grid-template-columns': `${sizeColumns};`}"
        @click="$emit('clickRow', $event, row)"
      >
        <div
          v-for="(column, indexColumn) in columns"
          :key="column.key"
          class="row__column"
          :style="{'grid-row': `${qualityColumns[indexRow][indexColumn].from}/${qualityColumns[indexRow][indexColumn].to}`}"
        >
          <slot
            :name="`${column.key}`"
            :cell="{column: row[column.key], row, key: column.key}"
          >
            {{ row[column.key] }}
          </slot>
        </div>
      </div>
    </div>
    <slot name="append" />
  </div>
</template>

<script>
  export default {
    name: 'BookingTable',
    props: {
      columns: {
        type: Array,
        require: true,
      },
      rows: {
        type: Array,
        require: true,
        validator(value) {
          return Array.isArray(value) && typeof value[0] === 'object' && !Array.isArray(value[0]);
        },
      },
      isRowClickable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
      };
    },
    computed: {
      numberOfColumns() {
        return this.columns.reduce((quantity, column) => {
          if (column.width) {
            return quantity += column.width;
          }
          return quantity += 1;
        }, 0);
      },
      qualityColumns1() {
        let index = 1;
        let lastIndex = 1;
        return this.columns.map((column) => {
          lastIndex = index;
          if (column.columnCell && column.rowCell) {
            index += column.columnCell;
            return {
              from: lastIndex,
              to: index,
            };
          }
          index += 1;
          return {
            from: lastIndex,
            to: index,
          };
        });
      },
      qualityColumns() {
        const result = this.rows.map((row, index) => this.columns.map((column) => {
          const lastIndex = index + 1;
          if (column.columnCell && column.rowCell === lastIndex) {
            const indexNext = index + 2 + column.columnCell;
            return {
              from: lastIndex,
              to: indexNext,
            };
          }
          const indexNext = index + 2;
          return {
            from: lastIndex,
            to: indexNext,
          };
        }));
        console.log(result);
        return result;
      },
      sizeColumns() {
        return this.columns.reduce((result, column) => {
          if (column.width) {
            return `${result } ${ column.width}`;
          }
          return `${result } 1fr`;
        }, '');
      },
      sizeRows() {
        return this.columns.reduce((result, column) => {
          if (column.width) {
            return `${result } ${ column.width}`;
          }
          return `${result } 1fr`;
        }, '');
      },
    },

    methods: {

    },
  };
</script>

<style
  lang="scss"
  scoped
>
  .table{
    background-color: #FFFFFF;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;
    color: #323F56;
    max-height: 500px;
    overflow: auto;
    &__head{
      position: sticky;
      top: 0;
      background-color: rgb(255, 255, 255, 0.9);;
      z-index: 10;
      min-height: 48px;
    }
    &__body{
      display: grid;
      grid-template-rows: repeat( auto-fit, minmax(20px, 1fr));
    }
  }
  .row{
    display: grid;
    justify-items: center;
    border-bottom: 1px solid #DCDEE2;
    border-top: 1px solid #DCDEE2;
    min-height: 48px;
    &__column{
      display: grid;
      align-items: center;
    }
  }
  .clickable{
    cursor: pointer;
  }
</style>
