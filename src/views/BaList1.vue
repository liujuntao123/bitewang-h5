<template>
  <div>
    <draggable class="drag-container" v-model="myArray"  :ghostClass="dragOpts.ghostClass" :invertSwap="dragOpts.invertSwap" :sort="dragOpts.sort" group="people" @update="onUpdate" @start="onDragStart" :move="onDragMove" @end="onDragEnd">
    <!-- <draggable class="drag-container" v-model="myArray" :swapClass="dragOpts.swapClass" :swap="dragOpts.swap" :move="onDragMove" @end="onDragEnd" :ghostClass="dragOpts.ghostClass" > -->
   <div class="item-box" v-for="element in myArray" :key="element.id">{{element.name}}</div>
</draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Sortable, {Swap } from 'sortablejs';

Sortable.mount(new Swap());
export default {
  components: {
            draggable,
        },
        data(){
          return {
            dragOpts:{
              swap: true, // Enable swap mode
	swapClass: "sortable-swap-highlight", // Class name for swap item (if swap mode is enabled)
              group: "name",  // or { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }
	sort: true,  // sorting inside list
	delay: 0, // time in milliseconds to define when the sorting should start
	delayOnTouchOnly: false, // only delay if user is using touch
	touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event
	disabled: false, // Disables the sortable if set to true.
	store: null,  // @see Store
	animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
	easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
	handle: ".my-handle",  // Drag handle selector within list items
	filter: ".ignore-elements",  // Selectors that do not lead to dragging (String or Function)
	preventOnFilter: true, // Call `event.preventDefault()` when triggered `filter`
	draggable: ".item",  // Specifies which items inside the element should be draggable

	dataIdAttr: 'data-id',

	ghostClass: "sortable-ghost",  // Class name for the drop placeholder
	chosenClass: "sortable-chosen",  // Class name for the chosen item
	dragClass: "sortable-drag",  // Class name for the dragging item

	swapThreshold: 1, // Threshold of the swap zone
	invertSwap: false, // Will always use inverted swap zone if set to true
	invertedSwapThreshold: 1, // Threshold of the inverted swap zone (will be set to swapThreshold value by default)
	direction: 'horizontal', // Direction of Sortable (will be detected automatically if not given)

	forceFallback: false,  // ignore the HTML5 DnD behaviour and force the fallback to kick in

	fallbackClass: "sortable-fallback",  // Class name for the cloned DOM Element when using forceFallback
	fallbackOnBody: false,  // Appends the cloned DOM Element into the Document's Body
	fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.

	dragoverBubble: false,
	removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
	emptyInsertThreshold: 5, // px, distance mouse must be from empty sortable to insert drag element into it
            },
            myArray:[
  {
    "name": "John",
    "id": 0
  },
  {
    "name": "Joao",
    "id": 1
  },
  {
    "name": "Jean",
    "id": 2
  },
  {
    "name": "bob",
    "id": 3
  },
  {
    "name": "jony",
    "id": 4
  },
]

          }
        },
        methods: {
          onUpdate (evt){console.log('>>>>')
    // sortable.js已经将dom结构变成拖拽后的样子，需要先改回来=。=
    removeNode(evt.item)
    insertNodeAt(evt.from, evt.item, evt.oldIndex)
    // 然后正常操作列表数据，通过数据的变化驱动dom结构再次变成拖拽后的样子
    this.list.splice(evt.newIndex, 0, this.list.splice(evt.oldIndex, 1)[0])
  },
          onDragStart(...args){
            console.log(args)
          },
          onDragMove (...args) {
            console.log(args)
          },
          onDragEnd(...args){
            console.log(args)
          }

        }
  
}
</script>

<style lang="less" scoped>
.drag-container{
display: flex;
flex-wrap: wrap;
}
.item-box{
  background: blue;
  width: 100px;
  height: 100px;
  margin: 10px;
  font-size: 40px;
  text-align: center;
}
.sortable-ghost{
  // opacity: 0;
}
.sortable-swap-highlight{
  background: green;
}
</style>
