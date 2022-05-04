<template>
  <table>
      <h1 class="text-white">
      </h1>
    <tr v-for="i in 6" :key="i">
        <td v-for="j in wordinfos.size" :key="j">
            <!-- Write first letter of the word at the top left of the table -->
              {{(i == 1 && j == 1) ? wordinfos.firstLetter : "."}} 

        </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ["wordinfos"],
    data() {
        return {
        }
    },
    mounted() {

    }
}
</script>
<style>
table {

}
tr {

}
 td {
     border: solid 3px white;
     color:white;
     font-weight: bold;
     font-size:2.5rem;
     width:5rem;
     height:5rem;
 }
</style>